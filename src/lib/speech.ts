import { Capacitor, registerPlugin } from "@capacitor/core";

let unlocked = false;
let voicesLoaded = false;
let voicesResolve: (() => void) | null = null;
const voicesPromise = new Promise<void>((resolve) => {
  voicesResolve = resolve;
});

type TtsPlugin = {
  speak(options: { text: string }): Promise<void>;
  stop(): Promise<void>;
};

const Tts = registerPlugin<TtsPlugin>("Tts");

function useNativeTts() {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    voicesLoaded = true;
    voicesResolve?.();
  };
  // Chrome sometimes needs a nudge
  window.speechSynthesis.getVoices();
}

const STORAGE_KEY = "wortreise-voice-preference";

export function unlockSpeech() {
  unlocked = true;
  if (useNativeTts()) {
    void Tts.stop().catch(() => undefined);
    return;
  }
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

// Get all German voices available in the browser
export function getGermanVoices(): Array<{ name: string; lang: string; voice: SpeechSynthesisVoice }> {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  const voices = window.speechSynthesis.getVoices();
  return voices
    .filter((v) => {
      const lang = v.lang.toLowerCase();
      return lang.startsWith("de-") || lang === "de" || v.name.toLowerCase().includes("german");
    })
    .map((v) => ({ name: v.name, lang: v.lang, voice: v }));
}

// Save user's preferred voice to localStorage
export function saveVoicePreference(voiceName: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, voiceName);
  } catch {
    // Ignore storage errors
  }
}

// Load user's preferred voice from localStorage
export function loadVoicePreference(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// Debug function to list all available voices
export function listVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices().map((v) => ({
    name: v.name,
    lang: v.lang,
    localService: v.localService,
    default: v.default,
  }));
}

export async function speakGerman(text: string) {
  if (useNativeTts()) {
    await Tts.stop().catch(() => undefined);
    await Tts.speak({ text });
    unlocked = true;
    return;
  }
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const synth = window.speechSynthesis;

  // Wait for voices to load (with timeout)
  if (!voicesLoaded) {
    try {
      await Promise.race([
        voicesPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("voices timeout")), 1500)),
      ]);
    } catch {
      // Continue anyway, maybe voices will be there
    }
  }

  // Force voice loading by calling getVoices again
  const voices = synth.getVoices();

  // Debug: log all voices
  if (voices.length > 0) {
    console.log("[speech] Available voices:", voices.map(v => `${v.name} (${v.lang})`).join(", "));
  } else {
    console.warn("[speech] No voices available yet!");
  }

  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = 0.92;

  // 1. Try user's saved preference first
  const savedVoiceName = loadVoicePreference();
  let selectedVoice: SpeechSynthesisVoice | undefined;

  if (savedVoiceName) {
    selectedVoice = voices.find((v) => v.name === savedVoiceName);
    if (selectedVoice) {
      console.log("[speech] Using saved voice:", selectedVoice.name);
    }
  }

  // 2. Fallback: find any German voice
  if (!selectedVoice) {
    selectedVoice = voices.find((v) => {
      const lang = v.lang.toLowerCase();
      return lang.startsWith("de-") || lang === "de";
    }) || voices.find((v) => v.name.toLowerCase().includes("german")) || voices.find((v) => v.lang.toLowerCase().startsWith("de"));
  }

  if (selectedVoice) {
    utter.voice = selectedVoice;
    console.log("[speech] Using voice:", selectedVoice.name, "(", selectedVoice.lang, ")");
  } else {
    console.warn("[speech] No German voice found, using default");
  }

  synth.speak(utter);
  unlocked = true;
}

export function speechReady() {
  return unlocked;
}
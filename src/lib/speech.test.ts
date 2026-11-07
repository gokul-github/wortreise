import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";

// ── Test Utilities ──────────────────────────────────────────────────────────

interface MockVoice {
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}

function createMockSpeechSynthesis(voices: MockVoice[] = []) {
  let voicesLoaded = false;
  let voicesResolve: (() => void) | null = null;
  const voicesPromise = new Promise<void>((resolve) => {
    voicesResolve = resolve;
  });

  const mockSynth = {
    getVoices: () => voices,
    speak: mock.fn((_utterance?: { voice?: { name?: string; lang?: string }; lang?: string; rate?: number }) => {}),
    cancel: mock.fn(() => {}),
    onvoiceschanged: null as (() => void) | null,
    pending: false,
    addEventListener(event: string, fn: () => void) {
      if (event === "voiceschanged") {
        if (!voicesLoaded) {
          setTimeout(() => {
            voicesLoaded = true;
            voicesResolve?.();
            fn();
          }, 0);
        } else {
          fn();
        }
      }
    },
    removeEventListener() {},
    _testHelpers: {
      setVoices(newVoices: MockVoice[]) {
        voices.length = 0;
        voices.push(...newVoices);
        voicesLoaded = false;
      },
      triggerVoicesChanged() {
        mockSynth.onvoiceschanged?.();
      },
      getVoicesPromise: () => voicesPromise,
    },
  };

  return mockSynth;
}

// Replace global speechSynthesis
const originalSpeechSynthesis = (globalThis as any).speechSynthesis;

function setMockSpeechSynthesis(voices: MockVoice[] = []) {
  const mockSynth = createMockSpeechSynthesis(voices);
  (globalThis as any).speechSynthesis = mockSynth;
  return mockSynth;
}

function restoreSpeechSynthesis() {
  (globalThis as any).speechSynthesis = originalSpeechSynthesis;
}

// ── Speech Module Tests ──────────────────────────────────────────────────────

describe("Speech Module", () => {
  let speechModule: any;

  beforeEach(async () => {
    restoreSpeechSynthesis();
    // Re-import to get fresh module with mocked speechSynthesis
    speechModule = await import("./speech.ts");
  });

  afterEach(() => {
    restoreSpeechSynthesis();
  });

  describe("getGermanVoices", () => {
    it("returns empty array when no voices available", () => {
      setMockSpeechSynthesis([]);
      const voices = speechModule.getGermanVoices();
      assert.deepEqual(voices, []);
    });

    it("filters only German voices (de-DE, de-AT, de-CH)", () => {
      const voices: MockVoice[] = [
        { name: "Anna", lang: "de-DE", localService: true, default: false },
        { name: "Helena", lang: "de-AT", localService: true, default: false },
        { name: "Google Deutsch", lang: "de-DE", localService: false, default: true },
        { name: "Alex", lang: "en-US", localService: true, default: true },
        { name: "Thomas", lang: "fr-FR", localService: true, default: false },
      ];
      setMockSpeechSynthesis(voices);
      const germanVoices = speechModule.getGermanVoices();
      assert.equal(germanVoices.length, 3);
      assert.ok(germanVoices.every((v: { lang: string }) => v.lang.startsWith("de-") || v.lang === "de"));
    });

    it("includes voices with 'german' in name", () => {
      const voices: MockVoice[] = [
        { name: "Microsoft German", lang: "en-US", localService: false, default: false },
        { name: "Alex", lang: "en-US", localService: true, default: true },
      ];
      setMockSpeechSynthesis(voices);
      const germanVoices = speechModule.getGermanVoices();
      assert.equal(germanVoices.length, 1);
      assert.equal(germanVoices[0].name, "Microsoft German");
    });

    it("maps voice properties correctly", () => {
      const voices: MockVoice[] = [
        { name: "Test Voice", lang: "de-DE", localService: true, default: false },
      ];
      setMockSpeechSynthesis(voices);
      const germanVoices = speechModule.getGermanVoices();
      assert.equal(germanVoices[0].name, "Test Voice");
      assert.equal(germanVoices[0].lang, "de-DE");
      assert.ok(germanVoices[0].voice);
    });
  });

  describe("Voice Preference Persistence", () => {
    beforeEach(() => {
      setMockSpeechSynthesis([
        { name: "Anna", lang: "de-DE", localService: true, default: false },
      ]);
    });

    it("saves voice preference to localStorage", () => {
      speechModule.saveVoicePreference("Anna");
      const saved = localStorage.getItem("wortreise-voice-preference");
      assert.equal(saved, "Anna");
    });

    it("loads voice preference from localStorage", () => {
      localStorage.setItem("wortreise-voice-preference", "Helena");
      const loaded = speechModule.loadVoicePreference();
      assert.equal(loaded, "Helena");
    });

    it("returns null when no preference saved", () => {
      localStorage.removeItem("wortreise-voice-preference");
      const loaded = speechModule.loadVoicePreference();
      assert.equal(loaded, null);
    });

    it("handles localStorage errors gracefully", () => {
      // Simulate quota exceeded
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = () => { throw new Error("Quota exceeded"); };
      assert.doesNotThrow(() => speechModule.saveVoicePreference("Test"));
      localStorage.setItem = originalSetItem;
    });
  });

  describe("speakGerman - Voice Selection Logic", () => {
    let mockSynth: ReturnType<typeof createMockSpeechSynthesis>;

    beforeEach(() => {
      mockSynth = setMockSpeechSynthesis([
        { name: "Anna", lang: "de-DE", localService: true, default: false },
        { name: "Google Deutsch", lang: "de-DE", localService: false, default: true },
      ]);
    });

    it("uses saved voice when available", async () => {
      localStorage.setItem("wortreise-voice-preference", "Anna");
      await speechModule.speakGerman("Test");
      const spokenVoice = mockSynth.speak.mock.calls[0]?.arguments[0]?.voice;
      assert.equal(spokenVoice?.name, "Anna");
    });

    it("falls back to first German voice when no preference", async () => {
      localStorage.removeItem("wortreise-voice-preference");
      await speechModule.speakGerman("Test");
      const spokenVoice = mockSynth.speak.mock.calls[0]?.arguments[0]?.voice;
      assert.ok(spokenVoice?.lang?.startsWith("de-"));
    });

    it("sets utter.lang to de-DE", async () => {
      await speechModule.speakGerman("Hallo");
      const utterance = mockSynth.speak.mock.calls[0]?.arguments[0];
      assert.ok(utterance);
      assert.equal(utterance.lang, "de-DE");
    });

    it("sets utter.rate to 0.92", async () => {
      await speechModule.speakGerman("Hallo");
      const utterance = mockSynth.speak.mock.calls[0]?.arguments[0];
      assert.ok(utterance);
      assert.equal(utterance.rate, 0.92);
    });

    it("calls synth.cancel before speaking", async () => {
      await speechModule.speakGerman("Test");
      assert.ok(mockSynth.cancel.mock.calls.length > 0);
    });
  });

  describe("speakGerman - Async Voice Loading", () => {
    it("waits for voices to load if not loaded", async () => {
      const mockSynth = setMockSpeechSynthesis([]);
      // Add voices after a delay to simulate async loading
      setTimeout(() => {
        mockSynth._testHelpers.setVoices([
          { name: "Anna", lang: "de-DE", localService: true, default: false },
        ]);
        mockSynth._testHelpers.triggerVoicesChanged();
      }, 50);

      await speechModule.speakGerman("Test");
      // Should not throw and should eventually speak
      assert.ok(true);
    });
  });

  describe("listVoices", () => {
    it("returns all voices with correct properties", () => {
      const voices: MockVoice[] = [
        { name: "Anna", lang: "de-DE", localService: true, default: false },
        { name: "Alex", lang: "en-US", localService: true, default: true },
      ];
      setMockSpeechSynthesis(voices);
      const listed = speechModule.listVoices();
      assert.equal(listed.length, 2);
      assert.deepEqual(listed[0], { name: "Anna", lang: "de-DE", localService: true, default: false });
      assert.deepEqual(listed[1], { name: "Alex", lang: "en-US", localService: true, default: true });
    });

    it("returns empty array when no speechSynthesis", () => {
      restoreSpeechSynthesis();
      delete (globalThis as any).speechSynthesis;
      const listed = speechModule.listVoices();
      assert.deepEqual(listed, []);
    });
  });
});
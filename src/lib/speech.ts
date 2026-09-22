let unlocked = false;

export function unlockSpeech() {
  unlocked = true;
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export function speakGerman(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = 0.92;
  const voices = synth.getVoices();
  const de = voices.find((v) => v.lang.toLowerCase().startsWith("de"));
  if (de) utter.voice = de;
  synth.speak(utter);
  unlocked = true;
}

export function speechReady() {
  return unlocked;
}

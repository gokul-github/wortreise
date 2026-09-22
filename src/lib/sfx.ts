let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  getCtx();
}

function beep(freq: number, dur: number, type: OscillatorType, gain = 0.05) {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + dur);
}

export function playCorrect() {
  beep(660, 0.08, "sine", 0.04);
  setTimeout(() => beep(880, 0.12, "sine", 0.045), 70);
}

export function playWrong() {
  beep(180, 0.18, "triangle", 0.05);
}

export function playTick() {
  beep(880, 0.04, "square", 0.02);
}

export function playStamp() {
  beep(392, 0.1, "sine", 0.05);
  setTimeout(() => beep(523, 0.16, "sine", 0.05), 90);
}

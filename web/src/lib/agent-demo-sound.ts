/** Sons sutis via Web Audio API — sem arquivos externos. */

let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AC();
  }
  return ctx;
}

function beep(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.035,
) {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") void audio.resume();

  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + duration);
}

export const agentSounds = {
  click: () => beep(420, 0.05, "triangle", 0.04),
  type: () => beep(880 + Math.random() * 120, 0.025, "square", 0.012),
  select: () => beep(520, 0.08, "sine", 0.03),
  done: () => {
    beep(523, 0.07, "sine", 0.04);
    window.setTimeout(() => beep(659, 0.09, "sine", 0.035), 70);
  },
  error: () => beep(180, 0.12, "sawtooth", 0.03),
  drop: () => beep(340, 0.1, "triangle", 0.035),
};

import { agentInteractiveSelectors } from "@/data/agent-scroll-tour";

export function wait(ms: number) {
  return new Promise<void>((r) => window.setTimeout(r, ms));
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function nowStamp() {
  const d = new Date();
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function isInViewport(el: Element, margin = 48) {
  const r = el.getBoundingClientRect();
  return (
    r.bottom > margin &&
    r.top < window.innerHeight - margin &&
    r.right > margin &&
    r.left < window.innerWidth - margin &&
    r.width > 24 &&
    r.height > 16
  );
}

export function collectTargets(): HTMLElement[] {
  const found: HTMLElement[] = [];
  const seen = new Set<Element>();

  for (const sel of agentInteractiveSelectors) {
    document.querySelectorAll(sel).forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      if (seen.has(el)) return;
      if (el.closest("[data-agent-ui]")) return;
      if (!isInViewport(el)) return;
      seen.add(el);
      found.push(el);
    });
  }
  return found;
}

export function pointOn(el: HTMLElement, biasX = 0.55, biasY = 0.4) {
  const r = el.getBoundingClientRect();
  return {
    x: clamp(r.left + r.width * biasX, 24, window.innerWidth - 24),
    y: clamp(r.top + r.height * biasY, 72, window.innerHeight - 48),
    rect: r,
  };
}

export function speakText(text: string, enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "pt-BR";
  u.rate = 1.05;
  u.pitch = 1;
  u.volume = 0.7;
  window.speechSynthesis.speak(u);
}

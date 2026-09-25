/** Comunicação leve entre menu e simulação (sem Context). */

export const AGENT_DEMO_START_EVENT = "de-agent-demo-start";
export const AGENT_DEMO_STOP_EVENT = "de-agent-demo-stop";

export function startAgentDemo() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AGENT_DEMO_START_EVENT));
}

export function stopAgentDemo() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AGENT_DEMO_STOP_EVENT));
}

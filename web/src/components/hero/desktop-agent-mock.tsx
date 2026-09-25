"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AgentMousePointer } from "@/components/demo/agent-mouse-pointer";
import { Badge } from "@/components/ui/badge";

const steps = [
  { label: "Solicitação recebida", status: "done" as const },
  { label: "Informações compreendidas", status: "done" as const },
  { label: "Sistema aberto", status: "active" as const },
  { label: "Formulário sendo preenchido", status: "active" as const },
  { label: "Aguardando confirmação", status: "pending" as const },
];

export function DesktopAgentMock() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative overflow-hidden border border-ink/10 bg-paper-surface"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between gap-2 border-b border-ink/10 bg-paper-muted/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
        </div>
        <Badge variant="success" className="font-mono text-[10px]">
          AGENTE · ONLINE
        </Badge>
      </div>

      <div className="surface-grid p-5">
        <p className="text-xs uppercase tracking-wider text-ink-soft">
          Tarefa atual
        </p>
        <p className="mt-1 font-mono text-sm text-navy">
          Processando solicitação #18492
        </p>

        <ul className="mt-4 space-y-2">
          {steps.map((step) => (
            <li
              key={step.label}
              className="flex items-center gap-2 font-mono text-xs text-ink"
            >
              <span
                className={
                  step.status === "done"
                    ? "text-accent"
                    : step.status === "active"
                      ? "text-navy"
                      : "text-ink-soft"
                }
              >
                {step.status === "done"
                  ? "✓"
                  : step.status === "active"
                    ? "→"
                    : "○"}
              </span>
              {step.label}
            </li>
          ))}
        </ul>

        <div className="relative mt-5 h-28 overflow-hidden border border-dashed border-ink/15 bg-paper">
          <div className="surface-grid absolute inset-0 opacity-70" />
          <motion.div
            className="absolute left-6 top-6 h-9 w-28 border border-accent/35 bg-accent-soft"
            animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute z-10"
            animate={
              reduceMotion
                ? undefined
                : {
                    left: ["8%", "42%", "58%", "34%"],
                    top: ["18%", "32%", "52%", "40%"],
                  }
            }
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <AgentMousePointer size={22} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

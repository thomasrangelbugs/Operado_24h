"use client";

import { howItWorksSteps } from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { motion, useReducedMotion } from "framer-motion";

export function HowItWorksSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="como-funciona" variant="accent">
      <SectionHeading
        eyebrow="Fluxo operacional"
        title="Como funciona"
        description="Um ciclo contínuo de percepção, raciocínio, ação e verificação — com memória para repetir e melhorar."
      />

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {howItWorksSteps.map((step, index) => (
          <motion.li
            key={step.id}
            data-agent-focus={index === 0 ? "flow-step" : undefined}
            className="relative border border-ink/10 bg-paper-surface p-5"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
          >
            <p className="font-mono text-xs tracking-wider text-accent">
              {String(index + 1).padStart(2, "0")} · {step.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {step.description}
            </p>
          </motion.li>
        ))}
      </ol>
    </SectionShell>
  );
}

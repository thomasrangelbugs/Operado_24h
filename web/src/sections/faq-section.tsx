"use client";

import { useState } from "react";
import { faqItems } from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionShell id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Perguntas frequentes"
        description="Respostas diretas sobre autonomia, integrações, erros e estágio do projeto."
      />
      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {faqItems.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.question}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="font-display text-base font-semibold text-ink">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "mt-1 h-5 w-5 shrink-0 text-ink-soft transition",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen ? (
                <p className="pb-5 pr-8 text-sm leading-relaxed text-ink-muted">
                  {item.answer}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

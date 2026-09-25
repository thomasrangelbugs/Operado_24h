import {
  Brain,
  Database,
  Eye,
  Hand,
  Mic,
  Shield,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { bodyModules } from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Brain,
  Hand,
  Database,
  Mic,
  Shield,
  SlidersHorizontal,
};

export function BodyModulesSection() {
  return (
    <SectionShell id="corpo-do-agente" variant="muted">
      <SectionHeading
        eyebrow="Anatomia"
        title={'O "corpo" do funcionário digital'}
        description="Módulos que juntos formam um operador completo — visão, cérebro, mãos, memória, voz, segurança e supervisão."
      />
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bodyModules.map((mod) => {
          const Icon = iconMap[mod.icon] ?? Eye;
          return (
            <div key={mod.id} className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center border border-ink/10 bg-paper-surface">
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-base font-semibold text-ink">
                  {mod.title}
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
                  {mod.subtitle}
                </p>
              </div>
              <p className="text-sm text-ink-muted">{mod.description}</p>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

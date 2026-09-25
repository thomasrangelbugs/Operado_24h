import { limitsList, metricsKpis, mvpSteps, roadmapPhases } from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { CollapsibleBlock } from "@/components/shared/collapsible-block";

export function RoadmapSection() {
  return (
    <SectionShell id="roadmap">
      <SectionHeading
        eyebrow="Evolução"
        title="Roadmap"
        description="Do proof of concept à força de trabalho digital com governança."
      />
      <div className="space-y-3">
        {roadmapPhases.map((phase) => (
          <div
            key={phase.phase}
            className="grid gap-3 border border-ink/10 bg-paper-surface p-5 md:grid-cols-[88px_1fr]"
          >
            <p className="font-mono text-sm text-accent">FASE {phase.phase}</p>
            <div>
              <p className="font-display font-semibold text-ink">{phase.title}</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
                {phase.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-0">
        <CollapsibleBlock
          title="MVP recomendado — Digital Support Employee"
          summary="Primeiro fluxo ponta a ponta: solicitação → chamado"
          defaultOpen
        >
          <ol className="grid gap-2 sm:grid-cols-2">
            {mvpSteps.map((step, i) => (
              <li
                key={step}
                className="border border-ink/10 px-3 py-2 text-sm text-ink"
              >
                <span className="mr-2 font-mono text-xs text-accent">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </CollapsibleBlock>
        <CollapsibleBlock
          title="Métricas"
          summary="KPIs de confiabilidade, custo e supervisão"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {metricsKpis.map((kpi) => (
              <div key={kpi.name} className="border-t border-ink/10 pt-3">
                <p className="font-mono text-sm text-ink">{kpi.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{kpi.description}</p>
              </div>
            ))}
          </div>
        </CollapsibleBlock>
        <CollapsibleBlock
          title="Limites atuais"
          summary="Transparência sobre o que não prometemos"
        >
          <ul className="space-y-2 text-sm text-ink-muted">
            {limitsList.map((limit) => (
              <li key={limit}>· Não prometer {limit.toLowerCase()}.</li>
            ))}
          </ul>
        </CollapsibleBlock>
      </div>
    </SectionShell>
  );
}

import { brand } from "@/data/brand";
import {
  automationBarriers,
  barrierSystems,
  beforeAfter,
} from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { Badge } from "@/components/ui/badge";

export function BarrierSection() {
  return (
    <SectionShell id="barreira">
      <SectionHeading
        eyebrow="Paradigma"
        title="A barreira que queremos quebrar"
        description="Automatizar costuma exigir projetos longos de integração. O funcionário digital inverte a premissa: se uma pessoa usa pela interface, o agente também pode — com governança."
      />

      <div className="mb-10 grid gap-0 overflow-hidden border border-ink/10 lg:grid-cols-2">
        <div className="bg-paper-muted/80 p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
            Antes
          </p>
          <p className="mt-2 font-display text-xl font-semibold text-ink">
            {beforeAfter.before.title}
          </p>
          <ul className="mt-5 space-y-3 text-sm text-ink-muted">
            {beforeAfter.before.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ink-soft" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-accent-soft/80 p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            Depois
          </p>
          <p className="mt-2 font-display text-xl font-semibold text-ink">
            {beforeAfter.after.title}
          </p>
          <ul className="mt-5 space-y-3 text-sm text-ink">
            {beforeAfter.after.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-medium text-ink">
            Sistemas no dia a dia
          </p>
          <div className="flex flex-wrap gap-2">
            {barrierSystems.map((system) => (
              <Badge key={system} variant="muted">
                {system}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-ink">
            Automação tradicional normalmente exige
          </p>
          <ul className="space-y-2 text-sm text-ink-muted">
            {automationBarriers.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div
        data-agent-focus="integration"
        className="mt-10 border border-accent/25 bg-accent-soft/50 px-6 py-8 text-center md:px-10"
      >
        <p className="font-display text-xl font-semibold text-ink md:text-2xl">
          {brand.interfaceIntegration}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-muted">
          ERP antigo sem API? O agente abre o programa, identifica campos,
          preenche, salva, verifica o registro e captura evidência — como faria
          um analista.
        </p>
      </div>
    </SectionShell>
  );
}

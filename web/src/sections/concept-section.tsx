import { brand } from "@/data/brand";
import { agentCapabilities, miniLoop, paradigmComparison } from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { cn } from "@/lib/utils";

export function ConceptSection() {
  return (
    <SectionShell id="conceito" variant="muted">
      <SectionHeading
        eyebrow="Conceito"
        title="Não é chatbot, RPA nem integração isolada"
        description="Um agente que usa o computador como uma pessoa: percebe a tela, decide, executa, confere e aprende — com supervisão e limites claros."
      />

      <div className="mb-12 grid gap-6 md:grid-cols-3">
        {brand.audiences.map((audience) => (
          <div key={audience.title} className="border-l-2 border-accent pl-4">
            <p className="font-display text-base font-semibold text-ink">
              {audience.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {audience.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-10 grid gap-0 border border-ink/20 bg-paper-surface md:grid-cols-3">
        {paradigmComparison.map((item, index) => (
          <div
            key={item.title}
            data-agent-focus={
              "highlight" in item && item.highlight ? "paradigm" : undefined
            }
            className={cn(
              "border-ink/15 p-5",
              index > 0 && "border-t md:border-l md:border-t-0",
              "highlight" in item && item.highlight && "bg-accent-soft",
            )}
          >
            <p className="font-display text-sm font-semibold text-ink">
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {item.flow}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-10 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="font-display text-sm font-semibold text-ink">O que não é</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>Chatbot que só responde perguntas.</li>
            <li>Automação de cliques sem compreensão.</li>
            <li>RPA rígido dependente de seletores frágeis.</li>
            <li>Apenas uma ponte entre APIs de terceiros.</li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-ink">
            O que pode fazer
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-ink sm:grid-cols-2">
            {agentCapabilities.slice(0, 8).map((cap) => (
              <li key={cap} className="flex gap-2">
                <span className="text-accent">·</span>
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 border border-ink/10 bg-paper-surface p-5 sm:grid-cols-3">
        {miniLoop.map((step, index) => (
          <div key={step.label} className="relative">
            <p className="font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-ink">
              {step.label}
            </p>
            <p className="mt-1 text-sm text-ink-muted">{step.detail}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink-soft">
        Princípio:{" "}
        <span className="text-ink-muted">{brand.integrationPhrase}</span>
      </p>
    </SectionShell>
  );
}

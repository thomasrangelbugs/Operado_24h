import {
  employeeRoles,
  skillMatrix,
  storySteps,
  storyboardFrames,
} from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { CollapsibleBlock } from "@/components/shared/collapsible-block";

export function ExamplesSection() {
  return (
    <>
      <SectionShell id="exemplos">
        <SectionHeading
          eyebrow="Casos de uso"
          title="Exemplos de funcionários digitais"
          description="Perfis operacionais na mesma arquitetura — habilidades e permissões diferentes."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {employeeRoles.map((role) => (
            <div key={role.title} className="border-t border-ink/15 pt-4">
              <p className="font-display text-base font-semibold text-ink">
                {role.title}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-ink-muted">
                {role.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="historia" variant="muted">
        <SectionHeading
          eyebrow="Storyboard"
          title="Uma noite às 02:43"
          description="Do recebimento à resposta, com evidências e sem intervenção humana neste cenário ilustrativo."
        />

        <div className="mb-10 grid gap-0 overflow-hidden border border-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {storyboardFrames.map((frame, index) => (
            <div
              key={`${frame.time}-${frame.title}`}
              className={`relative min-h-[180px] bg-paper-surface p-5 ${
                index > 0 ? "border-t border-ink/10 sm:border-t-0 sm:border-l" : ""
              } ${index === 2 ? "sm:border-t lg:border-t-0" : ""} ${
                index === 3 ? "sm:border-t lg:border-t-0" : ""
              }`}
            >
              <div className="surface-grid absolute inset-0 opacity-40" />
              <div className="relative">
                <p className="font-mono text-xs text-accent">{frame.time}</p>
                <p className="mt-3 font-display text-base font-semibold text-ink">
                  {frame.title}
                </p>
                <p className="mt-2 text-sm text-ink-muted">{frame.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-6 text-sm">
          <p>
            <span className="text-ink-soft">Tempo:</span>{" "}
            <span className="font-medium text-ink">2min 14s</span>
          </p>
          <p>
            <span className="text-ink-soft">Intervenção humana:</span>{" "}
            <span className="font-medium text-ink">nenhuma</span>
          </p>
        </div>
        <p className="mb-6 text-xs text-ink-soft">
          Exemplo ilustrativo. Resultados reais dependem do processo, sistema e
          nível de autonomia configurado.
        </p>

        <CollapsibleBlock
          title="Passo a passo completo"
          summary="Os 12 eventos da execução ilustrativa"
        >
          <ol className="grid gap-2 sm:grid-cols-2">
            {storySteps.map((step, i) => (
              <li
                key={step}
                className="flex gap-3 border border-ink/10 bg-paper-surface px-3 py-2 text-sm text-ink"
              >
                <span className="font-mono text-xs text-ink-soft">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </CollapsibleBlock>
      </SectionShell>

      <SectionShell id="matriz">
        <SectionHeading
          eyebrow="Competências"
          title="O que a tecnologia precisa dominar"
          description="Capacidades transversais a qualquer habilidade operacional."
        />
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink/15 text-ink-soft">
                <th className="py-3 pr-4 font-medium">Domínio</th>
                <th className="py-3 font-medium">Capacidades</th>
              </tr>
            </thead>
            <tbody>
              {skillMatrix.map((row) => (
                <tr key={row.domain} className="border-b border-ink/8">
                  <td className="py-3 pr-4 font-medium text-ink">{row.domain}</td>
                  <td className="py-3 text-ink-muted">{row.items.join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-4 sm:hidden">
          {skillMatrix.map((row) => (
            <div key={row.domain} className="border-t border-ink/10 pt-3">
              <p className="font-medium text-ink">{row.domain}</p>
              <p className="mt-1 text-sm text-ink-muted">
                {row.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>
    </>
  );
}

import { brand } from "@/data/brand";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ClosingSection() {
  return (
    <>
      <SectionShell id="diferencial">
        <SectionHeading
          eyebrow="Proposta de valor"
          title="O diferencial não é fazer uma IA clicar"
          description={`É transformar ${brand.differential.from} em ${brand.differential.to}`}
          align="center"
          className="mx-auto"
        />
        <p className="text-center font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {brand.differential.headline}
        </p>
      </SectionShell>

      <SectionShell id="visao-futura" variant="muted">
        <SectionHeading
          eyebrow="Cenário"
          title="Visão futura"
          description="Dezenas de processos, múltiplos funcionários digitais em sessões independentes — tudo no mesmo Control Center."
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
          {[
            "Empresa — 50 processos",
            "Control Center",
            "20 funcionários digitais · 20 sessões",
            "Atendimento · Financeiro · Suporte · Cadastro · Backoffice",
          ].map((label, index) => (
            <div key={label} className="w-full">
              {index > 0 ? (
                <div className="mx-auto mb-3 h-4 w-px bg-ink/20" aria-hidden="true" />
              ) : null}
              <div
                className={`border px-4 py-3 text-sm ${
                  index === 1
                    ? "border-accent/40 bg-accent-soft font-display font-semibold text-ink"
                    : "border-ink/10 bg-paper-surface text-ink-muted"
                }`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="cta-final" variant="accent">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h2
            data-agent-focus="cta"
            className="font-display text-balance text-3xl font-semibold text-ink md:text-4xl"
          >
            {brand.finalCta.title}
          </h2>
          <p className="text-pretty text-lg text-ink-muted">
            {brand.finalCta.description}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a href={brand.finalCta.primary.href} className={cn(buttonVariants())}>
              {brand.finalCta.primary.label}
            </a>
            <a
              href={brand.finalCta.secondary.href}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              {brand.finalCta.secondary.label}
            </a>
          </div>
        </div>
      </SectionShell>
    </>
  );
}

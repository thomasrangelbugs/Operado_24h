import { isolationSessions, securityZones } from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { CollapsibleBlock } from "@/components/shared/collapsible-block";
import { cn } from "@/lib/utils";

const zoneStyles = {
  green: "border-l-emerald-600 bg-emerald-50/80",
  yellow: "border-l-amber-500 bg-amber-50/80",
  red: "border-l-rose-600 bg-rose-50/80",
};

export function SecuritySection() {
  return (
    <SectionShell id="seguranca">
      <SectionHeading
        eyebrow="Governança"
        title="Segurança sem autoridade ilimitada"
        description="Cada ação passa por políticas, zonas de risco e trilhas de auditoria."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {securityZones.map((zone, index) => (
          <div
            key={zone.zone}
            data-agent-focus={index === 0 ? "security" : undefined}
            className={cn(
              "border border-ink/10 border-l-4 p-5",
              zoneStyles[zone.zone],
            )}
          >
            <p className="font-display text-base font-semibold text-ink">
              {zone.title}
            </p>
            <p className="mt-2 text-sm text-ink-muted">{zone.description}</p>
            <ul className="mt-4 space-y-1 text-sm text-ink">
              {zone.examples.map((ex) => (
                <li key={ex}>· {ex}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-0">
        <CollapsibleBlock
          title="Credenciais e Secret Vault"
          summary="Senhas fora do modelo · MFA e CAPTCHA com humano"
        >
          <p className="text-sm leading-relaxed text-ink-muted">
            Nunca armazenar senha em texto puro. HashiCorp Vault, Azure Key
            Vault, AWS Secrets Manager ou Google Secret Manager — o modelo de IA
            evita receber senhas quando possível. MFA e CAPTCHA exigem
            intervenção humana.
          </p>
        </CollapsibleBlock>
        <CollapsibleBlock
          title="Isolamento e containerização"
          summary="Uma sessão gráfica por agente"
        >
          <p className="mb-4 text-sm leading-relaxed text-ink-muted">
            Cada agente em computador dedicado, VM ou sessão Windows isolada.
            Dois agentes não disputam o mesmo mouse/teclado. Docker empacota
            back-end e workers — automação GUI Windows exige sessões gráficas
            reais.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {isolationSessions.map((row) => (
              <div
                key={row.agent}
                className="border border-ink/10 bg-paper-surface p-4 font-mono text-xs text-ink"
              >
                <p className="text-accent">{row.agent}</p>
                <p className="mt-2 text-ink-soft">→</p>
                <p className="mt-1">{row.session}</p>
              </div>
            ))}
          </div>
        </CollapsibleBlock>
      </div>
    </SectionShell>
  );
}

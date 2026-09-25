import {
  auditTimeline,
  controlCenterAgents,
  controlCenterStats,
  observabilityFields,
} from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { CollapsibleBlock } from "@/components/shared/collapsible-block";
import { Badge } from "@/components/ui/badge";

export function OperationsSection() {
  return (
    <>
      <SectionShell id="control-center" variant="muted">
        <SectionHeading
          eyebrow="Operação"
          title="Control Center — Digital Workforce"
          description="Painel conceitual que supervisiona agentes, filas e métricas em tempo real."
        />
        <div className="overflow-hidden border border-ink/10 bg-paper-surface">
          <div className="border-b border-ink/10 bg-navy px-4 py-3 font-mono text-xs text-white/80">
            DIGITAL WORKFORCE
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-4">
            {controlCenterStats.map((stat, index) => (
              <div
                key={stat.label}
                data-agent-focus={index === 0 ? "dashboard" : undefined}
                className="border border-ink/10 bg-paper p-3"
              >
                <p className="text-[11px] text-ink-soft">{stat.label}</p>
                <p className="mt-1 font-display text-xl font-semibold text-ink">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-ink/10 p-4">
            <ul className="space-y-2">
              {controlCenterAgents.map((agent) => (
                <li
                  key={agent.name}
                  className="flex flex-col gap-2 border border-ink/10 px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <span className="font-medium text-ink">{agent.name}</span>
                    <span className="ml-2 text-ink-soft">{agent.area}</span>
                  </div>
                  <Badge
                    variant={
                      agent.status === "ONLINE"
                        ? "success"
                        : agent.status === "WORKING"
                          ? "default"
                          : "warning"
                    }
                    className="w-fit font-mono text-[10px]"
                  >
                    {agent.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 space-y-0">
          <CollapsibleBlock
            title="Observabilidade"
            summary="Logs, métricas, evidências e reprodução de incidentes"
          >
            <p className="mb-4 text-sm text-ink-muted">
              Logs estruturados, métricas, traces, screenshots de evidência,
              histórico de ações — Sentry, OpenTelemetry, Grafana, Prometheus.
            </p>
            <div className="flex flex-wrap gap-2">
              {observabilityFields.map((field) => (
                <Badge key={field} variant="muted" className="font-mono">
                  {field}
                </Badge>
              ))}
            </div>
          </CollapsibleBlock>
          <CollapsibleBlock
            title="Auditoria de execução"
            summary="Trilha com timestamp para compliance"
          >
            <ul className="space-y-2 font-mono text-xs text-ink-muted sm:text-sm">
              {auditTimeline.map((entry) => (
                <li key={entry.time} className="flex gap-4">
                  <span className="w-16 shrink-0 text-ink-soft">{entry.time}</span>
                  <span>{entry.event}</span>
                </li>
              ))}
            </ul>
          </CollapsibleBlock>
        </div>
      </SectionShell>
    </>
  );
}

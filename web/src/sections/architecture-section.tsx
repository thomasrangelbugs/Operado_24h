import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { Badge } from "@/components/ui/badge";

const layers = [
  {
    id: "security",
    label: "Security & Audit",
    detail: "Envolve toda a arquitetura",
    tone: "navy" as const,
  },
  {
    id: "control",
    label: "Control Center",
    detail: "Gestão de agentes",
    tone: "accent" as const,
    focus: true,
  },
  {
    id: "brain",
    label: "Agent Brain",
    detail: "Decisão e planejamento",
    tone: "default" as const,
  },
  {
    id: "engines",
    label: "Vision · Memory · Voice",
    detail: "Percepção, contexto e conversa",
    tone: "default" as const,
    split: true,
  },
  {
    id: "exec",
    label: "Execution Engine",
    detail: "Browser · Windows · Files",
    tone: "default" as const,
  },
  {
    id: "machine",
    label: "Computador / VM",
    detail: "Sessão gráfica isolada",
    tone: "default" as const,
  },
  {
    id: "systems",
    label: "Sistemas reais",
    detail: "ERP, CRM, portais, legado",
    tone: "success" as const,
  },
];

const toneClass = {
  navy: "border-navy/30 bg-navy text-white",
  accent: "border-accent/40 bg-accent-soft text-ink",
  success: "border-emerald-600/30 bg-emerald-50 text-emerald-950",
  default: "border-ink/10 bg-paper-surface text-ink",
};

export function ArchitectureDiagram() {
  return (
    <div className="relative overflow-hidden border border-ink/10 bg-paper p-4 md:p-8">
      <div className="mb-6 flex justify-center">
        <Badge>SECURITY & AUDIT — envolve toda a arquitetura</Badge>
      </div>
      <div className="mx-auto flex max-w-2xl flex-col items-stretch gap-3">
        {layers.map((layer, index) => (
          <div key={layer.id}>
            {index > 0 ? (
              <div className="mb-3 flex justify-center" aria-hidden="true">
                <div className="h-4 w-px bg-ink/20" />
              </div>
            ) : null}
            <div
              data-agent-focus={layer.focus ? "architecture" : undefined}
              className={`border px-4 py-3 text-center ${toneClass[layer.tone]}`}
            >
              <p className="font-display text-sm font-semibold tracking-tight">
                {layer.label}
              </p>
              <p
                className={`mt-1 text-xs ${
                  layer.tone === "navy" ? "text-white/70" : "text-ink-muted"
                }`}
              >
                {layer.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const codeTree = `apps/
  web-control-center/
  desktop-agent/
services/
  agent-brain/
  execution-engine/
  vision-engine/
  voice-engine/
  memory-engine/
packages/
  shared-types/
  security/
  skill-sdk/
  telemetry/
infrastructure/
  docker/
  database/
  monitoring/
skills/
  support/
  finance/
  backoffice/`;

export function ArchitectureSection() {
  return (
    <>
      <SectionShell id="arquitetura-geral">
        <SectionHeading
          eyebrow="Visão geral"
          title="Arquitetura geral"
          description="Control Center supervisiona agentes independentes. Cada um combina visão, memória, voz e execução sobre um computador ou VM — com segurança e auditoria em todo o fluxo."
        />
        <ArchitectureDiagram />
      </SectionShell>

      <SectionShell id="arquitetura-tecnica" variant="muted">
        <SectionHeading
          eyebrow="Implementação"
          title="Arquitetura técnica sugerida"
          description="Camadas separadas para painel, orquestração, agente local e automação híbrida."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Front-end / Painel",
              body: "Next.js, React, TypeScript, Tailwind CSS — acompanhar agentes, tarefas, permissões, métricas e intervenções.",
            },
            {
              title: "Back-end",
              body: "Python, FastAPI — orquestra agentes, autenticação, filas, permissões e serviços internos.",
            },
            {
              title: "Agente local",
              body: "Python no computador ou VM — visão, decisão local e ações na interface.",
            },
            {
              title: "Automação híbrida",
              body: "Playwright, pywinauto / UI Automation, PyAutoGUI como fallback. Visual intelligence quando necessário.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-ink/15 pt-4">
              <p className="font-display font-semibold text-ink">{item.title}</p>
              <p className="mt-2 text-sm text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <SectionHeading
            title="Arquitetura de código futura"
            description="Organização pensada para escalar times, serviços e biblioteca de habilidades."
            className="mb-6"
          />
          <pre className="overflow-x-auto border border-ink/10 bg-ink p-4 text-xs leading-relaxed text-white/85 sm:text-sm">
            <code>{codeTree}</code>
          </pre>
        </div>
      </SectionShell>
    </>
  );
}

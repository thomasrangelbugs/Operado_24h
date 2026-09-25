"use client";

import { useState } from "react";
import {
  dataEntities,
  executionPriority,
  memoryTypes,
} from "@/data/content";
import { technologyGroups } from "@/data/technologies";
import { ArchitectureDiagram } from "@/sections/architecture-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { CollapsibleBlock } from "@/components/shared/collapsible-block";
import { ExternalLink } from "@/components/shared/external-link";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "arquitetura", label: "Arquitetura" },
  { id: "plataforma", label: "Plataforma" },
  { id: "stack", label: "Stack" },
  { id: "aprendizado", label: "Aprendizado" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function TechnicalDepthSection() {
  const [tab, setTab] = useState<TabId>("arquitetura");

  return (
    <SectionShell id="profundidade-tecnica" variant="muted">
      <SectionHeading
        eyebrow="Profundidade"
        title="Camada técnica"
        description="Arquitetura, decisão, dados e ferramentas — agrupadas para quem quer ir além da narrativa."
      />

      <div
        role="tablist"
        aria-label="Profundidade técnica"
        className="mb-8 flex flex-wrap gap-2 border-b border-ink/10 pb-3"
      >
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition",
              tab === item.id
                ? "bg-navy text-white"
                : "text-ink-muted hover:bg-paper-surface hover:text-ink",
            )}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "arquitetura" ? (
        <div className="space-y-8">
          <ArchitectureDiagram />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Front-end / Painel",
                body: "Next.js, React, TypeScript — agentes, tarefas, permissões e intervenções.",
              },
              {
                title: "Back-end",
                body: "Python + FastAPI — orquestração, autenticação, filas e políticas.",
              },
              {
                title: "Agente local",
                body: "Processo no PC/VM com visão, decisão e ações na interface.",
              },
              {
                title: "Automação híbrida",
                body: "Acessibilidade/DOM primeiro; visão e cliques por coordenada como fallback.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-ink/15 pt-4">
                <p className="font-display font-semibold text-ink">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {tab === "plataforma" ? (
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Decisão e resiliência
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              LangGraph gerencia estados e handoff. Temporal mantém workflows
              duráveis após falhas ou reinícios.
            </p>
            <div className="mt-4 border border-ink/10 bg-paper-surface p-5 font-mono text-xs text-ink sm:text-sm">
              <p>Solicitação → Interpreta → Precisa do sistema</p>
              <p className="mt-2 text-amber-800">→ Sistema indisponível</p>
              <p className="mt-2">
                → Tarefa preservada → Retry → Continua do checkpoint
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Dados e memória
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              PostgreSQL centraliza entidades e auditoria. pgvector habilita
              memória semântica.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {dataEntities.map((entity) => (
                <span
                  key={entity}
                  className="border border-ink/10 bg-paper-surface px-2.5 py-1 font-mono text-[11px] text-ink"
                >
                  {entity}
                </span>
              ))}
            </div>
            <ul className="mt-6 space-y-3">
              {memoryTypes.map((mem) => (
                <li
                  key={mem.title}
                  className="border-t border-ink/10 pt-3 text-sm"
                >
                  <span className="font-medium text-ink">{mem.title}</span>
                  <span className="text-ink-muted"> — {mem.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Execution Engine
            </h3>
            <ol className="mt-3 space-y-2 text-sm text-ink">
              {executionPriority.map((item, i) => (
                <li key={item}>
                  <span className="font-mono text-accent">
                    {String.fromCharCode(65 + i)}.
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-xs text-ink-muted sm:text-sm">
              OBSERVE → UNDERSTAND → PLAN → CHECK PERMISSION → ACT → VERIFY
            </p>
          </div>
        </div>
      ) : null}

      {tab === "stack" ? (
        <div className="space-y-8" id="technology-stack">
          {technologyGroups.map((group) => (
            <CollapsibleBlock
              key={group.id}
              title={group.title}
              summary={`${group.items.length} ferramentas`}
              defaultOpen={group.id === technologyGroups[0]?.id}
              expandOnDesktop={false}
            >
              <ul className="space-y-4">
                {group.items.map((tech) => (
                  <li
                    key={tech.name}
                    className="border-t border-ink/10 pt-4 first:border-t-0 first:pt-0"
                  >
                    <p className="font-medium text-ink">{tech.name}</p>
                    <p className="mt-1 text-xs text-ink-soft">{tech.category}</p>
                    <p className="mt-2 text-sm text-ink-muted">
                      {tech.description}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">
                      <span className="text-ink">Por quê: </span>
                      {tech.why}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs">
                      <ExternalLink href={tech.docsUrl}>
                        Documentação
                      </ExternalLink>
                      {tech.siteUrl ? (
                        <ExternalLink href={tech.siteUrl}>
                          Site oficial
                        </ExternalLink>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </CollapsibleBlock>
          ))}
        </div>
      ) : null}

      {tab === "aprendizado" ? (
        <div className="space-y-6 text-sm text-ink-muted">
          <div className="border border-ink/10 bg-paper-surface p-5">
            <p className="font-display text-base font-semibold text-ink">
              Ensine mostrando
            </p>
            <p className="mt-2">
              Demonstração humana vira procedimento versionado — testado,
              corrigido e só então liberado para produção.
            </p>
          </div>
          <div className="border border-ink/10 bg-paper-surface p-5">
            <p className="font-display text-base font-semibold text-ink">
              Recuperação de erros
            </p>
            <p className="mt-2">
              Ação → resultado esperado? → alternativa segura → se não resolver,
              chama humano. Não continua clicando às cegas.
            </p>
          </div>
          <div className="border border-ink/10 bg-paper-surface p-5">
            <p className="font-display text-base font-semibold text-ink">
              Humano + IA
            </p>
            <p className="mt-2">
              Modos autônomo, assistido e handoff — com níveis de autonomia de
              observador a operador controlado.
            </p>
          </div>
          <div className="border border-ink/10 bg-paper-surface p-5">
            <p className="font-display text-base font-semibold text-ink">
              Voz
            </p>
            <p className="mt-2">
              Conversa, consulta sistemas durante a ligação e registra tudo —
              com transferência para humano quando necessário.
            </p>
          </div>
        </div>
      ) : null}
    </SectionShell>
  );
}

import {
  dataEntities,
  executionPriority,
  memoryTypes,
} from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PlatformSection() {
  return (
    <>
      <SectionShell id="orquestracao">
        <SectionHeading
          eyebrow="Decisão"
          title="Camada de decisão e resiliência"
          description="LangGraph gerencia estados, memória operacional e handoff humano. Temporal mantém workflows duráveis — tarefas retomam após falhas, reinícios ou indisponibilidade temporária de sistemas."
        />
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 font-mono text-xs text-zinc-300 sm:text-sm">
          <p>Solicitação chega → Agente interpreta → Precisa acessar sistema</p>
          <p className="mt-2 text-amber-200/90">→ Sistema indisponível</p>
          <p className="mt-2">→ Tarefa não é perdida → Retry agendado → Continua do ponto correto</p>
        </div>
      </SectionShell>

      <SectionShell id="dados" variant="muted">
        <SectionHeading
          eyebrow="Persistência"
          title="Banco de dados e modelo"
          description="PostgreSQL (ex.: via Supabase) centraliza entidades, execuções, permissões, evidências e auditoria. pgvector habilita memória semântica para procedimentos e manuais."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>O que o PostgreSQL guarda</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-400">
              Empresas, usuários, agentes, computadores, habilidades, tarefas, execuções,
              histórico, permissões, logs, aprovações, evidências e incidentes — sem armazenar
              senhas em texto puro nas tabelas.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Entidades principais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {dataEntities.map((entity) => (
                  <span
                    key={entity}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                  >
                    {entity}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-zinc-500">
                Organization → Users, Agents, Machines · Agent → Skills → Tasks → Executions,
                Steps, Approvals, Evidence, AuditLogs
              </p>
            </CardContent>
          </Card>
        </div>
      </SectionShell>

      <SectionShell id="filas-memoria">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Estado"
              title="Filas e estado"
              description="Redis para filas rápidas, locks e eventos. Tarefas críticas e longas beneficiam-se de Temporal em vez de fila simples isolada."
              className="mb-6"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Cognição"
              title="Memória"
              description="Camadas separadas — o agente não altera autonomamente regras críticas ou permissões."
              className="mb-6"
            />
            <ul className="space-y-3">
              {memoryTypes.map((mem) => (
                <li
                  key={mem.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-sm font-medium text-zinc-100">{mem.title}</p>
                  <p className="mt-1 text-sm text-zinc-400">{mem.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="execution-engine" variant="muted">
        <SectionHeading
          eyebrow="Execução"
          title="Execution Engine — estratégia híbrida"
          description="Antes de cada ação: descobrir janela ativa, contexto, localizar elemento e escolher método. Depois: executar, capturar estado, verificar resultado, salvar evidência."
        />
        <ol className="mb-6 space-y-2 text-sm text-zinc-300">
          {executionPriority.map((item, i) => (
            <li key={item}>
              <span className="font-mono text-cyan-300">{String.fromCharCode(65 + i)}.</span>{" "}
              {item}
            </li>
          ))}
        </ol>
        <div className="rounded-2xl border border-white/10 p-6 font-mono text-xs text-zinc-300 sm:text-sm">
          <p>OBSERVE → UNDERSTAND → PLAN → CHECK PERMISSION → ACT → VERIFY</p>
          <p className="mt-3 text-zinc-500">SUCCESS? → NEXT · NO → RECOVER → ESCALATE</p>
        </div>
      </SectionShell>
    </>
  );
}

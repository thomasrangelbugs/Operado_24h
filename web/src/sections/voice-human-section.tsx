import { autonomyLevels, humanModes } from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function VoiceHumanSection() {
  return (
    <>
      <SectionShell id="voz" variant="muted">
        <SectionHeading
          eyebrow="Voice Employee"
          title="Funcionário digital por voz"
          description="Conversa naturalmente, atende chamadas autorizadas, consulta sistemas durante a ligação e registra tudo — com transferência para humano quando necessário."
        />
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-zinc-300">
          <p>
            <span className="text-zinc-500">CLIENTE:</span> &quot;Gostaria de saber onde está meu
            pedido.&quot;
          </p>
          <p className="text-center text-zinc-600" aria-hidden="true">
            ↓
          </p>
          <p>
            <span className="text-zinc-500">AGENTE:</span> &quot;Pode me informar o número?&quot;
          </p>
          <p className="text-center text-zinc-600" aria-hidden="true">
            ↓
          </p>
          <p className="text-cyan-200">AGENTE UTILIZA O COMPUTADOR</p>
          <p className="text-center text-zinc-600" aria-hidden="true">
            ↓
          </p>
          <p>
            <span className="text-zinc-500">AGENTE:</span> &quot;Encontrei. O pedido está em
            transporte.&quot;
          </p>
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          Tecnologias possíveis: LiveKit, Twilio, modelos realtime de voz.
        </p>
      </SectionShell>

      <SectionShell id="humano-ia">
        <SectionHeading
          eyebrow="Colaboração"
          title="Humano + IA"
          description="Três modos operacionais — autonomia crescente, sempre com limites configuráveis."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {humanModes.map((mode) => (
            <Card key={mode.title}>
              <CardHeader>
                <CardTitle className="text-base">{mode.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-zinc-400">{mode.description}</CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-zinc-100">Controle compartilhado</p>
            <p className="mt-1 text-sm text-zinc-400">
              Pausar, assumir mouse/teclado, corrigir e devolver controle ao agente.
            </p>
          </div>
          <Button variant="outline" type="button" aria-label="Assumir controle — demonstração">
            ASSUMIR CONTROLE
          </Button>
        </div>
      </SectionShell>

      <SectionShell id="autonomia" variant="muted">
        <SectionHeading
          eyebrow="Política"
          title="Níveis de autonomia"
          description="Autonomia operacional crescente — nunca autoridade ilimitada."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {autonomyLevels.map((level) => (
            <Card key={level.level}>
              <CardHeader>
                <CardTitle className="text-base">
                  Nível {level.level} — {level.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-zinc-400">{level.description}</CardContent>
            </Card>
          ))}
        </div>
      </SectionShell>
    </>
  );
}

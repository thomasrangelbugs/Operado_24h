import {
  errorExamples,
  skillExample,
  teachSteps,
  versionedSkillFields,
} from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LearningSection() {
  return (
    <>
      <SectionShell id="ensinar">
        <SectionHeading
          eyebrow="Treinamento"
          title="Ensine mostrando"
          description="Demonstração humana vira procedimento versionado — testado, corrigido e só então liberado para produção."
        />
        <ol className="grid gap-3 sm:grid-cols-2">
          {teachSteps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300"
            >
              <span className="font-mono text-xs text-cyan-400">{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Exemplo — {skillExample.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-zinc-400">
              {skillExample.rules.map((rule) => (
                <li key={rule}>• {rule}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </SectionShell>

      <SectionShell id="habilidades" variant="muted">
        <SectionHeading
          eyebrow="Governança"
          title="Habilidades versionadas"
          description="Uma habilidade não é um prompt solto — é um pacote operacional completo, auditável e evolutivo."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-wrap gap-2">
            {versionedSkillFields.map((field) => (
              <Badge key={field} variant="muted">
                {field}
              </Badge>
            ))}
          </div>
          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardHeader>
              <CardTitle className="font-mono text-base">OPEN_SUPPORT_TICKET</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-zinc-500">Version:</span> 1.4
              </p>
              <p>
                <span className="text-zinc-500">Status:</span>{" "}
                <span className="text-emerald-300">VALIDATED</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </SectionShell>

      <SectionShell id="recuperacao-erros">
        <SectionHeading
          eyebrow="Resiliência"
          title="Recuperação de erros"
          description="Ele não pode continuar clicando quando algo dá errado. Analisa, tenta alternativa segura e escala para humano se necessário."
        />
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5 font-mono text-xs text-zinc-300 sm:text-sm">
          ação → resultado esperado? → SIM: continua · NÃO: analisa → alternativa → não
          resolveu? → chama humano
        </div>
        <div className="flex flex-wrap gap-2">
          {errorExamples.map((ex) => (
            <Badge key={ex} variant="warning">
              {ex}
            </Badge>
          ))}
        </div>
      </SectionShell>
    </>
  );
}

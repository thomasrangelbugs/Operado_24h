import { technologyGroups } from "@/data/technologies";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionShell } from "@/components/shared/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "@/components/shared/external-link";

export function TechStackSection() {
  return (
    <SectionShell id="technology-stack" variant="muted">
      <SectionHeading
        eyebrow="Stack"
        title="Ferramentas — do início ao fim"
        description="Technology Stack com links oficiais para documentação e sites. Organizado por camada para orientar implementação."
      />
      <div className="space-y-12">
        {technologyGroups.map((group) => (
          <div key={group.id}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-300/80">
              {group.title}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {group.items.map((tech) => (
                <Card key={tech.name}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{tech.name}</CardTitle>
                    <p className="text-xs text-zinc-500">{tech.category}</p>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p className="text-zinc-400">{tech.description}</p>
                    <p className="text-zinc-500">
                      <span className="text-zinc-400">Por quê: </span>
                      {tech.why}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <ExternalLink href={tech.docsUrl}>Documentação</ExternalLink>
                      {tech.siteUrl ? (
                        <ExternalLink href={tech.siteUrl}>Site oficial</ExternalLink>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {group.id === "desktop-shell" ? (
              <p className="mt-4 text-sm text-zinc-500">
                Para um primeiro protótipo, o agente Python também pode executar como serviço local
                sem shell desktop sofisticado.
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

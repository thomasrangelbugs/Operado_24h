/** Identidade editável — altere nome, slogans e CTAs aqui. */
export const brand = {
  productName: "Digital Employee",
  productTagline: "Funcionário 100% Digital",
  conceptLabel:
    "Projeto conceitual em desenvolvimento — PoC e piloto sob conversa.",
  footerNote: "Projeto conceitual",
  statusLabel: "Conceito · em desenvolvimento",

  seo: {
    title: "Digital Employee — Funcionário digital autônomo",
    description:
      "Uma arquitetura para funcionários digitais que compreendem, decidem e operam computadores como pessoas — com segurança, memória e supervisão.",
    ogTitle: "Digital Employee — Funcionário Digital Autônomo",
    ogDescription:
      "Percebe, entende, decide, executa, confere e aprende — sem depender de integrações com os sistemas operados.",
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://operador24horas.netlify.app",
  },

  audiences: [
    {
      title: "Operações e backoffice",
      description: "Cadastros, portais e processos repetitivos sem trocar o ERP.",
    },
    {
      title: "Atendimento e suporte",
      description: "Consulta sistemas, abre chamados e responde com evidência.",
    },
    {
      title: "Liderança técnica e produto",
      description: "Arquitetura auditável, zonas de risco e Control Center.",
    },
  ],

  hero: {
    title: "Um funcionário que vive dentro do computador.",
    subtitle:
      "Enxerga a tela, decide e opera os sistemas que a equipe já usa — 24 horas, com limites e supervisão.",
    complement:
      "Sem exigir que a empresa substitua os sistemas que já utiliza.",
    ctaPrimary: { label: "Ver como funciona", href: "#como-funciona" },
    ctaSecondary: { label: "Entrar na lista", href: "#lista-espera" },
  },

  finalCta: {
    title: "E se o próximo funcionário da sua empresa fosse digital?",
    description:
      "Mesmos computadores e ferramentas da equipe — aprendendo procedimentos e executando tarefas sob regras e supervisão.",
    primary: { label: "Entrar na lista de interesse", href: "#lista-espera" },
    secondary: { label: "Ver roadmap", href: "#roadmap" },
  },

  waitlist: {
    title: "Lista de interesse",
    description:
      "Deixe seu e-mail para acompanhar o avanço do conceito, demos e oportunidades de piloto.",
    placeholder: "seu@email.com",
    submit: "Quero ser avisado",
    success: "Recebido. Entraremos em contato quando houver novidades.",
    note: "Sem spam. Uso apenas para atualizações deste projeto.",
  },

  differential: {
    headline: "Ensine uma vez. Valide. Execute milhares de vezes.",
    from: "uma demonstração humana",
    to: "uma habilidade digital versionada, auditável, reutilizável e executável em escala.",
  },

  integrationPhrase: "Sem depender de integrações com os sistemas operados.",

  interfaceIntegration: "A interface passa a ser a integração.",
} as const;

import type {
  AutonomyLevel,
  BodyModule,
  EmployeeRole,
  FlowStep,
  MemoryType,
  MetricKpi,
  RoadmapPhase,
  SecurityZone,
  SkillMatrixRow,
} from "@/types";

export const paradigmComparison = [
  {
    title: "IA tradicional",
    flow: "Humano pergunta → IA responde.",
  },
  {
    title: "Automação tradicional",
    flow: "Humano configura → automação repete.",
  },
  {
    title: "Funcionário Digital",
    flow: "Percebe → entende → decide → executa → confere → aprende.",
    highlight: true,
  },
];

export const barrierSystems = [
  "ERP",
  "CRM",
  "Portais",
  "Sites",
  "Planilhas",
  "E-mails",
  "Sistemas antigos",
  "Softwares internos",
];

export const automationBarriers = [
  "integração",
  "desenvolvimento",
  "APIs",
  "conectores",
  "alteração dos sistemas",
];

export const howItWorksSteps: FlowStep[] = [
  {
    id: "perceber",
    title: "PERCEBER",
    description:
      "Captura tela, elementos, contexto, documentos e comandos.",
  },
  {
    id: "interpretar",
    title: "INTERPRETAR",
    description: "Entende o que está acontecendo.",
  },
  {
    id: "planejar",
    title: "PLANEJAR",
    description: "Decide quais ações são necessárias.",
  },
  {
    id: "executar",
    title: "EXECUTAR",
    description: "Opera mouse, teclado, navegador e aplicativos.",
  },
  {
    id: "conferir",
    title: "CONFERIR",
    description: "Verifica se o objetivo realmente foi alcançado.",
  },
  {
    id: "aprender",
    title: "APRENDER",
    description:
      "Registra procedimento, erro e correção para execuções futuras.",
  },
];

export const bodyModules: BodyModule[] = [
  {
    id: "eyes",
    title: "EYES",
    subtitle: "Visão do computador.",
    description: "Captura e interpreta interfaces, documentos e contexto visual.",
    icon: "Eye",
  },
  {
    id: "brain",
    title: "BRAIN",
    subtitle: "Raciocínio e planejamento.",
    description: "Define objetivos, passos e respostas diante de exceções.",
    icon: "Brain",
  },
  {
    id: "hands",
    title: "HANDS",
    subtitle: "Mouse, teclado e operação.",
    description: "Executa ações reais em navegadores e aplicativos Windows.",
    icon: "Hand",
  },
  {
    id: "memory",
    title: "MEMORY",
    subtitle: "Procedimentos, regras e contexto.",
    description: "Mantém habilidades versionadas e conhecimento operacional.",
    icon: "Database",
  },
  {
    id: "voice",
    title: "VOICE",
    subtitle: "Fala, escuta e telefonia.",
    description: "Conversa com usuários e clientes enquanto opera sistemas.",
    icon: "Mic",
  },
  {
    id: "guard",
    title: "GUARD",
    subtitle: "Permissões e segurança.",
    description: "Aplica limites, aprovações e políticas antes de agir.",
    icon: "Shield",
  },
  {
    id: "control",
    title: "CONTROL",
    subtitle: "Supervisão humana.",
    description: "Permite pausar, assumir controle e validar decisões críticas.",
    icon: "SlidersHorizontal",
  },
];

export const memoryTypes: MemoryType[] = [
  {
    title: "Memória de curto prazo",
    description: "Contexto da tarefa atual.",
  },
  {
    title: "Memória operacional",
    description: "Estado da execução.",
  },
  {
    title: "Memória de procedimentos",
    description: "Como realizar uma atividade.",
  },
  {
    title: "Memória de conhecimento",
    description: "Manuais, regras e instruções.",
  },
  {
    title: "Memória de experiência",
    description: "Erros anteriores e soluções validadas.",
  },
];

export const teachSteps = [
  'Usuário clica "Ensinar nova habilidade"',
  "Descreve o objetivo",
  "Inicia gravação",
  "Executa a atividade normalmente",
  "Agente observa",
  "Usuário explica regras e exceções",
  "Sistema transforma demonstração em procedimento",
  "Agente executa em ambiente de teste",
  "Humano corrige",
  "Habilidade é validada",
  "Habilidade recebe versão",
  "Somente depois entra em produção",
];

export const skillExample = {
  name: "ABRIR CHAMADO",
  rules: [
    "Procurar cliente antes de cadastrar",
    "Verificar duplicidade",
    "Validar CPF/CNPJ quando aplicável",
    "Preencher categoria correta",
    "Salvar",
    "Capturar protocolo",
    "Enviar confirmação",
  ],
};

export const versionedSkillFields = [
  "objetivo",
  "pré-condições",
  "regras",
  "passos",
  "exemplos",
  "exceções",
  "verificações",
  "permissões",
  "critérios de sucesso",
  "ações proibidas",
  "versão",
  "histórico de alterações",
];

export const errorExamples = [
  "Botão mudou de lugar",
  "Sessão expirou",
  "Internet caiu",
  "Formulário mudou",
  "Popup apareceu",
  "Cliente não existe",
  "Informação está ausente",
];

export const humanModes = [
  {
    title: "Autônomo",
    description: "Executa sozinho tarefas permitidas.",
  },
  {
    title: "Assistido",
    description: "IA trabalha enquanto uma pessoa acompanha.",
  },
  {
    title: "Handoff",
    description: "IA transfere uma situação para uma pessoa.",
  },
];

export const autonomyLevels: AutonomyLevel[] = [
  {
    level: 0,
    name: "Observador",
    description: "Somente observa e sugere.",
  },
  {
    level: 1,
    name: "Assistente",
    description: "Prepara ações para aprovação.",
  },
  {
    level: 2,
    name: "Operador",
    description: "Executa tarefas pré-aprovadas.",
  },
  {
    level: 3,
    name: "Autônomo controlado",
    description:
      "Planeja e executa objetivos dentro de regras, limites e permissões.",
  },
];

export const securityZones: SecurityZone[] = [
  {
    zone: "green",
    title: "Verde — pode executar sozinho",
    description: "Ações de baixo risco operacional.",
    examples: [
      "Organizar arquivos",
      "Consultar informações",
      "Registrar tarefas",
      "Criar rascunhos",
    ],
  },
  {
    zone: "yellow",
    title: "Amarelo — aprovação conforme política",
    description: "Impacto moderado ou comunicação externa.",
    examples: [
      "Enviar comunicação externa",
      "Alterar dados importantes",
      "Enviar cobrança",
      "Cancelar processo",
    ],
  },
  {
    zone: "red",
    title: "Vermelho — confirmação forte",
    description: "Operações sensíveis ou irreversíveis.",
    examples: [
      "Pagamentos",
      "Transferências",
      "Alterações bancárias",
      "Exclusões críticas",
      "Operações irreversíveis",
    ],
  },
];

export const isolationSessions = [
  { agent: "AGENT 01", session: "WINDOWS SESSION 01" },
  { agent: "AGENT 02", session: "WINDOWS SESSION 02" },
  { agent: "AGENT 03", session: "WINDOWS SESSION 03" },
];

export const observabilityFields = [
  "timestamp",
  "agent",
  "machine",
  "task",
  "skill",
  "action",
  "result",
  "confidence",
  "evidence",
  "duration",
];

export const controlCenterStats = [
  { label: "Agentes online", value: "08" },
  { label: "Executando", value: "04" },
  { label: "Aguardando", value: "03" },
  { label: "Precisam de ajuda", value: "01" },
  { label: "Tarefas hoje", value: "1.284" },
  { label: "Taxa de conclusão", value: "96,8%" },
  { label: "Tempo economizado", value: "147h" },
];

export const controlCenterAgents = [
  { name: "Employee 01", area: "Atendimento", status: "ONLINE" },
  { name: "Employee 02", area: "Financeiro", status: "WAITING APPROVAL" },
  { name: "Employee 03", area: "Cadastros", status: "WORKING" },
  { name: "Employee 04", area: "Documentos", status: "ONLINE" },
];

export const employeeRoles: EmployeeRole[] = [
  {
    title: "Atendimento Digital",
    items: [
      "Recebe solicitações",
      "Consulta sistemas",
      "Responde",
      "Registra chamados",
    ],
  },
  {
    title: "Assistente Administrativo",
    items: [
      "Preenche formulários",
      "Atualiza planilhas",
      "Organiza documentos",
    ],
  },
  {
    title: "Operador Financeiro",
    items: [
      "Confere documentos",
      "Prepara cobranças",
      "Compara valores",
      "Solicita aprovação",
    ],
  },
  {
    title: "Backoffice Digital",
    items: [
      "Cadastra informações",
      "Consulta portais",
      "Processa solicitações",
    ],
  },
  {
    title: "Suporte Digital",
    items: [
      "Interpreta problemas",
      "Abre chamados",
      "Acompanha",
      "Responde clientes",
    ],
  },
];

export const storySteps = [
  "Nova mensagem recebida",
  "Agente interpreta",
  "Identifica cliente",
  "Abre sistema",
  "Pesquisa cadastro",
  "Localiza pedido",
  "Identifica problema",
  "Abre chamado",
  "Recebe protocolo",
  "Registra evidência",
  "Responde",
  "Encerra tarefa",
];

export const skillMatrix: SkillMatrixRow[] = [
  { domain: "Visão", items: ["screenshots", "interfaces", "documentos"] },
  {
    domain: "Ação",
    items: ["mouse", "teclado", "browser", "Windows"],
  },
  {
    domain: "Raciocínio",
    items: ["objetivos", "planejamento", "exceções"],
  },
  {
    domain: "Memória",
    items: ["procedimentos", "regras", "contexto"],
  },
  {
    domain: "Comunicação",
    items: ["texto", "voz", "telefone"],
  },
  {
    domain: "Segurança",
    items: ["permissões", "aprovações", "auditoria"],
  },
  {
    domain: "Resiliência",
    items: ["erro", "retry", "recovery", "checkpoint"],
  },
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "01",
    title: "Proof of Concept",
    items: [
      "Screenshot",
      "Interpretação",
      "Mouse e teclado",
      "Navegador",
      "Execução simples",
    ],
  },
  {
    phase: "02",
    title: "First Skill",
    items: [
      "Uma atividade real",
      "Regras e validações",
      "Tratamento de erro",
    ],
  },
  {
    phase: "03",
    title: "Memory",
    items: ["Procedimentos", "Estados", "Contexto"],
  },
  {
    phase: "04",
    title: "Training",
    items: [
      "Ensinar por demonstração",
      "Editar regras",
      "Versionamento",
    ],
  },
  {
    phase: "05",
    title: "Control Center",
    items: ["Múltiplos agentes", "Máquinas", "Filas", "Métricas"],
  },
  {
    phase: "06",
    title: "Voice",
    items: ["Fala", "Escuta", "Telefonia"],
  },
  {
    phase: "07",
    title: "Digital Workforce",
    items: [
      "Múltiplos agentes 24/7",
      "Habilidades compartilhadas",
      "Governança empresarial",
    ],
  },
];

export const mvpSteps = [
  "Identificar solicitação",
  "Extrair informações",
  "Abrir navegador",
  "Acessar ambiente de demonstração",
  "Procurar cliente",
  "Preencher formulário",
  "Salvar",
  "Conferir protocolo",
  "Registrar evidência",
  "Concluir tarefa",
];

export const metricsKpis: MetricKpi[] = [
  {
    name: "Task Completion Rate",
    description: "% de tarefas concluídas corretamente.",
  },
  {
    name: "Human Intervention Rate",
    description: "% que precisaram de pessoa.",
  },
  {
    name: "Mean Execution Time",
    description: "Tempo médio de execução.",
  },
  {
    name: "Recovery Rate",
    description: "% de erros recuperados autonomamente.",
  },
  {
    name: "Cost Per Task",
    description: "Custo de execução por tarefa.",
  },
  {
    name: "Verification Rate",
    description: "% de tarefas com confirmação objetiva.",
  },
  {
    name: "Skill Reliability",
    description: "Confiabilidade por habilidade.",
  },
];

export const limitsList = [
  "Consciência ou inteligência humana geral",
  "Execução infalível em qualquer cenário",
  "Capacidade universal sem configuração",
  "Autonomia financeira irrestrita",
  "Acesso sem autorização",
  "Quebra de CAPTCHA ou bypass de MFA",
  "Funcionamento imediato em qualquer software",
];

export const auditTimeline = [
  { time: "14:02:11", event: "Task started" },
  { time: "14:02:14", event: "CRM opened" },
  { time: "14:02:18", event: "Client searched" },
  { time: "14:02:21", event: "Client found" },
  { time: "14:02:28", event: "Ticket form opened" },
  { time: "14:02:42", event: "Form validated" },
  { time: "14:02:45", event: "Ticket created" },
  { time: "14:02:47", event: "Protocol #849211 verified" },
  { time: "14:02:49", event: "Task completed" },
];

export const dataEntities = [
  "Organization",
  "User",
  "Agent",
  "Machine",
  "Skill",
  "SkillVersion",
  "Task",
  "TaskExecution",
  "Step",
  "Approval",
  "CredentialReference",
  "Evidence",
  "Incident",
  "Conversation",
  "Call",
  "AuditLog",
];

export const executionPriority = [
  "UI Automation / Accessibility",
  "Playwright / DOM",
  "Visual reasoning",
  "Coordinate click (último recurso)",
];

export const agentCapabilities = [
  "Enxergar a tela",
  "Interpretar contexto",
  "Abrir programas e sites",
  "Clicar e digitar",
  "Preencher formulários",
  "Consultar informações",
  "E-mails e planilhas",
  "Cadastros e chamados",
  "Atender por voz",
  "Detectar erros e alternativas",
  "Pedir ajuda quando necessário",
  "Conferir conclusão e registrar evidências",
  "Aprender procedimentos",
];

export const beforeAfter = {
  before: {
    title: "Automação tradicional",
    items: [
      "Projeto longo de integração por sistema",
      "APIs, conectores e mudanças no legado",
      "Cada ERP/CRM vira um projeto novo",
      "Quebra quando a interface ou o fluxo muda",
    ],
  },
  after: {
    title: "Funcionário digital",
    items: [
      "Opera pela mesma interface que a pessoa",
      "Sem exigir troca dos sistemas atuais",
      "Habilidade ensinada, validada e versionada",
      "Erro → alternativa segura ou handoff humano",
    ],
  },
};

export const storyboardFrames = [
  {
    time: "02:43",
    title: "Chega a solicitação",
    detail: "Mensagem noturna no canal de suporte.",
  },
  {
    time: "02:44",
    title: "Entende o pedido",
    detail: "Identifica cliente, pedido e o problema.",
  },
  {
    time: "02:45",
    title: "Opera o sistema",
    detail: "Abre CRM, localiza registro e abre chamado.",
  },
  {
    time: "02:45",
    title: "Fecha com evidência",
    detail: "Protocolo capturado, resposta enviada, trilha salva.",
  },
];

export const faqItems = [
  {
    question: "Isso substitui a equipe?",
    answer:
      "Não. O objetivo é absorver trabalho repetitivo na interface — com supervisão humana, zonas de risco e handoff quando necessário.",
  },
  {
    question: "Precisa de API em cada sistema?",
    answer:
      "A premissa é o contrário: se uma pessoa consegue operar pela tela, o agente também pode — com permissões, evidências e limites. APIs continuam úteis quando existem.",
  },
  {
    question: "E se a tela mudar ou aparecer um erro?",
    answer:
      "O ciclo inclui conferência e recuperação: tenta alternativa segura, registra evidência e escala para humano se não resolver.",
  },
  {
    question: "O agente tem autonomia financeira?",
    answer:
      "Não por padrão. Pagamentos e ações irreversíveis ficam na zona vermelha — exigem confirmação forte e política explícita.",
  },
  {
    question: "Computer Use, RPA e chatbot — qual a diferença?",
    answer:
      "Chatbot só responde. RPA repete cliques frágeis. O funcionário digital percebe contexto, decide, executa, confere e aprende procedimentos versionados.",
  },
  {
    question: "Em que estágio está o projeto?",
    answer:
      "É um conceito tecnológico em desenvolvimento. A lista de interesse serve para demos, feedback e conversas de piloto — sem promessa de produto pronto.",
  },
];

export const miniLoop = [
  { label: "Ensine", detail: "Demonstre o processo uma vez." },
  { label: "Valide", detail: "Teste, corrija e versione a habilidade." },
  { label: "Execute", detail: "Rode em escala com auditoria." },
];

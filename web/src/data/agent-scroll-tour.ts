export type DemoMode = "chatbot" | "rpa" | "digital";
export type AutonomyLevel = 0 | 1 | 2 | 3;
export type PlaybackSpeed = 0.5 | 1 | 2;

export type StatusKey =
  | "idle"
  | "hover"
  | "click"
  | "select"
  | "type"
  | "wander"
  | "drop"
  | "error"
  | "recover"
  | "approve"
  | "observe"
  | "teach"
  | "human";

export type AuditEvent = {
  id: string;
  time: string;
  label: string;
  kind: StatusKey | "info" | "success" | "warn";
};

export type HeatPoint = { x: number; y: number; t: number };

export const agentTourCopy = {
  badge: "Agente digital · operando",
  dismiss: "Encerrar",
  restart: "Rever simulação",
  menuStart: "Ver demonstração",
  menuStop: "Encerrar demo",
  menuRunning: "Demo ativa",
  desktopOnly: "A demonstração interativa está disponível no desktop.",
  minimize: "Minimizar",
  expand: "Expandir",
  minimizeAll: "Minimizar painéis",
  expandAll: "Expandir painéis",
  panelsDock: "Painéis",
  takeControl: "Assumir controle",
  returnControl: "Devolver ao agente",
  soundOn: "Som",
  soundOff: "Mudo",
  speedLabel: "Velocidade",
  modeLabel: "Modo",
  autonomyLabel: "Autonomia",
  teachStart: "Ensinar mostrando",
  teachStop: "Parar gravação",
  teachDone: "Skill v1.0 VALIDATED",
  auditTitle: "Auditoria ao vivo",
  viewportTitle: "O que o agente vê",
  heatmapTitle: "Mapa de atenção",
  narratorFallback: "Observando a interface…",
  vmOverlay: "Isso rodaria em uma sessão Windows / VM isolada",
  approvalAsk: "Ação amarela — aprovar?",
  approve: "Aprovar",
  deny: "Negar",
  errorPopup: "Popup inesperado detectado",
  recoverAlt: "Tentando caminho alternativo…",
  escalate: "Escalando para humano…",
  chatTitle: "Digital Employee",
  chatStatus: "online",
  chatMessage:
    "Simulação concluída. Li a página, recuperei um erro, registrei evidência e deixei a trilha de auditoria — como um funcionário digital com limites.",
  chatCloseLabel: "Fechar conversa",
  noteLabel: "Nota do agente",
  evidenceCaption: "EVIDÊNCIA · ROBOT_OK.png",
  modes: {
    chatbot: {
      name: "Chatbot",
      blurb: "Só responde texto. Não opera a tela.",
    },
    rpa: {
      name: "RPA",
      blurb: "Repete cliques fixos. Quebra se a UI muda.",
    },
    digital: {
      name: "Funcionário Digital",
      blurb: "Percebe → decide → executa → confere → aprende.",
    },
  },
  autonomy: {
    0: "N0 Observador — só sugere",
    1: "N1 Assistente — pede aprovação",
    2: "N2 Operador — executa pré-aprovado",
    3: "N3 Autônomo controlado — planeja com limites",
  },
  status: {
    idle: "observando viewport",
    hover: "inspecionando elemento",
    click: "clicando",
    select: "selecionando texto",
    type: "digitando",
    wander: "navegando interface",
    drop: "anexando evidência",
    error: "erro detectado",
    recover: "recuperando",
    approve: "aguardando aprovação",
    observe: "apenas observando",
    teach: "aprendendo por demonstração",
    human: "controle humano",
  },
  narrations: {
    idle: "Lendo o que está na viewport…",
    hover: "Inspecionando o elemento sob o cursor…",
    click: "Executando clique e conferindo resposta visual…",
    select: "Selecionando conteúdo para extrair contexto…",
    type: "Registrando nota operacional em tempo real…",
    wander: "Varredura lateral da interface…",
    drop: "Anexando evidência visual (print)…",
    error: "UI mudou — popup inesperado.",
    recover: "Caminho alternativo seguro em andamento…",
    approve: "Política amarela: preciso da sua confirmação.",
    observe: "Nível 0: apenas observo e sugeriria ações.",
    teach: "Grave sua demonstração. Vou transformar em skill.",
    human: "Você assumiu o controle. Eu observo.",
  },
  typingSnippets: [
    "Solicitação #18492 — cliente identificado.",
    "Abrindo formulário… preenchendo categoria.",
    "Protocolo capturado. Evidência salva.",
    "Tarefa conferida. Sem intervenção humana.",
  ],
} as const;

export const agentInteractiveSelectors = [
  "[data-agent-focus]",
  "h1",
  "h2",
  "h3",
  "button",
  "a",
  "[class*='rounded-2xl']",
  "[class*='rounded-xl']",
  "p",
] as const;

export const AGENT_TOUR_STORAGE_KEY = "de-agent-scroll-tour-v4";

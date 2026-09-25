export type NavItem = {
  label: string;
  href: string;
};

export type TechLink = {
  name: string;
  category: string;
  description: string;
  why: string;
  docsUrl: string;
  siteUrl?: string;
};

export type TechGroup = {
  id: string;
  title: string;
  items: TechLink[];
};

export type BodyModule = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
};

export type FlowStep = {
  id: string;
  title: string;
  description: string;
};

export type EmployeeRole = {
  title: string;
  items: string[];
};

export type MemoryType = {
  title: string;
  description: string;
};

export type AutonomyLevel = {
  level: number;
  name: string;
  description: string;
};

export type SecurityZone = {
  zone: "green" | "yellow" | "red";
  title: string;
  description: string;
  examples: string[];
};

export type RoadmapPhase = {
  phase: string;
  title: string;
  items: string[];
};

export type EntityNode = {
  name: string;
  relations?: string[];
};

export type MetricKpi = {
  name: string;
  description: string;
};

export type SkillMatrixRow = {
  domain: string;
  items: string[];
};

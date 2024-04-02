export interface User {
  name: string;
  email: string;
  password: string;
  rol: "user" | "inversor" | "admin";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Project {
  projectName?: string;
  projectCategory?: string;
  fundingCap?: number;
  mechatronicComponents?: string[];
  controlPlatforms?: string[];
  designMethodology?: string;
  hasAI?: boolean;
  collaborators?: string[];
  resourceOptimization?: string[];
  location?: string[];
  manufacturingTechnology?: string[];
  developmentStatus?: number;
  riskLevel?: string;
  projectObjective?: string;
  rewardType?: string[];
  returnPeriod?: number;
  competitiveLandscape?: string[];
  description?: string;
  isActive?: boolean;
  projectImages?: string[];
}

export type RegisterData = Pick<User, "name" | "email" | "password" | "rol">;

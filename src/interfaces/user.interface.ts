export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  rol: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Project {
  id: string;
  projectName?: string;
  projectCategory?: string;
  fundingCap?: number;
  mechatronicComponents?: string[];
  controlPlatforms?: string[];
  designMethodology?: string;
  hasAI?: boolean;
  collaborators?: string[];
  resourceOptimization?: string[];
  location?: string;
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
  representant?: Omit<User, "password">;
  team: Omit<User, "password">[]
}

export type ProjectData = Omit<Project, "id" | "representant" | "team">;


export interface UserProfile {
  profile: User;
  isInvestor: boolean;
  preferencesCompleted: boolean;
  avatar: {
    url: string;
    initials: string;
  }
}

export type RegisterData = Pick<User, "firstname" | "email" | "password" | "rol" | "lastname">;

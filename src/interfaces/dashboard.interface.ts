import { Project } from "./user.interface";

export interface DashboardData {
    savedProjects: Project[];
    financedProjects: Project[];
    favoriteProjects: Project[];
    postuledProjects: Project[];
    pendingProjects: Project[];
}

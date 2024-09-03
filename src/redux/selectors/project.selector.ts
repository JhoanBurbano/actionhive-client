import { useSelector } from "react-redux";
import { RootState } from "../store";

export const selectProjectState = ()=>useSelector((state: RootState) => state.project);
export const selectProjects = ()=>useSelector((state: RootState) => state.project.projects);
export const selectUserProjects = ()=>useSelector((state: RootState) => state.project.userProjects);
export const selectProjectView = ()=>useSelector((state: RootState) => state.project.projectView);
export const selectRecomendedProjects = ()=>useSelector((state: RootState) => state.project.recomendedProjects);
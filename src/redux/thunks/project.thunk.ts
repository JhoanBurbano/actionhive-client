import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoader } from "../slices/ui.slice";
import { ProjectData } from "../../interfaces/user.interface";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  getProjectsRecomended,
  getUserProjects,
  updateProject,
} from "../../services/project.service";

export const thunkGetProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const projects = await getProjects();
      dispatch(setLoader(false));
      return projects;
    } catch (error) {
      console.log("error :>> ", error);
      dispatch(setLoader(false));
      return { user: null, token: null };
    }
  }
);

export const thunkGetUserProjects = createAsyncThunk(
  "projects/getUserProjects",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const projects = await getUserProjects();
      dispatch(setLoader(false));
      return projects;
    } catch (error) {
      console.log("error :>> ", error);
      dispatch(setLoader(false));
      return { user: null, token: null };
    }
  }
);

export const thunkGetProjectsRecomended  = createAsyncThunk(
  "projects/getProjectsRecomended",
  async (role: "investor" | "user", { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const projects = await getProjectsRecomended(role);
      dispatch(setLoader(false));
      return projects;
    } catch (error) {
      console.log("error :>> ", error);
      dispatch(setLoader(false));
      return [];
    }
  }
);

export const thunkGetProject = createAsyncThunk(
  "projects/getProjectDetail",
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const projects = await getProject(id);
      dispatch(setLoader(false));
      return projects;
    } catch (error) {
      console.log("error :>> ", error);
      dispatch(setLoader(false));
      return { user: null, token: null };
    }
  }
);

export const thunkCreateProject = createAsyncThunk(
  "projects/createProject",
  async (project: ProjectData, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const projects = await createProject(project);
      dispatch(setLoader(false));
      console.log('here :>> ');
      await dispatch(thunkGetUserProjects());
      return projects;
    } catch (error) {
      console.log("error :>> ", error);
      dispatch(setLoader(false));
      return { user: null, token: null };
    }
  }
);

export const thunkUpdateProject = createAsyncThunk(
  "projects/updateProject",
  async (
    { id, project }: { id: string; project: any },
    { dispatch }
  ) => {
    try {
      dispatch(setLoader(true));
      const projects = await updateProject(id, project);
      dispatch(setLoader(false));
      dispatch(thunkGetUserProjects());
      await dispatch(thunkGetProject(id));
      return projects;
    } catch (error) {
      console.log("error :>> ", error);
      dispatch(setLoader(false));
      return { user: null, token: null };
    }
  }
);

export const thunkDeleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const projects = await deleteProject(id);
      dispatch(setLoader(false));
      await dispatch(thunkGetUserProjects());
      return projects;
    } catch (error) {
      console.log("error :>> ", error);
      dispatch(setLoader(false));
      return { user: null, token: null };
    }
  }
);



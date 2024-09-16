import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoader } from "../slices/ui.slice";
// import { Project, ProjectData } from "../../interfaces/user.interface";
import {
  getDahsboardData
} from "../../services/dashboard.service.ts";

export const thunkGetDashboardData = createAsyncThunk(
  "dashboard/getProjectsData",
  async (isInvestor: boolean, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const projects = await getDahsboardData(isInvestor ? ["financedProjects", "savedProjects", "favoriteProjects"] : ["postuledProjects", "financedProjects", "pendingProjects"], isInvestor);
      dispatch(setLoader(false));
      return projects;
    } catch (error) {
      console.log("error :>> ", error);
      dispatch(setLoader(false));
      return { savedProjects: null, financedProjects: null, favoriteProjects: null, postuledProjects: null, pendingProjects: null };
    }
  }
);


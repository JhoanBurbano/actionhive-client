import { createSlice } from '@reduxjs/toolkit';
import { Project } from '../../interfaces/user.interface.js';
import { thunkGetProject, thunkGetProjects, thunkGetProjectsRecomended, thunkGetUserProjects } from '../thunks/project.thunk.js';
import { thunkSignOut } from '../thunks/auth.thunk.js';

export interface ProjectState {
  projects: Project[] | null;
  userProjects: Project[] | null;
  recomendedProjects: Project[] | null;
  projectView: Project | null;
}

const initialState: ProjectState = {
    projects: null,
    userProjects: null,
    recomendedProjects: null,
    projectView: null,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(thunkGetProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    })
    .addCase(thunkGetUserProjects.fulfilled, (state, action) => {
      state.userProjects = action.payload;
    })
    .addCase(thunkGetProjectsRecomended.fulfilled, (state, action) => {
      console.log('action.payload :>> ', action.payload);
      state.recomendedProjects = action.payload;
    })
    .addCase(thunkGetProject.fulfilled, (state, action) => {
      state.projectView = action.payload
    })
    .addCase(thunkSignOut.fulfilled, (state) => {
      state.projects = null;
      state.userProjects = null;
      state.projectView = null;
    });
  },
});


export default projectSlice.reducer;

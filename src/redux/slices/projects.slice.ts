import { createSlice } from '@reduxjs/toolkit';
import { Project } from '../../interfaces/user.interface.js';
import { thunkGetProject, thunkGetProjects, thunkGetUserProjects, thunkUpdateProject } from '../thunks/project.thunk.js';

export interface ProjectState {
  projects: Project[] | null;
  userProjects: Project[] | null;
  projectView: Project | null;
}

const initialState: ProjectState = {
    projects: null,
    userProjects: null,
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
      console.log('action.payload :>> ', action.payload);

    })
    .addCase(thunkGetProject.fulfilled, (state, action) => {
      state.projectView = action.payload
    })
    .addCase(thunkUpdateProject.fulfilled, (state, action) => {
      state.projectView = action.payload
    })
  },
});


export default projectSlice.reducer;

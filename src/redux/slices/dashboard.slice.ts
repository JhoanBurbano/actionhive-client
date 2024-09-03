import { createSlice } from '@reduxjs/toolkit';
import { Project } from '../../interfaces/user.interface.js';
import { thunkGetDashboardData } from '../thunks/dashboard.thunk.js';

export interface DashboardState {
  savedProjects: Project[] | null;
  financedProjects: Project[] | null;
  favoriteProjects: Project[] | null;
  postuledProjects: Project[] | null;
  pendingProjects: Project[] | null;
}

const initialState: DashboardState = {
    savedProjects: null,
    financedProjects: null,
    favoriteProjects: null,
    postuledProjects: null,
    pendingProjects: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(thunkGetDashboardData.fulfilled, (state, action) => {
      console.log("--> ",action.payload)
      state.savedProjects = action.payload?.savedProjects!;
      state.financedProjects = action.payload?.financedProjects!;
      state.favoriteProjects = action.payload?.favoriteProjects!;
      state.postuledProjects = action.payload?.postuledProjects!;
      state.pendingProjects = action.payload?.pendingProjects!;
    })
  },
});


export default dashboardSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
  thunkSignInWithEmailAndPassword,
  thunkSignOut,
  thunkSignUpWithEmailAndPassword,
} from '../thunks/auth.thunk.js';
import { UserProfile } from '../../interfaces/user.interface.js';
import { RootState } from '../store.js';

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(thunkSignInWithEmailAndPassword.fulfilled, (state, action) => {
      state.user = action.payload!.user;
      state.token = action.payload!.token;
      })
    .addCase(thunkSignUpWithEmailAndPassword.fulfilled,(state, action) => {
      state.user = action.payload!.user;
      state.token = action.payload!.token;
      })
      .addCase(thunkSignOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
  },
});

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;

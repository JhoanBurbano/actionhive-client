import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../services/auth.service";
import { RegisterData, LoginData } from "../../interfaces/user.interface";
import { setLoader } from "../slices/ui.slice";

export const thunkSignOut = createAsyncThunk('auth/signOut', async (_, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    // await AuthService.signOut();
    dispatch(setLoader(false));
  } catch (error) {
    dispatch(setLoader(false));
  }
});

export const thunkSignUpWithEmailAndPassword = createAsyncThunk(
  "auth/signUp",
  async ({ firstname, lastname, email, password, rol }: RegisterData, { dispatch }) => {
    try {
      console.log('here :>> ', );
      dispatch(setLoader(true));
      const user = await register(firstname, lastname, email, password, rol);
      if (!user) {
        throw Error("Credenciales invalidas");
      }
      dispatch(setLoader(false));
      return user;
    } catch (error) {
      console.log("error :>> ", error);
      dispatch(setLoader(false))
      return { user: null, token: null}
    }
  }
);

export const thunkSignInWithEmailAndPassword = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: LoginData, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const user = await login(email, password);
      dispatch(setLoader(false));
      if (!user) {
        throw Error("Credenciales invalidas");
      }
      return user;
    } catch (error) {
      console.log("error :>> ", error);
      dispatch(setLoader(false))
      return { user: null, token: null}
    }
  }
);

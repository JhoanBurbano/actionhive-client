import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, updateProfile, refreshUser } from "../../services/auth.service";
import { RegisterData, LoginData } from "../../interfaces/user.interface";
import { setLoader } from "../slices/ui.slice";
import { purgePersist } from "../../utils/localstorage";

export const thunkSignOut = createAsyncThunk('auth/signOut', async (_, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    // await AuthService.signOut();
    purgePersist();
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
  async ({ email, password, isInvestor }: LoginData & {isInvestor: boolean}, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const user = await login(email, password, isInvestor);
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


export const thunkUpdateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({data, isInvestor}: {data: RegisterData, isInvestor: boolean}, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const user = await updateProfile(data, isInvestor);
      dispatch(setLoader(false));
      console.log({ userThunk: user})
      return user;
    } catch (error) {
      dispatch(setLoader(false));
      return { user: null }
    }
  }
);

export const thunkRefreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const user = await refreshUser();
      dispatch(setLoader(false));
      return user;
    } catch (error) {
      dispatch(setLoader(false));
      return { user: null }
    }
  }
);

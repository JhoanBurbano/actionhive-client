import { useSelector } from "react-redux";
import { RootState } from "../store";

export const selectAuthState = ()=>useSelector((state: RootState) => state.auth);
export const selectToken = ()=>useSelector((state: RootState) => state.auth.token);
export const selectUser = ()=>useSelector((state: RootState) => state.auth.user);
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const selectUIState = ()=>useSelector((state: RootState) => state.ui);
export const selectOverflow = ()=>useSelector((state: RootState) => state.ui.overflow);
export const selectLoader = ()=>useSelector((state: RootState) => state.ui.loader);
export const selectMobile = ()=>useSelector((state: RootState) => state.ui.isMobile);

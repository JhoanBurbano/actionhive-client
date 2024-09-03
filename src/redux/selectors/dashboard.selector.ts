import { useSelector } from "react-redux";
import { RootState } from "../store";

export const selectDashboardData = ()=>useSelector((state: RootState) => state.dashboard);

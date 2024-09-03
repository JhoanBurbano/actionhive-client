import axios from "axios";
import { API_URL } from "../constants/config.constants";
import { DashboardData } from "../interfaces/dashboard.interface";

export const getDahsboardData = async (fields: string[], isInvestor: boolean): Promise<DashboardData | undefined> => {
    try {
        console.log('isInvestor :>> ', isInvestor);
        const response = await axios.get(`${API_URL}investors/filter?fields=${fields.join(",")}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
    }
import axios from "axios";
import { API_URL } from "../constants/config.constants";

export const updatePreferences = async (responses: {[key: string]: string}, role: string) => {
  try {
    const response = await axios.post(`${API_URL}preferences/update`, {
        responses,
        role
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

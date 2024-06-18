import axios from "axios";
import { API_URL } from "../constants/config.constants";

export const login = async (email: string, password: string) => {
  try {
    console.log('email :>> ', email);
    const response = await axios.post(`${API_URL}access/login`, {
      email,
      password,
    });
    console.log('response.data.data :>> ', response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


export const register = async (name: string, email: string, password: string, rol: string) => {
  try {
    const response = await axios.post(`${API_URL}access/register`, {
      name,
      email,
      password,
      rol,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

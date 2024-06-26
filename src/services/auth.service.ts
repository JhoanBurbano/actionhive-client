import axios from "axios";
import { API_URL } from "../constants/config.constants";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}access/login`, {
      email,
      password,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


export const register = async (firstname: string, lastname:string, email: string, password: string, rol: string) => {
  try {
    const response = await axios.post(`${API_URL}access/register`, {
      firstname,
      lastname,
      email,
      password,
      rol,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}access/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateToken = async (token: string) => {
  try {
    const response = await axios.post(`${API_URL}access/validate-token`, {
      token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (password: string, token: string) => {
  try {
    const response = await axios.post(`${API_URL}access/change-password`, {
      password,
      token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
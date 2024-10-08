import axios from '../utils/axios'
import { API_URL } from "../constants/config.constants";
import { ProjectData } from "../interfaces/user.interface";

export const getProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}projects/`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
};


export const getUserProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}projects/user/`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
};


export const getProjectsRecomended = async (role: "investor" | "user") => {
  try {
    const response = await axios.get(`${API_URL}projects/recommendations/${role}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


export const getProject = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}projects/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
}

export const createProject = async (project: ProjectData) => {
    try {
      const response = await axios.post(`${API_URL}projects/`, project);
      return response.data.data;
    } catch (error) {
      throw error;
    }
}

export const updateProject = async (id: string, project: any) => {
    try {
      console.log('project :>> ', project);
      const response = await axios.put(`${API_URL}projects/${id}`, project);
      return response.data.data;
    } catch (error) {
      throw error;
    }
}

export const deleteProject = async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}projects/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
}
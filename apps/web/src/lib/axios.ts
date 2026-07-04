import { BASE_API_URL } from "@/utils/config";
import axios, { AxiosInstance } from "axios";

const baseURL = BASE_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});
export const axiosWithoutToken: AxiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

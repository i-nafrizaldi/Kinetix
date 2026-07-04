"use client";
import { axiosInstance } from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { logoutAction } from "@/redux/slice/userSlice";

import { useEffect } from "react";

const useAxios = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err?.response?.status === 401) {
          dispatch(logoutAction());
          localStorage.removeItem("token");
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [dispatch, token]);

  return {axiosInstance};
};

export default useAxios;

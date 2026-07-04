"use client";
import { loginAction } from "@/redux/slice/userSlice";
import { Role, User } from "@/types/user.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import useAxios from "../useAxios";
import { response } from "express";

interface LoginResponses {
  message: string;
  data: User;
}
interface LoginArgs {
  email?: string;
  password?: string;
  role?: Role;
}

const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { axiosInstance } = useAxios();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (payload: LoginArgs) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post<LoginResponses>(
        "/auth/login",
        payload,
      );

      dispatch(loginAction(data.data));
      // localStorage.setItem("token", data.token);

      if (data.data.role === Role.ADMIN) {
        router.push("/dashboard");
      }
      if (data.data.role === Role.USER) {
        router.push("/");
      }
      toast.success(data.message);
      console.log("masuk");
    } catch (error) {
      console.log("error");

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading };
};
export default useLogin;

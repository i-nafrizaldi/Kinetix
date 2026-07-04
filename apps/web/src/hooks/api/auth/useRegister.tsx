"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useAxios from "../useAxios";

interface RegisterResponses {
  message: string;
}
interface RegisterArgs {
  fullName: string;
  email?: string;
  password?: string;
}

const useRegister = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const [isLoading, setIsLoading] = useState(false);

  const register = async (payload: RegisterArgs) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post<RegisterResponses>(
        "/auth/register",
        payload,
      );

      toast.success(data.message);
      router.push("/");
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
  return { register, isLoading };
};
export default useRegister;

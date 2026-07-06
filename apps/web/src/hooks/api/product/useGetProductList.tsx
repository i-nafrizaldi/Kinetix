"use client";

import { IPaginationMeta, IPaginationQueries } from "@/types/pagination.type";
import { Product } from "@/types/product.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useAxios from "../useAxios";

interface IGetProductQuery extends IPaginationQueries {
  search?: string;
  status?: string;
}
const useGetProductList = (queries: IGetProductQuery) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Product[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getProductList = async () => {
    try {
      const { data } = await axiosInstance.get("/product", {
        params: queries,
      });
      setMeta(data.meta);
      setData(data.data);
      console.log(data.data,"ini data hooks");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProductList();
  }, [
    queries.status,
    queries.page,
    queries.search,
    queries.sortBy,
    queries.sortOrder,
    queries.take,
  ]);
  return { data, meta, isLoading, refetch: getProductList };
};

export default useGetProductList;

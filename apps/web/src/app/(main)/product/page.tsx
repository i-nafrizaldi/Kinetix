import React from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import ProductCard from "@/components/ProductCard";

const page = () => {
  return (
    <div className="p-4 container flex flex-col gap-10">
      <div>
        <BreadCrumbs />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div>filter</div>
          <div>short</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default page;

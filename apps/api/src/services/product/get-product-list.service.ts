import { Prisma } from "../../../generated/prisma/browser.js";
import { prisma } from "../../lib/prisma.js";
import type { PaginationQueryParams } from "../../types/pagination.type.js";

interface IGetProductList extends PaginationQueryParams {
  search?: string;
  status?: string;
}

export const getProductListService = async (query: IGetProductList) => {
  try {
    const { page, sortBy, sortOrder, take, status, search } = query;
    const whereClause: Prisma.ProductWhereInput = {};

    if (search?.trim()) {
      const keyword = search.trim();

      whereClause.OR = [
        {
          name: {
            contains: keyword,
          },
        },
        {
          sku: {
            contains: keyword,
          },
        },
      ];
    }

    if (status == "ACTIVE") {
      whereClause.status = "ACTIVE";
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: { [sortBy]: sortOrder },
      include: { category: true },
    });

    if (!products) {
      throw new Error("Product Not Found !");
    }

    const count = await prisma.product.count({ where: whereClause });

    return { data: products, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};

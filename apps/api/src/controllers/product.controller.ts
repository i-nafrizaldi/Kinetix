import type { NextFunction, Request, Response } from "express";
import { getUsersService } from "../services/user/get-users.service.js";
import { getProductListService } from "../services/product/get-product-list.service.js";

export class ProductController {
  async getProductListController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 1000000,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || "id",
        sortOrder: (req.query.sortOrder as string) || "asc",
        search: (req.query.search as string) || "",
        status: (req.query.status as string) || "ACTIVE",
      };
      const result = await getProductListService(query);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

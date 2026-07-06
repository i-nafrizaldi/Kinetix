import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

export class ProductRouter {
  private productController: ProductController;
  private router: Router;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.productController.getProductListController);
  }

  getRouter(): Router {
    return this.router;
  }
}

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export class AuthRouter {
  private authController: AuthController;
  private router: Router;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.authController.registerController);
    this.router.post("/login", this.authController.loginController);
  }

  getRouter(): Router {
    return this.router;
  }
}

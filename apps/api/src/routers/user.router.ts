import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export class UserRouter {
  private userController: UserController;
  private router: Router;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.userController.getUsersController);
  }

  getRouter(): Router {
    return this.router;
  }
}

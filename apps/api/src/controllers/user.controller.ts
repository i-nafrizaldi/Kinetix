import type { NextFunction, Request, Response } from "express";
import { getUsersService } from "../services/user/get-users.service.js";

export class UserController {
  async getUsersController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getUsersService();

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

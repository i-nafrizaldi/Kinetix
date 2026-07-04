import type { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(400).json({
    message: err.message || "Internal server error",
  });
};

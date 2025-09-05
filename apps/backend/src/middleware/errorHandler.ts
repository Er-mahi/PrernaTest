import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error("❌ Error:", err);
  res.status(status).json({ success: false, error: message });
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ success: false, error: "Not Found" });
}

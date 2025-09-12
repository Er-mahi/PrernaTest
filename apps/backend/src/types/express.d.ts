import { User } from "@prisma/client";
import "express";
declare global {
  namespace Express {
    interface UserShape {
      id: string;
      email: string;
      role: "USER" | "ADMIN" | SUPER_ADMIN;
      name?: string | null;
      image?: string | null;
    }
    interface Request {
      user?: UserShape;
    }
  }
}
export {};

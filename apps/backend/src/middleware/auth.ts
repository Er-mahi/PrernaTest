import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import prisma from '@/config/database';
import { Role } from '@/types/auth';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Try multiple token sources: cookies, headers, etc.
  const token = req.cookies?.["auth-token"] || 
                req.cookies?.["authToken"] || 
                req.headers.authorization?.replace("Bearer ", "") ||
                req.headers["x-auth-token"];

  if (!token) {
    console.log("🔍 No token found in:", {
      cookies: Object.keys(req.cookies || {}),
      headers: {
        authorization: !!req.headers.authorization,
        "x-auth-token": !!req.headers["x-auth-token"]
      }
    });
    return res.status(401).json({ success: false, error: "Authentication token missing" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("❌ JWT_SECRET not configured");
    return res.status(500).json({ success: false, error: "Server misconfiguration" });
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string };
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role as Role};
    next();
  } catch (error) {
    console.log("🔍 Token verification failed:", error);
    return res.status(403).json({ success: false, error: "Invalid or expired token" });
  }
}

// ✅ Allow both authenticated and unauthenticated requests
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return next();

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (!err && user) {
      req.user = user as any;
    }
    next();
  });
};

// ✅ Role-based authorization
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden', 403));
    }
    next();
  };
};

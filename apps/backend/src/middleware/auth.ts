import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import { Role } from '@/types/auth';

// JWT payload interface
interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token =
    req.cookies?.['auth-token'] ||
    req.cookies?.['authToken'] ||
    req.headers.authorization?.replace('Bearer ', '') ||
    req.headers['x-auth-token'];

  if (!token) return res.status(401).json({ success: false, error: 'Authentication token missing' });

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ success: false, error: 'Server misconfiguration' });

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      id: decoded.userId, // map userId -> id
      email: decoded.email,
      role: decoded.role,
      name: null,
      emailVerified: null,
      image: null,
      phone: null,
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    next();
  } catch (error) {
    return res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }
}

// Optional authentication middleware
export const optionalAuth = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return next();

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (!err && decoded) {
      const payload = decoded as JwtPayload;
      req.user = {
        id: payload.userId,
        email: payload.email,
        role: payload.role,
        name: null,
        emailVerified: null,
        image: null,
        phone: null,
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    next();
  });
};

// Role-based authorization middleware
export const authorize = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError('Not authenticated', 401));
    if (!roles.includes(req.user.role)) return next(new AppError('Forbidden', 403));
    next();
  };
};

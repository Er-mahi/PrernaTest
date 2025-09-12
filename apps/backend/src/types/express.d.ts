// src/types/express.d.ts
import type { Role } from '@/types/auth';
export {}; // important: make this a module

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: Role;
        name?: string | null;
        emailVerified?: Date | null;
        image?: string | null;
        phone?: string | null;
        isActive?: boolean;
        lastLoginAt?: Date | null;
        createdAt?: Date;
        updatedAt?: Date;
      };
    }
  }
}

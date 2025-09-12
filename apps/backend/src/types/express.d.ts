import { Role } from './auth'; // Your Role type from '@/types/auth'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: Role;  // match Prisma Role enum
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

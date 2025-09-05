// src/types/auth.ts
export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";
export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
  sessionId?: string;
}

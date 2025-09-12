// src/types/auth.ts
export type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface JwtPayload {
  id: string;         // normalized to `id` so it matches middleware and routes
  email: string;
  role: Role;
  sessionId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  image?: string;
  phone?: string;
  location?: string;
  emailVerified?: boolean;
  role: string;
  subscription?: {
    plan: 'free' | 'premium' | 'pro';
    expiresAt?: string;
    features: string[];
  };
  stats?: {
    testsCompleted: number;
    averageScore: number;
    totalTimeSpent: number;
    streak: number;
  };
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    language: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  subscribeNewsletter?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface GoogleAuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  isNewUser: boolean;
}
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "@/lib/api";
import { User } from "@/types/auth";

type RegisterData = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
  subscribeNewsletter?: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (data: RegisterData) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (token: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.auth
      .me()
      .then(res => setUser(res))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const register = async (data: RegisterData) => {
    try {
      const res = await api.auth.register({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword ?? data.password,
        acceptTerms: data.acceptTerms ?? true,
        name: data.name ?? "",
        subscribeNewsletter: data.subscribeNewsletter ?? false,
      });
      setUser(res.user);
      return true;
    } catch (err) {
      console.error("Registration failed:", err);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await api.auth.login({ email, password });
      setUser(res.user);
      return true;
    } catch {
      return false;
    }
  };

  const loginWithGoogle = async (token: string) => {
    try {
      const res = await api.auth.googleAuth(token);
      setUser(res.user);
      return true;
    } catch {
      return false;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await api.auth.forgotPassword({ email });
      return true;
    } catch {
      return false;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await api.auth.resetPassword({
        token,
        password: newPassword,
        confirmPassword: newPassword,
      });
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        forgotPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

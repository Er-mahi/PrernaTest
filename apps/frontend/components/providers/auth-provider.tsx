"use client";

import React, { ReactNode } from "react";
import { AuthProvider as CtxProvider } from "@/contexts/AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  return <CtxProvider>{children}</CtxProvider>;
}

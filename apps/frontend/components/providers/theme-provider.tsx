"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { ReactNode } from "react";

type FixedThemeProviderProps = ThemeProviderProps & { children: ReactNode };

export function ThemeProvider({ children, ...props }: FixedThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}

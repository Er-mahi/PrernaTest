"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./Button";



export function ThemeToggle() {
const { theme, setTheme, resolvedTheme } = useTheme();
const [mounted, setMounted] = useState(false);
useEffect(()=> setMounted(true), []);
const current = (theme ?? resolvedTheme) as string | undefined;
if (!mounted) return null;
return (
<Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={()=> setTheme(current === "dark" ? "light" : "dark")}>
{current === "dark" ? "🌙" : "☀️"}
</Button>
);
}
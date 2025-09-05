"use client";

import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";

export function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Left side: Logo or dashboard title */}
      <Link href="/dashboard" className="text-xl font-bold text-blue-600">
        TestMitra
      </Link>

      {/* Right side: User info */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden text-sm text-gray-700 sm:inline">
              {user.name || user.email}
            </span>
            <Button
              onClick={logout}
              className="border-0 bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

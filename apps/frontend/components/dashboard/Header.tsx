"use client";

import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";

export function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className="flex h-14 sm:h-16 items-center justify-between border-b bg-white px-4 sm:px-6 shadow-sm">
      {/* Left side: Logo */}
      <Link 
        href="/dashboard" 
        className="text-lg sm:text-xl font-bold text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1 transition-colors"
        aria-label="PrernaTest Dashboard Home"
      >
        PrernaTest
      </Link>

      {/* Right side: User info */}
      <div className="flex items-center gap-2 sm:gap-4">
        {user ? (
          <>
            <span className="hidden text-xs sm:text-sm text-gray-700 sm:inline truncate max-w-24 sm:max-w-none">
              {user.name || user.email}
            </span>
            <Button
              onClick={logout}
              className="border-0 bg-red-500 px-2 sm:px-3 py-1 text-xs sm:text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              aria-label="Logout from PrernaTest"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-2 sm:px-3 py-1 text-xs sm:text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label="Login to PrernaTest"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

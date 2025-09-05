// app/(auth)/forgot-password/page.tsx
"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-xl border p-6 bg-card">
        <h1 className="text-2xl font-bold">Forgot password</h1>
        <form
          onSubmit={async (e) => { e.preventDefault(); await forgotPassword(email); alert("If the account exists, an email has been sent."); }}
          className="space-y-4"
        >
          <input className="w-full rounded-md border p-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <button className="w-full rounded-md bg-blue-600 p-2 text-white">Send reset link</button>
        </form>
      </div>
    </div>
  );
}

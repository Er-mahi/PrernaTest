// app/(auth)/reset-password/page.tsx
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const sp = useSearchParams(); const token = sp.get("token") ?? "";
  const [pwd, setPwd] = useState(""); const [confirm, setConfirm] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-xl border p-6 bg-card">
        <h1 className="text-2xl font-bold">Reset password</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (pwd !== confirm) return alert("Passwords do not match");
            const ok = await resetPassword(token, pwd);
            if (ok) router.push("/sign-in");
          }}
          className="space-y-4"
        >
          <input className="w-full rounded-md border p-2" type="password" placeholder="New password" value={pwd} onChange={(e)=>setPwd(e.target.value)} />
          <input className="w-full rounded-md border p-2" type="password" placeholder="Confirm password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} />
          <button className="w-full rounded-md bg-emerald-600 p-2 text-white">Update password</button>
        </form>
      </div>
    </div>
  );
}

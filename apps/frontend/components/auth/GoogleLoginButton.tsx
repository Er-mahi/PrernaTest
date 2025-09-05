"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthContext } from "@/contexts/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export function GoogleLoginButton() {
  const { loginWithGoogle } = useAuthContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (token: string) => {
      const user = await api.auth.googleAuth(token); // Call backend
      await loginWithGoogle(token); // Save in context
      return user;
    },
    onSuccess: () => {
      router.push("/dashboard"); // 👈 Redirect after success
    },
    onError: (error) => {
      console.error("Google login failed:", error);
    },
  });

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              mutation.mutate(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.error("Google Login Failed");
          }}
          useOneTap
        />
      </div>

      {mutation.isError && (
        <p className="mt-2 text-center text-sm text-red-500">
          Google login failed. Please try again.
        </p>
      )}
    </GoogleOAuthProvider>
  );
}

import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const metadata: Metadata = {
  title: "Sign In | TestMitra",
  description: "Sign in to your TestMitra account to access mock tests and track your progress.",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Link 
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">TestMitra</span>
        </Link>
        
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue your exam preparation journey
            </p>
          </div>

          {/* Social Login */}
          <div className="mb-6">
            <Suspense fallback={<LoadingSpinner />}>
              <GoogleLoginButton />
            </Suspense>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <Suspense fallback={<LoadingSpinner />}>
            <LoginForm />
          </Suspense>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-blue-800 font-medium mb-2">
                Need help getting started?
              </p>
              <p className="text-sm text-blue-600">
                Contact our support team at{" "}
                <a 
                  href="mailto:support@testmitra.com" 
                  className="underline hover:text-blue-800 transition-colors"
                >
                  support@testmitra.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
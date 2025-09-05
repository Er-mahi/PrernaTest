import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { SignupForm } from "@/components/auth/SignupForm";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const metadata: Metadata = {
  title: "Sign Up | TestMitra",
  description: "Create your TestMitra account and start your government exam preparation journey.",
};

export default function SignUpPage() {
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
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Join thousands of students preparing for government exams
            </p>
          </div>

          {/* Social Signup */}
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
              <span className="px-2 bg-white text-gray-500">Or create account with email</span>
            </div>
          </div>

          {/* Signup Form */}
          <Suspense fallback={<LoadingSpinner />}>
            <SignupForm />
          </Suspense>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="text-center">
              <p className="text-sm text-green-800 font-medium mb-2">
                🎉 What you'll get with your free account:
              </p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Access to 100+ free mock tests</li>
                <li>• Detailed performance analytics</li>
                <li>• Study materials and preparation tips</li>
                <li>• Community support and discussions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
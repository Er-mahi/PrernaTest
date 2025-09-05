import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/Toaster";
import { QueryProvider } from "@/components/providers/query-provider"; // ✅ import it

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TestMitra - Government Exam Mock Tests",
  description: "Practice for government exams with our comprehensive mock test platform. SSC, UPSC, Banking, Railway and more.",
  keywords: "government exams, mock tests, SSC, UPSC, banking exams, railway exams, online test platform",
  authors: [{ name: "TestMitra Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
  openGraph: {
    title: "TestMitra - Government Exam Mock Tests",
    description: "Practice for government exams with our comprehensive mock test platform",
    url: "https://testmitra.com",
    siteName: "TestMitra",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TestMitra - Government Exam Preparation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestMitra - Government Exam Mock Tests",
    description: "Practice for government exams with comprehensive mock tests",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {/* ✅ Wrap everything with QueryProvider */}
          <QueryProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

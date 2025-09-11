import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/Toaster";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ 
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | PrernaTest - Rajasthan 4th Grade Exam Preparation",
    default: "PrernaTest - Rajasthan 4th Grade Mock Tests & RSMSSB Exam Preparation 2025"
  },
  description: "Ace Rajasthan 4th Grade exam with PrernaTest's comprehensive mock tests, practice questions & study materials. Join 50,000+ students preparing for RSMSSB Grade 4 recruitment 2025. Free & paid test series available.",
  
  keywords: [
    // Primary Keywords
    "Rajasthan 4th Grade Syllabus 2025",
    "RSMSSB 4th Grade Exam 2025", 
    "Rajasthan Grade 4 Exam Pattern",
    "Rajasthan 4th Grade Mock Test",
    "RSMSSB Grade 4 Practice Questions",
    
    // Long-tail Keywords
    "Rajasthan 4th Grade Online Test Series",
    "RSMSSB 4th Grade Previous Year Papers",
    "Rajasthan Grade 4 Preparation Tips",
    "RSMSSB Grade 4 Current Affairs",
    "Rajasthan 4th Grade Study Material",
    
    // Hindi Keywords
    "राजस्थान चतुर्थ श्रेणी भर्ती 2025",
    "RSMSSB ग्रेड 4 परीक्षा",
    "राजस्थान ग्रेड 4 सिलेबस", 
    "राजस्थान चतुर्थ श्रेणी मॉक टेस्ट",
    
    // Specific Exam Details
    "Rajasthan 4th Grade 53749 Vacancies",
    "RSMSSB Grade 4 New Pattern 2025",
    "Rajasthan 4th Grade 120 Questions",
    "RSMSSB 4th Grade Negative Marking"
  ],

  authors: [{ 
    name: "PrernaTest Team",
    url: "https://prernatest.com/about"
  }],
  
  creator: "PrernaTest",
  publisher: "PrernaTest",
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: "PrernaTest - Rajasthan 4th Grade Mock Tests & RSMSSB Exam Preparation",
    description: "Master Rajasthan 4th Grade exam with comprehensive mock tests, practice questions & detailed solutions. Join 50,000+ successful candidates.",
    url: "https://prernatest.com",
    siteName: "PrernaTest",
    images: [
      {
        url: "https://prernatest.com/og-rajasthan-4th-grade.jpg",
        width: 1200,
        height: 630,
        alt: "PrernaTest - Rajasthan 4th Grade Exam Preparation Platform",
        type: "image/jpeg",
      },
      {
        url: "https://prernatest.com/og-rsmssb-grade4.jpg", 
        width: 800,
        height: 600,
        alt: "RSMSSB Grade 4 Mock Tests and Practice Questions",
        type: "image/jpeg",
      }
    ],
    locale: "en_US",
    type: "website",
    emails: ["support@prernatest.com"],
  },

  twitter: {
    card: "summary_large_image",
    site: "@PrernaTest",
    creator: "@PrernaTest",
    title: "PrernaTest - Rajasthan 4th Grade Mock Tests & RSMSSB Preparation",
    description: "Comprehensive mock tests & practice questions for Rajasthan 4th Grade exam. Join 50,000+ students preparing for RSMSSB Grade 4 recruitment 2025.",
    images: {
      url: "https://prernatest.com/twitter-rajasthan-4th-grade.jpg",
      alt: "PrernaTest Rajasthan 4th Grade Exam Preparation",
    },
  },

  alternates: {
    canonical: "https://prernatest.com",
    languages: {
      'en-US': 'https://prernatest.com',
      'hi-IN': 'https://prernatest.com/hi',
    },
  },

  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },

  category: "Education",
  classification: "Educational Platform",
  
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#3b82f6",
    "theme-color": "#3b82f6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={inter.variable} 
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional Meta Tags */}
        <meta name="application-name" content="PrernaTest" />
        <meta name="apple-mobile-web-app-title" content="PrernaTest" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="theme-color" content="#3b82f6" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "PrernaTest",
              "description": "Comprehensive online platform for Rajasthan 4th Grade exam preparation with mock tests, practice questions, and study materials",
              "url": "https://prernatest.com",
              "logo": "https://prernatest.com/logo.png",
              "sameAs": [
                "https://twitter.com/PrernaTest",
                "https://facebook.com/PrernaTest",
                "https://linkedin.com/company/prernatest"
              ],
              "offers": {
                "@type": "Offer",
                "category": "Educational Services",
                "description": "Mock tests and practice questions for Rajasthan 4th Grade exam"
              },
              "areaServed": {
                "@type": "State",
                "name": "Rajasthan, India"
              },
              "educationalCredentialAwarded": "Test Preparation",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Rajasthan 4th Grade Exam Preparation",
                "itemListElement": [
                  {
                    "@type": "Course",
                    "name": "RSMSSB Grade 4 Mock Test Series",
                    "description": "Comprehensive mock tests for Rajasthan 4th Grade examination"
                  }
                ]
              }
            })
          }}
        />
      </head>
      
      <body className="font-sans antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              <div id="root">
                {children}
              </div>
              <Toaster />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
        
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
        >
          Skip to main content
        </a>
      </body>
    </html>
  );
}

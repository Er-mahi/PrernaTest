import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";
import { ExamCategories } from "@/components/sections/ExamCategories";
import { StatsSection } from "@/components/sections/StatsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PrernaTest - Rajasthan 4th Grade Mock Tests & RSMSSB Exam Preparation 2025",
  description: "Master Rajasthan 4th Grade exam with comprehensive mock tests, practice questions & study materials. Join 50,000+ students preparing for RSMSSB Grade 4 recruitment 2025.",
  keywords: "Rajasthan 4th Grade Mock Test, RSMSSB Grade 4 Practice Questions, Rajasthan 4th Grade Syllabus 2025, RSMSSB 4th Grade Exam 2025, राजस्थान चतुर्थ श्रेणी मॉक टेस्ट, RSMSSB ग्रेड 4 परीक्षा",
  openGraph: {
    title: "PrernaTest - Rajasthan 4th Grade Mock Tests & RSMSSB Exam Preparation",
    description: "Comprehensive mock tests & practice questions for Rajasthan 4th Grade exam preparation",
    url: "https://prernatest.com",
    type: "website",
    images: [{
      url: "https://prernatest.com/og-rajasthan-4th-grade.jpg",
      width: 1200,
      height: 630,
      alt: "PrernaTest Rajasthan 4th Grade Exam Preparation"
    }]
  },
  alternates: {
    canonical: "https://prernatest.com"
  }
};

export default function HomePage() {
  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "PrernaTest", 
            "description": "Comprehensive online platform for Rajasthan 4th Grade exam preparation with mock tests and practice questions",
            "url": "https://prernatest.com",
            "logo": "https://prernatest.com/logo.png",
            "areaServed": { "@type": "State", "name": "Rajasthan, India" },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Rajasthan 4th Grade Exam Preparation",
              "itemListElement": [{
                "@type": "Course", 
                "name": "RSMSSB Grade 4 Mock Test Series",
                "description": "Comprehensive mock tests for Rajasthan 4th Grade examination"
              }]
            }
          })
        }}
      />
      
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <StatsSection />
          <ExamCategories />
          <FeaturesSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}

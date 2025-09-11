import type { Metadata } from "next";
import { Construction, Mail, MessageCircle, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us - PrernaTest | Get in Touch",
  description: "Contact PrernaTest for support, feedback, or inquiries about Rajasthan government exam preparation. Our contact page is currently under development.",
  keywords: "contact PrernaTest, support, customer service, Rajasthan exam help, contact form",
  openGraph: {
    title: "Contact PrernaTest - We're Here to Help",
    description: "Get in touch with PrernaTest for any questions about Rajasthan government exam preparation.",
    type: "website"
  }
};

export default function ContactPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "PrernaTest",
              "url": "https://prernatest.com",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "areaServed": "Rajasthan, India",
                "availableLanguage": ["Hindi", "English"]
              }
            }
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            {/* Construction Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <Construction className="h-10 w-10 text-orange-600" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Contact <span className="text-blue-600">Page</span>
            </h1>

            {/* Development Message */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 sm:p-8 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-amber-600 mr-2" />
                <span className="text-lg font-semibold text-amber-800">Development Phase</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-4">
                हमारा Contact Page जल्द आ रहा है!
              </h2>
              
              <p className="text-lg text-amber-800 leading-relaxed mb-6 max-w-2xl mx-auto">
                हम आपके लिए एक बेहतरीन संपर्क अनुभव तैयार कर रहे हैं। जल्द ही आप हमसे आसानी से जुड़ सकेंगे और अपने सभी सवालों के जवाब पा सकेंगे।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">Email Support</div>
                  <div className="text-xs text-gray-600">Coming Soon</div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">Live Chat</div>
                  <div className="text-xs text-gray-600">Coming Soon</div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <Construction className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">Contact Form</div>
                  <div className="text-xs text-gray-600">Under Development</div>
                </div>
              </div>
            </div>

            {/* Temporary Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                अभी के लिए आप ये कर सकते हैं:
              </h3>
              
              <div className="space-y-3 text-blue-800 mb-6">
                <p className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  हमारे Mock Tests का फायदा उठाएं
                </p>
                <p className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Dashboard पर अपनी प्रगति देखें
                </p>
                <p className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  नियमित अभ्यास जारी रखें
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tests">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3">
                    Mock Tests देखें
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Link href="/dashboard">
                  <Button 
                    variant="outline" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3"
                  >
                    Dashboard पर जाएं
                  </Button>
                </Link>
              </div>
            </div>

            {/* Expected Timeline */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                <strong>Expected Launch:</strong> Contact page coming in next update
              </p>
              <p className="text-gray-500 text-xs mt-2">
                We're working hard to bring you the best contact experience
              </p>
            </div>
          </div>
        </section>

        {/* Alternative Actions */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              इस बीच, ये सेक्शन एक्सप्लोर करें
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/about" className="group">
                <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">?</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">About Us</h3>
                  <p className="text-sm text-gray-600">PrernaTest के बारे में जानें</p>
                  <ArrowRight className="h-4 w-4 text-blue-600 mx-auto mt-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/tests" className="group">
                <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold">📝</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Practice Tests</h3>
                  <p className="text-sm text-gray-600">Mock Tests शुरू करें</p>
                  <ArrowRight className="h-4 w-4 text-blue-600 mx-auto mt-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/dashboard" className="group">
                <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold">📊</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Dashboard</h3>
                  <p className="text-sm text-gray-600">प्रगति ट्रैक करें</p>
                  <ArrowRight className="h-4 w-4 text-blue-600 mx-auto mt-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

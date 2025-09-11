import type { Metadata } from "next";
import { Trophy, Users, BookOpen, Target, CheckCircle, Star, ArrowRight, Shield, Clock, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About PrernaTest - Rajasthan's Leading Government Exam Preparation Platform",
  description: "Learn about PrernaTest's mission to help Rajasthan students succeed in government exams. Comprehensive test series for RSMSSB 4th Grade, RAS, Police, and more with 50,000+ successful candidates.",
  keywords: "About PrernaTest, Rajasthan government exam preparation, RSMSSB test series, RAS preparation, Rajasthan exam coaching, government job preparation",
  openGraph: {
    title: "About PrernaTest - Empowering Rajasthan's Future Civil Servants",
    description: "Discover how PrernaTest is revolutionizing government exam preparation in Rajasthan with comprehensive test series and expert guidance.",
    type: "website",
    images: [{
      url: "/og-about-prernatest.jpg",
      width: 1200,
      height: 630,
      alt: "About PrernaTest - Rajasthan Government Exam Preparation"
    }]
  }
};

export default function AboutPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "EducationalOrganization",
              "name": "PrernaTest",
              "description": "Leading government exam preparation platform for Rajasthan state exams",
              "url": "https://prernatest.com",
              "foundingDate": "2024",
              "areaServed": {
                "@type": "State",
                "name": "Rajasthan, India"
              },
              "serviceType": "Online Education and Test Preparation",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Government Exam Preparation Courses",
                "itemListElement": [
                  {
                    "@type": "Course",
                    "name": "RSMSSB 4th Grade Test Series",
                    "description": "Comprehensive mock tests for Rajasthan 4th Grade examination"
                  },
                  {
                    "@type": "Course", 
                    "name": "RAS Preparation Course",
                    "description": "Complete preparation for Rajasthan Administrative Service"
                  }
                ]
              }
            }
          })
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                About <span className="text-blue-600">PrernaTest</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                राजस्थान की सबसे भरोसेमंद सरकारी परीक्षा तैयारी प्लेटफॉर्म। हमारा लक्ष्य है हर अभ्यर्थी को उनके सपनों की सरकारी नौकरी दिलाना।
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">50,000+ Students</span>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Trophy className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">15,000+ Selected</span>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-medium">4.8★ Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Mission */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-6">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">हमारा मिशन</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  राजस्थान के हर कोने से आने वाले अभ्यर्थियों को उच्च गुणवत्ता की शिक्षा और व्यापक अभ्यास सामग्री प्रदान करना। हम चाहते हैं कि हर युवा को सरकारी नौकरी पाने का समान अवसर मिले।
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>गुणवत्तापूर्ण और अद्यतन अध्ययन सामग्री</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>विशेषज्ञों द्वारा तैयार मॉक टेस्ट</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>व्यक्तिगत प्रगति ट्रैकिंग</span>
                  </li>
                </ul>
              </div>

              {/* Vision */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-6">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">हमारा विजन</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  राजस्थान की सबसे विश्वसनीय और प्रभावी सरकारी परीक्षा तैयारी प्लेटफॉर्म बनना। हमारा सपना है कि हर अभ्यर्थी को सफलता का सबसे छोटा और सुनिश्चित रास्ता मिले।
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                    <div className="text-sm text-gray-600">अपडेटेड सिलेबस</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">सपोर्ट उपलब्ध</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rajasthan Focus Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                राजस्थान की सरकारी परीक्षाओं में हमारी विशेषज्ञता
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                हम राजस्थान की सभी प्रमुख सरकारी परीक्षाओं के लिए विशेष रूप से डिज़ाइन किया गया कंटेंट प्रदान करते हैं
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* RSMSSB 4th Grade */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">RSMSSB 4th Grade</h3>
                <p className="text-gray-600 text-sm mb-4">53,749+ पदों के लिए संपूर्ण तैयारी</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• 120 प्रश्नों का पैटर्न</li>
                  <li>• विषयवार मॉक टेस्ट</li>
                  <li>• राजस्थान GK विशेष</li>
                </ul>
                <div className="text-blue-600 text-sm font-medium">10,000+ Mock Questions</div>
              </div>

              {/* RAS */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">RAS (Pre + Mains)</h3>
                <p className="text-gray-600 text-sm mb-4">राजस्थान प्रशासनिक सेवा की तैयारी</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Pre + Mains दोनों चरण</li>
                  <li>• Interview तैयारी</li>
                  <li>• वैकल्विक विषय सपोर्ट</li>
                </ul>
                <div className="text-purple-600 text-sm font-medium">Coming Soon</div>
              </div>

              {/* Police Constable */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">राजस्थान पुलिस</h3>
                <p className="text-gray-600 text-sm mb-4">Constable & SI की संपूर्ण तैयारी</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Physical Test Tips</li>
                  <li>• Written Exam Pattern</li>
                  <li>• Interview Guidance</li>
                </ul>
                <div className="text-green-600 text-sm font-medium">Coming Soon</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                PrernaTest क्यों चुनें?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                हमारी विशेषताएं जो हमें राजस्थान की #1 परीक्षा तैयारी प्लेटफॉर्म बनाती हैं
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Latest Syllabus</h3>
                <p className="text-gray-600 text-sm">नवीनतम परीक्षा पैटर्न के अनुसार अपडेटेड सामग्री</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Faculty</h3>
                <p className="text-gray-600 text-sm">राजस्थान के अनुभवी शिक्षकों द्वारा तैयार कंटेंट</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Access</h3>
                <p className="text-gray-600 text-sm">कभी भी, कहीं भी अभ्यास करने की सुविधा</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Proven Results</h3>
                <p className="text-gray-600 text-sm">15,000+ सफल अभ्यर्थियों का ट्रैक रिकॉर्ड</p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                सफलता की कहानियां
              </h2>
              <p className="text-lg text-gray-600">हमारे छात्रों की उपलब्धियां ही हमारी सबसे बड़ी पहचान हैं</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">प्रिया शर्मा</div>
                    <div className="text-sm text-gray-600">RSMSSB 4th Grade Selected</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">
                  "PrernaTest के मॉक टेस्ट से मुझे वास्तविक परीक्षा का अनुभव मिला। राजस्थान GK के प्रश्न बिल्कुल परीक्षा जैसे थे।"
                </p>
                <div className="flex items-center mt-4 text-yellow-500">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">राहुल गुप्ता</div>
                    <div className="text-sm text-gray-600">RSMSSB 4th Grade Selected</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">
                  "गांव से होकर भी मैंने PrernaTest की मदद से अपना सपना पूरा किया। हिंदी में टेस्ट देना बहुत आसान था।"
                </p>
                <div className="flex items-center mt-4 text-yellow-500">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">सुनीता देवी</div>
                    <div className="text-sm text-gray-600">RSMSSB 4th Grade Selected</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">
                  "Performance analysis की मदद से मैंने अपनी कमजोरियों को सुधारा। यह प्लेटफॉर्म वाकई में जादुगर है।"
                </p>
                <div className="flex items-center mt-4 text-yellow-500">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              आज ही शुरू करें अपनी सफलता की यात्रा
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              राजस्थान की सबसे भरोसेमंद परीक्षा तैयारी प्लेटफॉर्म के साथ जुड़ें और अपने सरकारी नौकरी के सपने को हकीकत बनाएं
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tests">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium">
                  Free Mock Test लें
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-medium"
                >
                  Dashboard देखें
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

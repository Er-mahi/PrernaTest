"use client";

import { BookOpen, Clock, Target, Lightbulb, ArrowRight } from "lucide-react";

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Target className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Topic-wise Practice
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            विषयवार अभ्यास
          </h2>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-100 p-8 md:p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              This Feature is Not Available Right Now
            </h3>
            <h4 className="text-xl font-semibold text-gray-700 mb-6">
              यह सुविधा अभी उपलब्ध नहीं है
            </h4>
            
            <div className="space-y-3 text-gray-600">
              <p className="text-lg">
                Please try again in a few days. We are working hard to bring you the best practice experience!
              </p>
              <p className="text-lg">
                कृपया कुछ दिन बाद पुनः प्रयास करें। हम आपके लिए सर्वोत्तम अभ्यास अनुभव लाने के लिए कड़ी मेहनत कर रहे हैं!
              </p>
            </div>
          </div>

          {/* Features Coming Soon */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <Lightbulb className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-800 mb-2">Topic-wise Questions</h5>
              <p className="text-sm text-gray-600">विषयवार प्रश्न</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-800 mb-2">Timed Practice</h5>
              <p className="text-sm text-gray-600">समयबद्ध अभ्यास</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-800 mb-2">Difficulty Levels</h5>
              <p className="text-sm text-gray-600">कठिनाई स्तर</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
              Go Back / वापस जाएं
            </button>
            
            <button 
              onClick={() => window.location.href = '/tests'}
              className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Take Full Tests / पूर्ण परीक्षा दें
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h6 className="font-semibold text-yellow-800 mb-2">
              Stay Updated / अपडेट रहें
            </h6>
            <p className="text-yellow-700 text-sm">
              We will notify you as soon as the practice feature is ready! 
              <br />
              अभ्यास सुविधा तैयार होते ही हम आपको सूचित करेंगे!
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-12">
          <h4 className="text-xl font-bold text-gray-900 text-center mb-8">
            Coming Soon Timeline / आने वाला समयसीमा
          </h4>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>
            
            <div className="space-y-8">
              <div className="relative flex items-center">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-6 bg-white rounded-lg shadow-sm border p-4 flex-1">
                  <h5 className="font-semibold text-gray-900">Phase 1: Topic Categories</h5>
                  <p className="text-sm text-gray-600">चरण 1: विषय श्रेणियां</p>
                  <p className="text-xs text-gray-500 mt-1">Expected: Next Week</p>
                </div>
              </div>
              
              <div className="relative flex items-center">
                <div className="flex-shrink-0 w-6 h-6 bg-gray-300 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-6 bg-white rounded-lg shadow-sm border p-4 flex-1">
                  <h5 className="font-semibold text-gray-900">Phase 2: Practice Questions</h5>
                  <p className="text-sm text-gray-600">चरण 2: अभ्यास प्रश्न</p>
                  <p className="text-xs text-gray-500 mt-1">Expected: In 2 Weeks</p>
                </div>
              </div>
              
              <div className="relative flex items-center">
                <div className="flex-shrink-0 w-6 h-6 bg-gray-300 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-6 bg-white rounded-lg shadow-sm border p-4 flex-1">
                  <h5 className="font-semibold text-gray-900">Phase 3: Analytics & Progress</h5>
                  <p className="text-sm text-gray-600">चरण 3: विश्लेषण और प्रगति</p>
                  <p className="text-xs text-gray-500 mt-1">Expected: In 3 Weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

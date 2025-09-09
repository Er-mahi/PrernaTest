"use client";

import { Calendar, Construction, ArrowLeft, Clock, Bell, BookOpen } from "lucide-react";
import Link from "next/link";

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Calendar className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Study Schedule
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            अध्ययन कार्यक्रम
          </h2>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-100 p-8 md:p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <Construction className="h-12 w-12 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              This Feature is Currently Under Development
            </h3>
            <h4 className="text-xl font-semibold text-gray-700 mb-6">
              यह सुविधा अभी विकासाधीन है
            </h4>
            
            <div className="space-y-3 text-gray-600">
              <p className="text-lg">
                Please try again in a few days. We are building a comprehensive study planner for you!
              </p>
              <p className="text-lg">
                कृपया कुछ दिन बाद पुनः प्रयास करें। हम आपके लिए एक व्यापक अध्ययन योजनाकार बना रहे हैं!
              </p>
            </div>
          </div>

          {/* Preview Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-800 mb-2">Time Management</h5>
              <p className="text-sm text-gray-600">समय प्रबंधन</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <Bell className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-800 mb-2">Smart Reminders</h5>
              <p className="text-sm text-gray-600">स्मार्ट अनुस्मारक</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-800 mb-2">Study Plans</h5>
              <p className="text-sm text-gray-600">अध्ययन योजनाएं</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard / डैशबोर्ड पर वापस जाएं
            </Link>
            
            <Link
              href="/tests"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Browse Tests / परीक्षा देखें
            </Link>
          </div>
        </div>

        {/* Timeline Preview */}
        <div className="mt-12">
          <h4 className="text-xl font-bold text-gray-900 text-center mb-8">
            Coming Features / आने वाली सुविधाएं
          </h4>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Personalized Study Calendar</p>
                  <p className="text-sm text-gray-600">व्यक्तिगत अध्ययन कैलेंडर</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Smart Study Reminders</p>
                  <p className="text-sm text-gray-600">स्मार्ट अध्ययन अनुस्मारक</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Progress Tracking</p>
                  <p className="text-sm text-gray-600">प्रगति ट्रैकिंग</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h6 className="font-semibold text-blue-800 mb-2">
              Development Status / विकास की स्थिति
            </h6>
            <p className="text-blue-700 text-sm">
              We are actively working on this feature and will notify you once it's ready!
              <br />
              हम इस सुविधा पर सक्रिय रूप से काम कर रहे हैं और तैयार होने पर आपको सूचित करेंगे!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

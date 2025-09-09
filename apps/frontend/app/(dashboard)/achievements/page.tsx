"use client";

import { Trophy, Construction, ArrowLeft, Star, Award, Target } from "lucide-react";
import Link from "next/link";

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
            <Trophy className="h-10 w-10 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Achievements
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            उपलब्धियां
          </h2>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-100 p-8 md:p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-6">
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
                Please try again in a few days. We are working on bringing you amazing achievements and badges!
              </p>
              <p className="text-lg">
                कृपया कुछ दिन बाद पुनः प्रयास करें। हम आपके लिए शानदार उपलब्धियां और बैज ला रहे हैं!
              </p>
            </div>
          </div>

          {/* Preview Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-yellow-50 rounded-lg p-6">
              <Award className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-800 mb-2">Badges & Awards</h5>
              <p className="text-sm text-gray-600">बैज और पुरस्कार</p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <Star className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-800 mb-2">Progress Tracking</h5>
              <p className="text-sm text-gray-600">प्रगति ट्रैकिंग</p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6">
              <Target className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <h5 className="font-semibold text-gray-800 mb-2">Milestones</h5>
              <p className="text-sm text-gray-600">मील के पत्थर</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard / डैशबोर्ड पर वापस जाएं
            </Link>
            
            <Link
              href="/tests"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Trophy className="h-5 w-5 mr-2" />
              Take Tests / परीक्षा दें
            </Link>
          </div>
        </div>

        {/* Development Status */}
        <div className="mt-12 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h6 className="font-semibold text-yellow-800 mb-2">
              Development Status / विकास की स्थिति
            </h6>
            <p className="text-yellow-700 text-sm">
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

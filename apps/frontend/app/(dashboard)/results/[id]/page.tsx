"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { TestResult } from "@/types/test";
import { 
  ArrowLeft, 
  Award, 
  Calendar, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  Target
} from "lucide-react";

interface Props {
  params: { id: string };
}

export default function ResultPage({ params }: Props) {
  const router = useRouter();
  
  const resultId = params.id;

  const { data: result, isLoading, isError } = useQuery<TestResult>({
    queryKey: ["result", resultId],
    queryFn: () => api.tests.getResult(resultId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading result...</p>
        </div>
      </div>
    );
  }

  if (isError || !result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Result</h2>
          <p className="text-gray-600 mb-6">The result you're looking for doesn't exist or couldn't be loaded.</p>
          <button
            onClick={() => router.push('/results')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 border-green-200';
    if (percentage >= 60) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/results')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Test Result</h1>
              <p className="text-gray-600 mt-1">
                Completed on {new Date(result.submittedAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div className={`flex items-center px-4 py-2 rounded-lg border-2 ${
              result.passed 
                ? 'bg-green-100 border-green-200 text-green-800' 
                : 'bg-red-100 border-red-200 text-red-800'
            }`}>
              {result.passed ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 mr-2" />
              )}
              <span className="font-medium">
                {result.passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>
        </div>

        {/* Score Overview */}
        <div className={`bg-white rounded-lg shadow-sm border-2 p-8 mb-8 ${getScoreBgColor(result.percentage)}`}>
          <div className="text-center">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(result.percentage)}`}>
              {result.percentage.toFixed(1)}%
            </div>
            <div className="text-2xl text-gray-700 mb-2">
              {result.score} out of {result.totalMarks} points
            </div>
            <div className="text-gray-600">
              Your final score
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Score</p>
                <p className="text-2xl font-bold text-gray-900">{result.score}</p>
              </div>
              <Award className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Marks</p>
                <p className="text-2xl font-bold text-gray-900">{result.totalMarks}</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Percentage</p>
                <p className={`text-2xl font-bold ${getScoreColor(result.percentage)}`}>
                  {result.percentage.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className={`text-2xl font-bold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {result.passed ? 'Pass' : 'Fail'}
                </p>
              </div>
              {result.passed ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <XCircle className="h-8 w-8 text-red-500" />
              )}
            </div>
          </div>
        </div>

        {/* Test Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Submitted At</p>
                <p className="text-gray-900">
                  {new Date(result.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Award className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Test ID</p>
                <p className="text-gray-900 font-mono text-sm">{result.testId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analysis */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analysis</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Score Progress</span>
                <span>{result.score}/{result.totalMarks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    result.percentage >= 80 ? 'bg-green-500' :
                    result.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {result.percentage >= 80 ? (
                  <p>🎉 Excellent performance! You've mastered this topic.</p>
                ) : result.percentage >= 60 ? (
                  <p>👍 Good work! Consider reviewing the topics you missed.</p>
                ) : (
                  <p>📚 More practice needed. Focus on understanding the fundamental concepts.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

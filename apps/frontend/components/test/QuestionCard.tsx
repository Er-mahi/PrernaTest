// components/test/QuestionCard.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { Flag, ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  content: string;
  options: Array<{ id: string; content: string; order: number }>;
  marks: number;
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswerSelect: (optionIndex: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onMarkForReview: () => void;
  isMarkedForReview: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onPrevious,
  onNext,
  onMarkForReview,
  isMarkedForReview,
  canGoPrevious,
  canGoNext,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            Question {questionNumber}
          </span>
          <span className="text-gray-500 text-sm">
            of {totalQuestions}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          Marks: {question.marks}
        </div>
      </div>

      {/* Question Content */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 leading-relaxed">
          {question.content}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 ${
                isSelected
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : 'border-gray-200 bg-white text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                  isSelected
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300 text-gray-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option.content}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-row items-center justify-between pt-6 border-t border-gray-200 space-x-2">
        {/* Left side - Previous button */}
        <Button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        {/* Center - Mark for review */}
        <Button
          onClick={onMarkForReview}
          variant="outline"
          className={`flex items-center space-x-2 ${
            isMarkedForReview ? 'bg-purple-50 border-purple-300 text-purple-700' : ''
          }`}
        >
          <Flag className="h-4 w-4" />
          <span>{isMarkedForReview ? 'Unmark Review' : 'Mark for Review'}</span>
        </Button>

        {/* Right side - Next button */}
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

    </div>
  );
}

// components/test/QuestionPalette.tsx
"use client";

interface Question {
  id: string;
  content: string;
}

interface QuestionPaletteProps {
  questions: Question[];
  currentQuestion: number;
  onQuestionSelect: (index: number) => void;
  getQuestionStatus: (index: number) => 'answered' | 'not-visited' | 'visited' | 'review';
  answeredCount: number;
  reviewCount: number;
  visitedCount: number;
}

export function QuestionPalette({
  questions,
  currentQuestion,
  onQuestionSelect,
  getQuestionStatus,
  answeredCount,
  reviewCount,
  visitedCount,
}: QuestionPaletteProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-500 text-white border-green-500';
      case 'not-visited':
        return 'bg-white text-gray-700 border-gray-300 hover:border-gray-400';
      case 'visited':
        return 'bg-red-500 text-white border-red-500';
      case 'review':
        return 'bg-purple-500 text-white border-purple-500';
      default:
        return 'bg-white text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h3 className="font-semibold text-gray-900 mb-4">Question Palette</h3>

      {/* Status Legend */}
      <div className="mb-6 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Answered</span>
          </div>
          <span className="font-medium">{answeredCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Not Answered</span>
          </div>
          <span className="font-medium">{visitedCount - answeredCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span>Marked for Review</span>
          </div>
          <span className="font-medium">{reviewCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
            <span>Not Visited</span>
          </div>
          <span className="font-medium">{questions.length - visitedCount}</span>
        </div>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-4 gap-2">
        {questions.map((_, index) => {
          const status = getQuestionStatus(index);
          const isCurrent = index === currentQuestion;
          
          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`
                w-12 h-12 rounded-lg border-2 font-medium text-sm transition-all duration-200
                ${getStatusColor(status)}
                ${isCurrent ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
              `}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

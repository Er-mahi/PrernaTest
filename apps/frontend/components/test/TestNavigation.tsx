"use client";

interface TestNavigationProps {
  questions: any[];
  currentQuestion: number;
  answers: { [key: number]: number | null };
  markedForReview: Set<number>;
  onNavigate: (index: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function TestNavigation({
  questions,
  currentQuestion,
  answers,
  markedForReview,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
}: TestNavigationProps) {
  return (
    <div
      className={`bg-white border-l transition-all duration-200 ${
        isCollapsed ? "w-12" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <span className="font-semibold text-gray-700">
          {isCollapsed ? "Q" : "Questions"}
        </span>
        <button
          onClick={onToggleCollapse}
          className="text-sm text-blue-600 hover:underline"
        >
          {isCollapsed ? "›" : "‹"}
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2 p-3 overflow-y-auto max-h-[calc(100vh-100px)]">
        {questions.map((_, idx) => {
          const isAnswered = answers[idx] !== undefined && answers[idx] !== null;
          const isMarked = markedForReview.has(idx);
          const isCurrent = idx === currentQuestion;

          let bg = "bg-gray-200";
          if (isAnswered && isMarked) bg = "bg-amber-400";
          else if (isAnswered) bg = "bg-green-400";
          else if (isMarked) bg = "bg-yellow-300";
          if (isCurrent) bg = "bg-blue-600 text-white";

          return (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`h-8 w-8 rounded text-xs font-medium ${bg}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

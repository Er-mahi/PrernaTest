"use client";

import { Button } from "@/components/ui/Button";

interface Option {
  id: string;
  content: string;
}

interface Question {
  id: string;
  content: string;
  options: Option[];
  marks?: number;
  negativeMarks?: number;
  subject?: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: number | null;
  onAnswerSelect: (optionIndex: number) => void;
  isMarkedForReview: boolean;
  onMarkForReview: () => void;
  onClearAnswer: () => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  isMarkedForReview,
  onMarkForReview,
  onClearAnswer,
}: QuestionCardProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.content}</p>
      <div className="space-y-2">
        {question.options.map((o, idx) => (
          <button
            key={o.id}
            onClick={() => onAnswerSelect(idx)}
            className={`block w-full rounded-lg border p-3 text-left ${
              selectedAnswer === idx
                ? "border-blue-600 bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            {o.content}
          </button>
        ))}
      </div>
      <div className="flex space-x-3 mt-4">
        <Button
          variant={isMarkedForReview ? "destructive" : "outline"}
          onClick={onMarkForReview}
        >
          {isMarkedForReview ? "Unmark" : "Mark for Review"}
        </Button>
        <Button variant="ghost" onClick={onClearAnswer}>
          Clear Answer
        </Button>
      </div>
    </div>
  );
}

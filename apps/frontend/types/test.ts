// frontend/types/test.ts

// Minimal test info (already in your file)
export type TestLite = {
  id: string;
  title: string;
  description?: string | null;
  duration: number;
  totalMarks: number;
  isFree: boolean;
  price?: number | null;
};

// Option inside a question
export type QuestionOption = {
  id: string;
  content: string;
  order: number;
};

// Question inside a section
export type Question = {
  id: string;
  order: number;
  marks: number;
  question: {
    id: string;
    content: string;
    options: QuestionOption[];
  };
};

// Section inside a test
export type Section = {
  id: string;
  title: string;
  order: number;
  questions: Question[];
};

// Full test definition (used in TestAttempt)
export type Test = TestLite & {
  sections: Section[];
};

// A test attempt (user starts a test)
export type TestAttempt = {
  id: string;
  test: Test;
  userAnswers: Record<
    string,
    {
      selectedOptionId: string | null;
      isMarkedForReview: boolean;
      timeSpent: number;
    }
  >;
  startedAt: string;
  completedAt?: string | null;
   answers: {
    [questionIndex: number]: number | null; 
  };
  markedForReview: number[];
};

// Result after submitting a test
export type TestResult = {
  id: string;
  attemptId: string;
  testId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
};

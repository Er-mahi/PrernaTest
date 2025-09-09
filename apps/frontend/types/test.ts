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
export interface TestAttempt {
  id: string;
  remainingTime: number;
  test: {
    id: string;
    title: string;
    duration: number;
    sections: {
      id: string;
      title: string;
      order: number;
      questions: {
        id: string;
        order: number;
        marks: number;
        question: {
          id: string;
          content: string;
          options: {
            id: string;
            content: string;
            order: number;
            imageUrl?: string | null;
          }[];
        };
      }[];
    }[];
  };
  userAnswers: Record<
    string,
    { selectedOptionId: string | null; isMarkedForReview: boolean; timeSpent: number }
  >;
}


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

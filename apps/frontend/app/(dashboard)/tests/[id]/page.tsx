// tests/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { TestAttempt, TestResult } from "@/types/test";
import * as React from "react";
import { TestHeader } from "@/components/test/TestHeader";
import { QuestionCard } from "@/components/test/QuestionCard";
import { QuestionPalette } from "@/components/test/QuestionPalette";
import { TestSubmitModal } from "@/components/test/TestSubmitModal";

export default function TakeTest({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds

  // Start attempt
  const start = useMutation<{ attempt: TestAttempt; resumed: boolean }>({
    mutationFn: () => api.tests.startAttempt(id),
  });

  useEffect(() => {
    start.mutate();
  }, []);

  // Get attempt data
  const attemptId = start.data?.attempt?.id;
  const { data, isLoading } = useQuery<TestAttempt>({
    enabled: !!attemptId,
    queryKey: ["attempt", attemptId],
    queryFn: () => api.tests.getAttempt(attemptId!),
  });

  // Flatten questions
  const questions = useMemo(() => {
    if (!data?.test?.sections) return [];
    return data.test.sections.flatMap((s) =>
      s.questions.map((q, idx) => ({
        id: q.question.id,
        content: q.question.content,
        options: q.question.options,
        marks: q.marks,
        index: idx,
      }))
    );
  }, [data]);

  // Timer countdown
  useEffect(() => {
    if (data?.remainingTime) {
      setTimeRemaining(data.remainingTime);
    }
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit(); // Auto submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  // Save answer mutation
  const saveAnswer = useMutation({
    mutationFn: (payload: { questionId: string; optionId: string }) =>
      api.tests.saveAnswer(attemptId!, payload),
  });

  // Submit test mutation
  const submitTest = useMutation<TestResult>({
    mutationFn: () => api.tests.submitTest(attemptId!),
    onSuccess: (result) => {
      // Redirect to results page
      window.location.href = `/results/${result.id}`;
    },
  });

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
    
    const question = questions[questionIndex];
    const selectedOption = question.options[optionIndex];
    
    saveAnswer.mutate({
      questionId: question.id,
      optionId: selectedOption.id,
    });
  };

  const handleMarkForReview = (questionIndex: number) => {
    setMarkedForReview(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  const handleSubmit = () => {
    submitTest.mutate();
  };

  const getQuestionStatus = (questionIndex: number) => {
    if (markedForReview[questionIndex]) return 'review';
    if (selectedAnswers[questionIndex] !== undefined) return 'answered';
    if (questionIndex < currentIndex) return 'visited';
    return 'not-visited';
  };

  if (start.isPending || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-base sm:text-lg font-medium">Preparing your test...</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Questions Found</h2>
          <p className="text-sm sm:text-base text-gray-600">This test appears to be empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Test Header */}
      <TestHeader 
        testTitle={data?.test?.title || "Test"}
        timeRemaining={timeRemaining}
        onSubmit={() => setShowSubmitModal(true)}
      />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Question Section */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <QuestionCard
            question={questions[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswers[currentIndex]}
            onAnswerSelect={(optionIndex) => handleAnswerSelect(currentIndex, optionIndex)}
            onPrevious={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            onNext={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            onMarkForReview={() => handleMarkForReview(currentIndex)}
            isMarkedForReview={markedForReview[currentIndex]}
            canGoPrevious={currentIndex > 0}
            canGoNext={currentIndex < questions.length - 1}
          />
        </div>

        {/* Question Palette */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white max-h-96 lg:max-h-none overflow-y-auto lg:overflow-visible">
          <QuestionPalette
            questions={questions}
            currentQuestion={currentIndex}
            onQuestionSelect={setCurrentIndex}
            getQuestionStatus={getQuestionStatus}
            answeredCount={Object.keys(selectedAnswers).length}
            reviewCount={Object.keys(markedForReview).filter(key => markedForReview[parseInt(key)]).length}
            visitedCount={currentIndex + 1}
          />
        </div>
      </div>

      {/* Submit Modal */}
      <TestSubmitModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleSubmit}
        isSubmitting={submitTest.isPending}
        stats={{
          total: questions.length,
          answered: Object.keys(selectedAnswers).length,
          notAnswered: questions.length - Object.keys(selectedAnswers).length,
          markedForReview: Object.keys(markedForReview).filter(key => markedForReview[parseInt(key)]).length,
        }}
      />
    </div>
  );
}

// tests/[id]/page.tsx - Corrected version with working instruction button
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { TestAttempt, TestResult } from "@/types/test";
import * as React from "react";
import { TestHeader } from "@/components/test/TestHeader";
import { QuestionCard } from "@/components/test/QuestionCard";
import { QuestionPalette } from "@/components/test/QuestionPalette";
import { TestSubmitModal } from "@/components/test/TestSubmitModal";

// Fixed Custom hook with proper TypeScript types
function usePersistedState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setValue];
}

// Instruction Screen Component with detailed RSMSSB guidelines
function InstructionScreen({ testTitle, onStart }: { testTitle: string; onStart: () => void }) {
  
  const handleStartTest = () => {
    console.log('Test start button clicked');
    onStart();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {testTitle}
          </h1>
          <p className="text-blue-600 font-medium">राजस्थान चतुर्थ श्रेणी मॉक टेस्ट</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center border-b pb-2">
            परीक्षा निर्देश / Test Instructions
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Time Duration */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                <h3 className="font-bold text-blue-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-2">1</span>
                  समय अवधि
                </h3>
                <p className="text-blue-700 text-sm">
                  परीक्षा को <strong>120 मिनट (2 घंटे)</strong> में पूर्ण करें
                </p>
              </div>

              {/* Browser Warning */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-amber-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-amber-500 text-white rounded-full text-xs flex items-center justify-center mr-2">2</span>
                  ब्राउज़र चेतावनी
                </h3>
                <p className="text-amber-700 text-sm">
                  परीक्षा के दौरान <strong>ब्राउज़र को रीफ्रेश न करें</strong> क्योंकि इससे उत्तरों का नुकसान हो सकता है
                </p>
              </div>

              {/* Important Notice */}
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-red-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center mr-2">3</span>
                  महत्वपूर्ण सूचना
                </h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  इस मॉक टेस्ट में प्रत्येक प्रश्न के लिए <strong>4 विकल्प (A, B, C, D)</strong> हैं। 
                  हालांकि, वास्तविक RSMSSB परीक्षा में <strong>"अनुत्तरित प्रश्न" के लिए 5वां विकल्प (E)</strong> होगा। 
                  अपनी वास्तविक परीक्षा के दौरान इस अंतर के बारे में सावधान रहें।
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Marking Scheme */}
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                <h3 className="font-bold text-green-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center mr-2">4</span>
                  अंकन योजना
                </h3>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center justify-between">
                    <span>→ प्रत्येक सही उत्तर के लिए</span>
                    <span className="font-bold text-green-600">+1 अंक</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>→ प्रत्येक गलत उत्तर के लिए</span>
                    <span className="font-bold text-red-600">-1/3 अंक</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>→ अनुत्तरित प्रश्नों के लिए</span>
                    <span className="font-bold text-gray-600">0 अंक</span>
                  </div>
                </div>
              </div>

              {/* Navigation Instructions */}
              <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-r-lg">
                <h3 className="font-bold text-purple-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full text-xs flex items-center justify-center mr-2">5</span>
                  नेविगेशन
                </h3>
                <p className="text-purple-700 text-sm">
                  आप <strong>प्रश्न संख्या पैनल का उपयोग</strong> करके प्रश्नों के बीच जा सकते हैं
                </p>
              </div>

              {/* Submission */}
              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-r-lg">
                <h3 className="font-bold text-indigo-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full text-xs flex items-center justify-center mr-2">6</span>
                  सबमिशन
                </h3>
                <p className="text-indigo-700 text-sm">
                  केवल तभी <strong>"परीक्षा सबमिट करें"</strong> पर क्लिक करें जब आपने सभी प्रश्नों को पूरा कर लिया हो या उनकी समीक्षा कर ली हो
                </p>
              </div>
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center">
              <span className="w-6 h-6 bg-gray-600 text-white rounded-full text-xs flex items-center justify-center mr-2">7</span>
              तकनीकी आवश्यकताएं
            </h3>
            <p className="text-gray-700 text-sm">
              पूरी परीक्षा के दौरान <strong>स्थिर इंटरनेट कनेक्शन</strong> सुनिश्चित करें
            </p>
          </div>
        </div>

        {/* Final Warning and Start Button */}
        <div className="border-t pt-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white text-lg font-bold">⚠</span>
              </div>
              <div>
                <h4 className="font-bold text-red-800 mb-1">अंतिम चेतावनी</h4>
                <p className="text-red-700 text-sm">
                  एक बार परीक्षा शुरू होने के बाद, आप इसे रोक नहीं सकते। समय समाप्त होने पर परीक्षा अपने आप सबमिट हो जाएगी। 
                  सुनिश्चित करें कि आप पूरी तरह से तैयार हैं।
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartTest}
              type="button"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 text-lg shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              मैं सभी निर्देश समझ गया हूँ - परीक्षा शुरू करें
            </button>
            <p className="text-gray-500 text-xs mt-3">
              "मैं तैयार हूँ" बटन दबाने से परीक्षा का समय शुरू हो जाएगा
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TakeTest({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  
  // Use regular state for instructions (not persisted to avoid conflicts)
  const [showInstructions, setShowInstructions] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  
  // Persisted states for test progress
  const [currentIndex, setCurrentIndex] = usePersistedState(`test-${id}-currentIndex`, 0);
  const [selectedAnswers, setSelectedAnswers] = usePersistedState<Record<number, number>>(`test-${id}-selectedAnswers`, {});
  const [markedForReview, setMarkedForReview] = usePersistedState<Record<number, boolean>>(`test-${id}-markedForReview`, {});
  const [timeRemaining, setTimeRemaining] = usePersistedState(`test-${id}-timeRemaining`, 7200);
  
  // Non-persisted states
  const [showSubmitModal, setShowSubmitModal] = useState(false);

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

  // Check if this is a resumed test
  useEffect(() => {
    if (start.data?.attempt && start.data.resumed) {
      // If it's a resumed attempt, skip instructions
      setShowInstructions(false);
      setTestStarted(true);
    }
  }, [start.data]);

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

  // Clear persisted data on component unmount or test completion
  const clearPersistedData = useCallback(() => {
    const keysToRemove = [
      `test-${id}-currentIndex`,
      `test-${id}-selectedAnswers`,
      `test-${id}-markedForReview`,
      `test-${id}-timeRemaining`
    ];
    
    keysToRemove.forEach(key => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    });
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (!testStarted) return; // Don't start timer until test actually starts
    
    if (data?.remainingTime && timeRemaining === 7200) {
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
  }, [data, timeRemaining, testStarted]);

  // Save answer mutation
  const saveAnswer = useMutation({
    mutationFn: (payload: { questionId: string; optionId: string }) =>
      api.tests.saveAnswer(attemptId!, payload),
  });

  // Submit test mutation
  const submitTest = useMutation<TestResult>({
    mutationFn: () => api.tests.submitTest(attemptId!),
    onSuccess: (result) => {
      clearPersistedData(); // Clear saved data after successful submission
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

  // Handle instruction screen completion
  const handleStartTest = () => {
    console.log('Starting test, hiding instructions');
    setShowInstructions(false);
    setTestStarted(true);
  };

  // Show refresh warning only after test starts
  useEffect(() => {
    if (!testStarted) return;
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'आपका test progress save है, लेकिन refresh करने पर timer फिर से start हो जाएगा। क्या आप sure हैं?';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [testStarted]);

  // Loading states
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

  // Show instruction screen first (for new tests only)
  if (showInstructions && data?.test && !testStarted) {
    return (
      <InstructionScreen 
        testTitle={data.test.title}
        onStart={handleStartTest} 
      />
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

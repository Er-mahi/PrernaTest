"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TestTimer } from "@/components/test/TestTimer";
import { TestNavigation } from "@/components/test/TestNavigation";
import { QuestionCard } from "@/components/test/QuestionCard";
import { useTest } from "@/hooks/useTest";
import { useTimer } from "@/hooks/useTimer";
import { 
  Clock, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  Calculator,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle,
  X
} from "lucide-react";

interface TestInterfaceProps {
  testId: string;
  attemptId: string;
}

export const TestInterface: React.FC<TestInterfaceProps> = ({ testId, attemptId }) => {
  const router = useRouter();
  const { test, attempt, updateAnswer, submitTest, loading, error } = useTest(testId, attemptId);
  const { timeRemaining, isTimeUp, formatTime } = useTimer(test?.duration || 0);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number | null}>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-save answers
  const saveAnswer = useCallback(async (questionIndex: number, answerIndex: number | null) => {
    try {
      await updateAnswer(questionIndex, answerIndex);
    } catch (error) {
      console.error('Failed to save answer:', error);
    }
  }, [updateAnswer]);

  // Handle answer selection
  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = {
      ...answers,
      [currentQuestion]: optionIndex
    };
    setAnswers(newAnswers);
    
    // Auto-save with debounce
    saveAnswer(currentQuestion, optionIndex);
  };

  // Handle mark for review
  const handleMarkForReview = () => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  // Clear answer
  const handleClearAnswer = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion];
    setAnswers(newAnswers);
    saveAnswer(currentQuestion, null);
  };

  // Navigation
  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < (test?.questions.length || 0)) {
      setCurrentQuestion(index);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < (test?.questions.length || 1) - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Submit test
  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    try {
      await submitTest();
      router.push(`/results/${attemptId}`);
    } catch (error) {
      console.error('Failed to submit test:', error);
      setIsSubmitting(false);
    }
  };

  // Auto-submit when time is up
  useEffect(() => {
    if (isTimeUp && !isSubmitting) {
      handleSubmitTest();
    }
  }, [isTimeUp, isSubmitting]);

  // Load saved data
  useEffect(() => {
    if (attempt) {
      setAnswers(attempt.answers || {});
      setMarkedForReview(new Set(attempt.markedForReview || []));
    }
  }, [attempt]);

  // Question status helpers
  const getQuestionStatus = (index: number) => {
    const isAnswered = answers[index] !== undefined && answers[index] !== null;
    const isMarked = markedForReview.has(index);
    const isCurrent = index === currentQuestion;

    if (isCurrent) return 'current';
    if (isAnswered && isMarked) return 'answered-marked';
    if (isAnswered) return 'answered';
    if (isMarked) return 'marked';
    return 'not-visited';
  };

  const getAnsweredCount = () => Object.keys(answers).length;
  const getMarkedCount = () => markedForReview.size;
  const getNotVisitedCount = () => {
    const visitedQuestions = new Set([
      ...Object.keys(answers).map(Number), 
      ...Array.from(markedForReview), 
      currentQuestion
    ]);
    return (test?.questions.length || 0) - visitedQuestions.size;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Test</h2>
          <p className="text-gray-600 mb-4">{error || 'Test not found'}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const currentQ = test.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">{test.title}</h1>
              <p className="text-sm text-gray-600">{test.description}</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Answered: {getAnsweredCount()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span>Marked: {getMarkedCount()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>Not Visited: {getNotVisitedCount()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Audio Toggle */}
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={audioEnabled ? "Mute audio" : "Enable audio"}
          >
            {audioEnabled ? 
              <Volume2 className="h-5 w-5 text-gray-600" /> : 
              <VolumeX className="h-5 w-5 text-gray-600" />
            }
          </button>

          {/* Calculator */}
          <button
            onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Calculator"
          >
            <Calculator className="h-5 w-5 text-gray-600" />
          </button>

          {/* Timer */}
          <TestTimer 
            timeRemaining={timeRemaining} 
            isUrgent={timeRemaining < 600} 
          />

          {/* Submit Button */}
          <Button 
            onClick={() => setShowSubmitDialog(true)}
            className="bg-red-600 hover:bg-red-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Test'}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Question Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Question Header */}
          <div className="bg-white border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Question {currentQuestion + 1} of {test.questions.length}
                </h2>
                <p className="text-sm text-gray-600">
                  {currentQ?.subject} • +{currentQ?.marks} marks
                  {currentQ?.negativeMarks > 0 && ` • -${currentQ.negativeMarks} negative marking`}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {markedForReview.has(currentQuestion) && (
                  <div className="flex items-center text-amber-600 text-sm">
                    <Flag className="h-4 w-4 mr-1" />
                    Marked for Review
                  </div>
                )}
                {answers[currentQuestion] !== undefined && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Answered
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <QuestionCard
              question={currentQ}
              selectedAnswer={answers[currentQuestion]}
              onAnswerSelect={handleAnswerSelect}
              isMarkedForReview={markedForReview.has(currentQuestion)}
              onMarkForReview={handleMarkForReview}
              onClearAnswer={handleClearAnswer}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={nextQuestion}
                disabled={currentQuestion === test.questions.length - 1}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Question Navigation Sidebar */}
        <TestNavigation
          questions={test.questions}
          currentQuestion={currentQuestion}
          answers={answers}
          markedForReview={markedForReview}
          onNavigate={navigateToQuestion}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Submit Confirmation Dialog */}
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              <h3 className="text-lg font-semibold text-gray-900">Submit Test?</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to submit your test? You won't be able to make any changes after submission.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Answered:</span>
                    <span className="font-medium ml-2 text-green-600">{getAnsweredCount()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Marked:</span>
                    <span className="font-medium ml-2 text-amber-600">{getMarkedCount()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Not Attempted:</span>
                    <span className="font-medium ml-2 text-red-600">
                      {test.questions.length - getAnsweredCount()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Time Left:</span>
                    <span className="font-medium ml-2 text-blue-600">{formatTime(timeRemaining)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowSubmitDialog(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitTest}
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Calculator Modal */}
      {isCalculatorOpen && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border p-4 z-40 w-64">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Calculator</h4>
            <button
              onClick={() => setIsCalculatorOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500 text-sm">Calculator Widget</p>
          </div>
        </div>
      )}
    </div>
  );
};
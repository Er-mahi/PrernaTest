"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { TestAttempt, TestResult } from "@/types/test";

export function useTest(testId: string, attemptId: string) {
  const [test, setTest] = useState<any>(null);
  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const testData = await api.tests.getById(testId);
        setTest(testData);
        const attemptData = await api.tests.getAttempt(attemptId);
        setAttempt(attemptData);
      } catch (err: any) {
        setError(err.message || "Failed to load test");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [testId, attemptId]);

  const updateAnswer = async (questionIndex: number, answerIndex: number | null) => {
    if (!attemptId) return;
    return api.tests.updateAnswer(attemptId, questionIndex, answerIndex);
  };

  const submitTest = async (): Promise<TestResult> => {
    if (!attemptId) throw new Error("No attempt ID");
    return api.tests.submitTest(attemptId);
  };

  return { test, attempt, updateAnswer, submitTest, loading, error };
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { TestAttempt, TestResult } from "@/types/test";
import * as React from "react";

export default function TakeTest({ params }: { params: Promise<{ id: string }> }) {
  // --- Start attempt ---
  
  const { id } = React.use(params);
  const start = useMutation<{ attempt: TestAttempt; resumed: boolean }>({
    mutationFn: () => api.tests.startAttempt(id),
  });

// attemptId extract safely



  useEffect(() => {
    start.mutate(); // fire once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Get attempt data ---
  const attemptId = start.data?.attempt?.id;

 const { data, isLoading: isAttemptLoading } = useQuery<TestAttempt>({
  enabled: !!attemptId,
  queryKey: ["attempt", attemptId],
  queryFn: () => api.tests.getAttempt(attemptId!),
});

  console.log("attempt data", data);

  // Flatten sections → questions
  const flat = useMemo(() => {

   if (!data?.test?.sections) return [];
  return data.test.sections.flatMap((s) =>
    s.questions.map((q) => ({
      qid: q.question.id,
      content: q.question.content,
      options: q.question.options,
      marks: q.marks,
    }))
  );
}, [data]);


  // --- Save answer ---
  const save = useMutation({
    mutationFn: (payload: { questionIndex: number; answerIndex: number | null }) =>
      api.tests.updateAnswer(attemptId!, payload.questionIndex, payload.answerIndex),
  });

  // --- Submit test ---
  const submit = useMutation<TestResult>({
    mutationFn: () => api.tests.submitTest(attemptId!),
  });

  const [index, setIndex] = useState(0);
  const current = flat[index];

  // --- Loading states ---
  if (start.isPending || isAttemptLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        Preparing your attempt…
      </div>
    );
  }

  if (!current) {
    return (
      <div className="container mx-auto px-6 py-12">
        No questions found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="mb-4 text-xl font-bold">{data?.test.title}</h1>
      <div className="rounded-xl border bg-card p-4 bg-slate-700">
        <div className="text-sm text-muted-foreground">
          Question {index + 1} / {flat.length}
        </div>
        <p className="mt-3 whitespace-pre-wrap">{current.content}</p>

        <div className="mt-4 space-y-2">
          {current.options.map((o, optIndex) => (
            <button
              key={o.id}
              className="block w-full rounded-lg border p-3 text-left hover:bg-muted"
              onClick={() =>
                save.mutate({ questionIndex: index, answerIndex: optIndex })
              }
            >
              {o.content}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button onClick={() => setIndex((i) => Math.max(0, i - 1))}>
            Back
          </Button>
          {index + 1 < flat.length ? (
            <Button
              onClick={() => setIndex((i) => Math.min(flat.length - 1, i + 1))}
              className="border-0 bg-blue-600 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => submit.mutate()}
              className="border-0 bg-green-600 text-white"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

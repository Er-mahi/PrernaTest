import prisma from "@/config/database";

class AttemptService {
  async start(userId: string, testId: string) {
    const existing = await prisma.attempt.findFirst({ where: { userId, testId, status: "IN_PROGRESS" } });
    if (existing) return { attempt: existing, resumed: true };

    const test = await prisma.test.findUnique({
      where: { id: testId },
      select: { id: true, duration: true, totalMarks: true, status: true, isFree: true }
    });
    if (!test || test.status !== "PUBLISHED") throw new Error("Test not available");

    const attempt = await prisma.attempt.create({
      data: { userId, testId, status: "IN_PROGRESS", totalMarks: test.totalMarks },
      select: { id: true, status: true, startedAt: true }
    });
    return { attempt, resumed: false };
  }

async getQuestions(userId: string, attemptId: string) {
  const attempt = await prisma.attempt.findFirst({
    where: { id: attemptId, userId, status: "IN_PROGRESS" },
    select: {
      id: true,
      test: {
        select: {
          id: true,
          title: true,
          sections: {
            select: {
              id: true,
              title: true,
              order: true,
              questions: {
                select: {
                  id: true,
                  order: true,
                  marks: true,
                  question: {
                    select: {
                      id: true,
                      content: true,
                      difficulty: true,
                      marks: true,
                      imageUrl: true,
                      options: {
                        select: { id: true, content: true, order: true, imageUrl: true },
                        orderBy: { order: "asc" }
                      }
                    }
                  }
                },
                orderBy: { order: "asc" }
              }
            },
            orderBy: { order: "asc" }
          }
        }
      }
    }
  });

  if (!attempt) throw new Error("Attempt not found");

  const userAnswers = await prisma.attemptAnswer.findMany({
    where: { attemptId },
    select: { questionId: true, selectedOptionId: true, isMarkedForReview: true, timeSpent: true }
  });

  const answersMap = userAnswers.reduce((acc: Record<string, any>, a) => {
    acc[a.questionId] = {
      selectedOptionId: a.selectedOptionId ?? null,
      isMarkedForReview: a.isMarkedForReview,
      timeSpent: a.timeSpent ?? 0
    };
    return acc;
  }, {});

  // ✅ Return flattened TestAttempt object
  return {
    id: attempt.id,
    test: attempt.test,
    userAnswers: answersMap,
  };
}





  async saveAnswer(
    userId: string,
    attemptId: string,
    payload: { questionId: string; selectedOptionId?: string | null; isMarkedForReview?: boolean; timeSpent?: number }
  ) {
    const exists = await prisma.attempt.findFirst({ where: { id: attemptId, userId, status: "IN_PROGRESS" } });
    if (!exists) throw new Error("Attempt not active");

    await prisma.attemptAnswer.upsert({
      where: { attemptId_questionId: { attemptId, questionId: payload.questionId } },
      create: {
        attemptId,
        questionId: payload.questionId,
        selectedOptionId: payload.selectedOptionId ?? null,
        isMarkedForReview: payload.isMarkedForReview ?? false,
        timeSpent: payload.timeSpent ?? 0
      },
      update: {
        selectedOptionId: payload.selectedOptionId ?? null,
        isMarkedForReview: payload.isMarkedForReview ?? false,
        timeSpent: payload.timeSpent ?? 0,
        // version and updatedAt fields exist in schema, so this is valid
        version: { increment: 1 },
        updatedAt: new Date()
      }
    });
  }

  async submit(userId: string, attemptId: string) {
    const attempt = await prisma.attempt.findFirst({
      where: { id: attemptId, userId, status: "IN_PROGRESS" },
      include: {
        test: { select: { negativeMarking: true, negativeMarks: true } },
        answers: {
          include: {
            question: {
              select: { marks: true, options: { select: { id: true, isCorrect: true } } }
            }
          }
        }
      }
    });
    if (!attempt) throw new Error("Attempt not found");

    let totalScore = 0;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    for (const ans of attempt.answers) {
      const correctOption = ans.question.options.find(o => o.isCorrect)?.id ?? null;
      const given = ans.selectedOptionId ?? null;
      if (!given) { unattempted++; continue; }
      const isCorrect = given === correctOption;
      if (isCorrect) { totalScore += ans.question.marks; correct++; }
      else { wrong++; if (attempt.test.negativeMarking) totalScore -= ans.question.marks * (attempt.test.negativeMarks ?? 0); }

      // update attempt answer with correctness and marks awarded
      await prisma.attemptAnswer.update({
        where: { id: ans.id },
        data: {
          isCorrect,
          marksAwarded: isCorrect ? ans.question.marks : (attempt.test.negativeMarking ? -ans.question.marks * (attempt.test.negativeMarks ?? 0) : 0)
        }
      });
    }

    const percentage = attempt.totalMarks ? (totalScore / attempt.totalMarks) * 100 : 0;

    return prisma.attempt.update({
      where: { id: attemptId },
      data: {
        status: "SUBMITTED",
        score: Math.max(0, totalScore),
        percentage: Math.max(0, percentage),
        correctAnswers: correct,
        wrongAnswers: wrong,
        unattempted,
        submittedAt: new Date()
      },
      select: { id: true, score: true, percentage: true, correctAnswers: true, wrongAnswers: true, unattempted: true, timeSpent: true, submittedAt: true }
    });
  }

  result(userId: string, attemptId: string) {
    return prisma.attempt.findFirst({
      where: { id: attemptId, userId, status: { in: ["SUBMITTED", "AUTO_SUBMITTED"] } },
      select: {
        id: true, score: true, totalMarks: true, percentage: true, correctAnswers: true, wrongAnswers: true, unattempted: true, timeSpent: true, submittedAt: true,
        test: { select: { id: true, title: true, allowReview: true } },
        answers: {
          select: {
            questionId: true, selectedOptionId: true, isCorrect: true, marksAwarded: true, timeSpent: true, isMarkedForReview: true,
            question: { select: { id: true, content: true, explanation: true, marks: true, options: { select: { id: true, content: true, isCorrect: true, order: true }, orderBy: { order: "asc" } } } }
          }
        }
      }
    });
  }
}

export const attemptService = new AttemptService();

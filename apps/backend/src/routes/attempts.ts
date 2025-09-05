import { Router } from "express";
import { authenticateToken } from "@/middleware/auth";
import { AppError, catchAsync } from "@/middleware/errorHandler";
import { validateStartAttempt, validateSaveAnswer, validateId } from "@/middleware/validation";
import prisma from "@/config/database";
import { AttemptStatus } from "@prisma/client";

const router = Router();

/**
 * Start a new attempt
 */
router.post(
  "/:testId/start",
  authenticateToken,
  validateStartAttempt,
  catchAsync(async (req, res) => {
    const testId = req.params.testId!;
    const userId = req.user!.id;

    const test = await prisma.test.findUnique({ where: { id: testId } });
    if (!test) throw new AppError("Test not found", 404);

    const attempt = await prisma.attempt.create({
      data: {
        userId,
        testId,
        status: "IN_PROGRESS",
        totalMarks: test.totalMarks,
        timeSpent: 0,
        remainingTime: test.duration * 60,
      },
    });

    res.status(201).json({ attempt });
  })
);

/**
 * Save answer (autosave)
 */
router.post(
  "/:attemptId/answers",
  authenticateToken,
  validateSaveAnswer,
  catchAsync(async (req, res) => {
    const attemptId = req.params.attemptId!;
    const { questionId, selectedOptionId, isMarkedForReview, timeSpent } = req.body;

    if (!questionId || !selectedOptionId)
      throw new AppError("questionId and selectedOptionId are required", 400);

    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt) throw new AppError("Attempt not found", 404);

    const answer = await prisma.attemptAnswer.upsert({
      where: {
        attemptId_questionId: { attemptId, questionId },
      },
      update: {
        selectedOptionId,
        isMarkedForReview,
        timeSpent,
        version: { increment: 1 },
      },
      create: {
        attemptId,
        questionId,
        selectedOptionId,
        isMarkedForReview,
        timeSpent,
      },
    });

    res.status(200).json({ answer });
  })
);

/**
 * Submit attempt
 */
router.post(
  "/:attemptId/submit",
  authenticateToken,
  validateId,
  catchAsync(async (req, res) => {
    const attemptId = req.params.attemptId!;

    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        answers: { include: { question: { include: { options: true } } } },
        test: true,
      },
    });

    if (!attempt) throw new AppError("Attempt not found", 404);

    let correct = 0;
    let wrong = 0;
    let score = 0;

    for (const ans of attempt.answers) {
      if (!ans.selectedOptionId) continue;

      const correctOption = ans.question.options.find((o) => o.isCorrect);
      const isCorrect = correctOption?.id === ans.selectedOptionId;

      if (isCorrect) {
        correct++;
        score += ans.question.marks;
      } else {
        wrong++;
        if (attempt.test.negativeMarking) {
          score -= ans.question.negativeMarks ?? attempt.test.negativeMarks;
        }
      }

      await prisma.attemptAnswer.update({
        where: { id: ans.id },
        data: {
          isCorrect,
          marksAwarded: isCorrect ? ans.question.marks : 0,
        },
      });
    }

    const percentage = (score / (attempt.test.totalMarks || 1)) * 100;

   const updatedAttempt = await prisma.attempt.update({
  where: { id: attemptId },
  data: {
    status: AttemptStatus.SUBMITTED, // <-- use valid enum
    score,
    percentage,
    correctAnswers: correct,
    wrongAnswers: wrong,
    submittedAt: new Date(),
  },
});

    res.status(200).json({ attempt: updatedAttempt });
  })
);

export default router;
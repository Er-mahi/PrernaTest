// backend/src/routes/results.ts
import { Router } from "express";
import { authenticateToken } from "@/middleware/auth";
import { AppError, catchAsync } from "@/middleware/errorHandler";
import { Prisma } from "@prisma/client";
import prisma from "@/config/database";

const router = Router();

// Define the correct type for attempt with relations
type AttemptWithRelations = Prisma.AttemptGetPayload<{
  include: {
    test: {
      include: {
        sections: {
          include: {
            questions: {
              include: {
                question: { include: { options: true } }
              }
            }
          }
        }
      }
    };
    answers: true;
  };
}>;

/**
 * Get all results for the authenticated user
 */
router.get(
  "/",
  authenticateToken,
  catchAsync(async (req, res) => {
    const userId = req.user!.id;

    const attempts = await prisma.attempt.findMany({
      where: { 
        userId,
        status: "SUBMITTED" // Only submitted attempts
      },
      include: {
        test: {
          select: {
            id: true,
            title: true,
            totalMarks: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    const results = attempts.map((attempt) => ({
      id: attempt.id,
      attemptId: attempt.id,
      testId: attempt.testId,
      testTitle: attempt.test.title,
      score: attempt.score || 0,
      totalMarks: attempt.totalMarks || attempt.test.totalMarks,
      percentage: attempt.percentage || 0,
      passed: (attempt.percentage || 0) >= 60,
      submittedAt: attempt.submittedAt,
    }));

    res.json(results);
  })
);

/**
 * Get individual result by ID
 */
router.get(
  "/:resultId",
  authenticateToken,
  catchAsync(async (req, res) => {
    const { resultId } = req.params;
    const userId = req.user!.id;

    // Ensure resultId is not undefined
    if (!resultId) {
      throw new AppError("Result ID is required", 400);
    }

    const attempt = await prisma.attempt.findUnique({
      where: { id: resultId },
      include: {
        test: {
          include: {
            sections: {
              include: {
                questions: {
                  include: {
                    question: { include: { options: true } }
                  }
                }
              }
            }
          }
        },
        answers: true
      }
    }) as AttemptWithRelations | null;

    if (!attempt || attempt.userId !== userId) {
      throw new AppError("Result not found", 404);
    }

    if (attempt.status !== "SUBMITTED") {
      throw new AppError("Test not yet submitted", 400);
    }

    // Calculate remaining time
    const elapsed = Math.floor((Date.now() - attempt.startedAt.getTime()) / 1000);
    const totalDuration = attempt.test.duration * 60;
    const remainingTime = Math.max(0, totalDuration - elapsed);

    // Type the reducer parameter explicitly
    const userAnswers = attempt.answers.reduce(
      (acc: Record<string, { selectedOptionId: string | null; isMarkedForReview: boolean }>, 
       ans: AttemptWithRelations['answers'][number]) => {
        acc[ans.questionId] = {
          selectedOptionId: ans.selectedOptionId,
          isMarkedForReview: ans.isMarkedForReview,
        };
        return acc;
      }, 
      {}
    );

    const result = {
      id: attempt.id,
      remainingTime,
      test: attempt.test,
      userAnswers,
      answers: attempt.answers,
      attemptId: attempt.id,
      testId: attempt.testId,
      testTitle: attempt.test.title || "Test",
      score: attempt.score || 0,
      totalMarks: attempt.totalMarks || attempt.test.totalMarks,
      percentage: attempt.percentage || 0,
      passed: (attempt.percentage || 0) >= 60,
      submittedAt: attempt.submittedAt,
      correctAnswers: attempt.correctAnswers || 0,
      wrongAnswers: attempt.wrongAnswers || 0,
      duration: attempt.test.duration,
      timeSpent: attempt.timeSpent || 0,
    };

    res.json(result);
  })
);

export default router;

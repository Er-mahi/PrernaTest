import { Router, Request, Response, NextFunction } from "express";
import prisma from "@/config/database";
import { authenticateToken, optionalAuth, authorize } from "@/middleware/auth";
import { AppError } from "@/middleware/errorHandler";

const router = Router();

// ✅ Create a new test (only Admins)
router.post(
  "/",
  authenticateToken,
  authorize("ADMIN"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, duration, totalMarks } = req.body;

      if (!title || !duration || !totalMarks) {
        throw new AppError("Title, duration and totalMarks are required", 400);
      }

      const test = await prisma.test.create({
        data: {
          title,
          description,
          duration: Number(duration),
          totalMarks: Number(totalMarks),
        },
      });

      res.status(201).json(test);
    } catch (error) {
      next(error);
    }
  }
);

// ✅ Get all tests
router.get("/", optionalAuth, async (_req, res, next) => {
  try {
    const tests = await prisma.test.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        totalMarks: true,
        _count: { select: { attempts: true } },
      },
    });
    res.json(tests);
  } catch (error) {
    next(error);
  }
});

// ✅ Get single test by ID with sections/questions/options
router.get("/:id", optionalAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError("Test ID is required", 400);

    const test = await prisma.test.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            questions: {
              include: {
                question: {
                  include: { options: true },
                },
              },
            },
          },
        },
      },
    });

    if (!test) throw new AppError("Test not found", 404);

    // Flatten questions for frontend
    const questions = test.sections.flatMap((s) =>
      s.questions.map((sq) => ({
        id: sq.question.id,
        content: sq.question.content,
        marks: sq.marks,
        negativeMarks: sq.question.negativeMarks ?? test.negativeMarks,
        subject: s.title,
        options: sq.question.options.map((o) => ({
          id: o.id,
          content: o.content,
          order: o.order,
        })),
      }))
    );

    res.json({ ...test, questions });
  } catch (error) {
    next(error);
  }
});

// ✅ Get attempts of a test
router.get("/:id/attempts", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError("Test ID is required", 400);

    const attempts = await prisma.attempt.findMany({
      where: { testId: id },
      orderBy: { submittedAt: "desc" },
      select: {
        id: true,
        score: true,
        percentage: true,
        status: true,
        submittedAt: true,
      },
    });

    res.json(attempts);
  } catch (error) {
    next(error);
  }
});

export default router;

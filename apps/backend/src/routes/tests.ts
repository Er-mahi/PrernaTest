import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@/config/database';
import { authenticateToken, optionalAuth, authorize } from '@/middleware/auth';
import { AppError } from '@/middleware/errorHandler';

const router = Router();

// ✅ Create a new test (only Admins)
router.post(
  '/',
  authenticateToken,
  authorize('ADMIN'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, duration, totalMarks } = req.body;

if (!title || !duration || !totalMarks) {
  throw new AppError('Title, duration and totalMarks are required', 400);
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

// ✅ Get all tests (public, optional auth)
router.get('/', optionalAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tests = await prisma.test.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        _count: { select: { attempts: true } }, // ✅ include _count
      },
    });

    res.json(tests);
  } catch (error) {
    next(error);
  }
});

// ✅ Get single test by ID
router.get('/:id', optionalAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError('Test ID is required', 400);

    const test = await prisma.test.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        _count: { select: { attempts: true } }, // ✅ include _count
      },
    });

    if (!test) throw new AppError('Test not found', 404);

    res.json(test);
  } catch (error) {
    next(error);
  }
});

// ✅ Get attempts of a test
router.get('/:id/attempts', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError('Test ID is required', 400);

    const attempts = await prisma.attempt.findMany({
      where: { testId: id },
      orderBy: { submittedAt: 'desc' }, // ✅ requires createdAt in schema
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

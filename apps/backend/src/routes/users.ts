// src/routes/users.ts
import { Router } from 'express';
import { authenticateToken, authorize } from '@/middleware/auth';
import { AppError, catchAsync } from '@/middleware/errorHandler';
import { validateUpdateProfile, validateId, validatePagination } from '@/middleware/validation';
import prisma from '@/config/database';
import { logger } from '@/utils/logger';

const router = Router();

/**
 * @route GET /api/users/profile
 * @desc Get current user's profile
 * @access Private
 */
router.get('/profile', authenticateToken, catchAsync(async (req, res) => {
  const userId = req.user!.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      phone: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      lastLoginAt: true,
      profileSettings: {
        select: {
          theme: true,
          language: true,
          timezone: true,
          emailNotifications: true,
          pushNotifications: true,
        },
      },
      _count: { select: { attempts: true, bookmarks: true } },
    },
  });

  if (!user) throw new AppError('User not found', 404);

  res.json({ success: true, data: { user } });
}));

/**
 * @route PUT /api/users/profile
 * @desc Update user profile
 * @access Private
 */
router.put('/profile', authenticateToken, validateUpdateProfile, catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const { name, phone } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: name?.trim() || undefined,
      phone: phone?.trim() || undefined,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      phone: true,
      updatedAt: true,
    },
  });

  logger.info(`User profile updated`, { userId });

  res.json({ success: true, message: 'Profile updated successfully', data: { user: updatedUser } });
}));

/**
 * @route GET /api/users/attempts
 * @desc Get user's test attempts with pagination and optional status filter
 * @access Private
 */
router.get('/attempts', authenticateToken, validatePagination, catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const status = req.query.status as string;
  const skip = (page - 1) * limit;

  const where: any = { userId };
  if (status) where.status = status;

  const [attempts, total] = await Promise.all([
    prisma.attempt.findMany({
      where,
      skip,
      take: limit,
      orderBy: { startedAt: 'desc' },
      select: {
        id: true,
        status: true,
        score: true,
        totalMarks: true,
        percentage: true,
        correctAnswers: true,
        wrongAnswers: true,
        unattempted: true,
        timeSpent: true,
        startedAt: true,
        submittedAt: true,
        test: {
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            difficulty: true,
            category: { select: { name: true, slug: true } },
          },
        },
      },
    }),
    prisma.attempt.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      attempts,
      pagination: { current: page, total: Math.ceil(total / limit), count: attempts.length, totalAttempts: total },
    },
  });
}));

/**
 * @route GET /api/users/bookmarks
 * @desc Get user's bookmarked questions
 * @access Private
 */
router.get('/bookmarks', authenticateToken, validatePagination, catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [bookmarks, total] = await Promise.all([
    prisma.bookmark.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        question: {
          select: {
            id: true,
            content: true,
            difficulty: true,
            explanation: true,
            options: {
              select: { id: true, content: true, isCorrect: true, order: true },
              orderBy: { order: 'asc' },
            },
          },
        },
        createdAt: true,
      },
    }),
    prisma.bookmark.count({ where: { userId } }),
  ]);

  res.json({
    success: true,
    data: {
      bookmarks,
      pagination: { current: page, total: Math.ceil(total / limit), count: bookmarks.length, totalBookmarks: total },
    },
  });
}));

/**
 * @route POST /api/users/bookmarks/:questionId
 * @desc Bookmark a question
 * @access Private
 */
router.post('/bookmarks/:questionId', authenticateToken, catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const { questionId } = req.params;
  if (!questionId) throw new AppError('Question ID is required', 400);

  const existingBookmark = await prisma.bookmark.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });

  if (existingBookmark) throw new AppError('Question already bookmarked', 400);

  await prisma.bookmark.create({ data: { userId, questionId } });

  res.status(201).json({ success: true, message: 'Question bookmarked successfully' });
}));

/**
 * @route DELETE /api/users/bookmarks/:questionId
 * @desc Remove bookmark from a question
 * @access Private
 */
router.delete('/bookmarks/:questionId', authenticateToken, catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const { questionId } = req.params;
  if (!questionId) throw new AppError('Question ID is required', 400);

  const bookmark = await prisma.bookmark.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });

  if (!bookmark) throw new AppError('Bookmark not found', 404);

  await prisma.bookmark.delete({ where: { userId_questionId: { userId, questionId } } });

  res.json({ success: true, message: 'Bookmark removed successfully' });
}));

/**
 * @route PUT /api/users/settings
 * @desc Update user profile settings
 * @access Private
 */
router.put('/settings', authenticateToken, catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const { theme, language, timezone, emailNotifications, pushNotifications } = req.body;

  const settings = await prisma.profileSettings.upsert({
    where: { userId },
    create: { userId, theme, language, timezone, emailNotifications, pushNotifications },
    update: { theme, language, timezone, emailNotifications, pushNotifications },
  });

  logger.info(`User settings updated`, { userId });

  res.json({ success: true, message: 'Settings updated successfully', data: { settings } });
}));

/**
 * @route GET /api/users
 * @desc Get all users (Admin)
 * @access Admin
 */
router.get('/', authenticateToken, authorize('ADMIN', 'SUPER_ADMIN'), validatePagination, catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;
  const role = req.query.role as string;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }];
  if (role) where.role = role;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        lastLoginAt: true,
        _count: { select: { attempts: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  res.json({
    success: true,
    data: { users, pagination: { current: page, total: Math.ceil(total / limit), count: users.length, totalUsers: total } },
  });
}));


// backend/src/routes/users.ts
router.get(
  "/stats",
  authenticateToken,
  catchAsync(async (req, res) => {
    const userId = req.user!.id;

    // Get user statistics from database
    const attempts = await prisma.attempt.findMany({
      where: { userId, status: "SUBMITTED" },
      select: { score: true, percentage: true },
    });

    const testsCompleted = attempts.length;
    const averageScore = testsCompleted > 0 
      ? attempts.reduce((acc, attempt) => acc + (attempt.percentage || 0), 0) / testsCompleted 
      : 0;
    const totalScore = attempts.reduce((acc, attempt) => acc + (attempt.score || 0), 0);

    // You can implement ranking logic based on your requirements
    const rank = 1; // Placeholder
    const streakDays = 0; // Placeholder

    res.json({
      testsCompleted,
      averageScore: Math.round(averageScore * 100) / 100,
      totalScore,
      rank,
      streakDays,
    });
  })
);


/**
 * @route PATCH /api/users/:id/status
 * @desc Activate/deactivate user (Admin)
 * @access Admin
 */
router.patch('/:id/status', authenticateToken, authorize('ADMIN', 'SUPER_ADMIN'), validateId, catchAsync(async (req, res) => {
  const targetUserId = req.params.id!;
  const { isActive } = req.body;
  if (typeof isActive !== 'boolean') throw new AppError('isActive must be a boolean', 400);

  const targetUser = await prisma.user.findUnique({ where: { id: targetUserId }, select: { role: true, email: true } });
  if (!targetUser) throw new AppError('User not found', 404);
  if (targetUser.role === 'SUPER_ADMIN') throw new AppError('Cannot modify super admin status', 403);

  const updatedUser = await prisma.user.update({
    where: { id: targetUserId },
    data: { isActive },
    select: { id: true, email: true, isActive: true },
  });

  logger.info(`User status updated`, { targetUserId, isActive, adminUserId: req.user!.id });

  res.json({ success: true, message: `User ${isActive ? 'activated' : 'deactivated'} successfully`, data: { user: updatedUser } });
}));

export default router;

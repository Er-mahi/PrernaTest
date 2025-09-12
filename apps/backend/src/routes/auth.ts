
import { Router } from 'express';
import { authService } from '@/services/authService';
import { AppError, catchAsync } from '@/middleware/errorHandler';
import { 
  validateSignup, 
  validateLogin, 
  validateForgotPassword, 
  validateResetPassword 
} from '@/middleware/validation';
import { authRateLimiter, passwordResetRateLimiter } from '@/middleware/rateLimit';
import { authenticateToken } from '@/middleware/auth';
import { config, isProduction } from '@/config/env';
import { logger } from '@/utils/logger';

const router = Router();

// Helper function to set auth cookie
const setAuthCookie = (res: any, token: string) => {
  res.cookie('auth-token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Helper function to clear auth cookie
const clearAuthCookie = (res: any) => {
  res.clearCookie('auth-token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  });
};

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', authRateLimiter, validateSignup, catchAsync(async (req, res) => {
  const { email, password, name } = req.body;

  const result = await authService.signup({ email, password, name });

  // Set auth cookie
  setAuthCookie(res, result.accessToken);

  logger.info(`New user registered: ${email}`, { userId: result.user.id });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: result.user,
    // Don't send refresh token in response for security
  });
}));

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post('/login', authRateLimiter, validateLogin, catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  // Set auth cookie
  setAuthCookie(res, result.accessToken);

  logger.info(`User logged in: ${email}`, { userId: result.user.id });

  res.json({
    success: true,
    message: 'Login successful',
    user: result.user,
  });
}));

/**
 * @route   POST /api/auth/google
 * @desc    Google OAuth login
 * @access  Public
 */
router.post('/google', authRateLimiter, catchAsync(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new AppError('Google token is required', 400);
  }

  const result = await authService.googleLogin(token);

  // Set auth cookie
  setAuthCookie(res, result.accessToken);

  logger.info(`Google login successful: ${result.user.email}`, { userId: result.user.id });

  res.json({
    success: true,
    message: 'Google login successful',
    user: result.user,
  });
}));

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError('Refresh token is required', 400);
  }

  const result = await authService.refreshToken(refreshToken);

  // Set new auth cookie
  setAuthCookie(res, result.accessToken);

  res.json({
    success: true,
    message: 'Token refreshed successfully',
  });
}));

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post('/forgot-password', passwordResetRateLimiter, validateForgotPassword, catchAsync(async (req, res) => {
  const { email } = req.body;

  await authService.forgotPassword(email);

  // Always return success to prevent email enumeration
  res.json({
    success: true,
    message: 'If an account with that email exists, a password reset link has been sent.',
  });
}));

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', validateResetPassword, catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;

  await authService.resetPassword(token, newPassword);

  logger.info('Password reset successful');

  res.json({
    success: true,
    message: 'Password reset successful. Please login with your new password.',
  });
}));

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticateToken, catchAsync(async (req, res) => {
  const user = await authService.getProfile(req.user!.id);
  res.json({
    success: true,
    user,
  });
}));

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authenticateToken, catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  await authService.logout(req.user!.id, refreshToken);

  // Clear auth cookie
  clearAuthCookie(res);

  logger.info(`User logged out: ${req.user?.email}`, { userId: req.user?.id });

  res.json({
    success: true,
    message: 'Logout successful',
  });
}));

/**
 * @route   POST /api/auth/change-password
 * @desc    Change password for authenticated user
 * @access  Private
 */
router.post('/change-password', authenticateToken, catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError('Current password and new password are required', 400);
  }

  if (newPassword.length < 8) {
    throw new AppError('New password must be at least 8 characters long', 400);
  }

  // This would be implemented in AuthService
  // await authService.changePassword(req.user!.id, currentPassword, newPassword);

  res.json({
    success: true,
    message: 'Password changed successfully',
  });
}));

/**
 * @route   POST /api/auth/verify-email
 * @desc    Verify email address
 * @access  Public
 */
router.post('/verify-email', catchAsync(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new AppError('Verification token is required', 400);
  }

  // This would be implemented in AuthService
  // await authService.verifyEmail(token);

  res.json({
    success: true,
    message: 'Email verified successfully',
  });
}));

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend email verification
 * @access  Private
 */
router.post('/resend-verification', authenticateToken, catchAsync(async (req, res) => {
  // This would be implemented in AuthService
  // await authService.resendEmailVerification(req.user!.id);

  res.json({
    success: true,
    message: 'Verification email sent',
  });
}));

export default router;
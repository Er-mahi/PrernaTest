
import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { AppError } from './errorHandler';

// Validation error handler
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return next(new AppError(`Validation Error: ${errorMessages.join(', ')}`, 400));
  }
  
  next();
};

// Auth validation schemas
export const validateSignup = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  handleValidationErrors,
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors,
];

export const validateForgotPassword = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  handleValidationErrors,
];

export const validateResetPassword = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  handleValidationErrors,
];

// Test validation schemas
export const validateCreateTest = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Test title must be between 3 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('duration')
    .isInt({ min: 1, max: 600 })
    .withMessage('Duration must be between 1 and 600 minutes'),
  body('totalMarks')
    .isInt({ min: 1 })
    .withMessage('Total marks must be a positive integer'),
  body('negativeMarking')
    .optional()
    .isBoolean()
    .withMessage('Negative marking must be a boolean'),
  body('negativeMarks')
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage('Negative marks must be between 0 and 1'),
  body('isFree')
    .optional()
    .isBoolean()
    .withMessage('isFree must be a boolean'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  handleValidationErrors,
];

export const validateCreateQuestion = [
  body('content')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Question content must be between 10 and 2000 characters'),
  body('explanation')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Explanation cannot exceed 1000 characters'),
  body('difficulty')
    .optional()
    .isIn(['EASY', 'MEDIUM', 'HARD'])
    .withMessage('Difficulty must be EASY, MEDIUM, or HARD'),
  body('marks')
    .optional()
    .isFloat({ min: 0.25 })
    .withMessage('Marks must be at least 0.25'),
  body('options')
    .isArray({ min: 2, max: 6 })
    .withMessage('Question must have between 2 and 6 options'),
  body('options.*.content')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Option content must be between 1 and 500 characters'),
  body('options.*.isCorrect')
    .isBoolean()
    .withMessage('isCorrect must be a boolean'),
  handleValidationErrors,
];

// Attempt validation schemas
export const validateStartAttempt = [
  param('testId')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Test ID is required'),
  handleValidationErrors,
];

export const validateSaveAnswer = [
  param('attemptId')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Attempt ID is required'),
  body('questionId')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Question ID is required'),
  body('selectedOptionIds')
    .optional()
    .isArray()
    .withMessage('Selected options must be an array'),
  body('isMarkedForReview')
    .optional()
    .isBoolean()
    .withMessage('isMarkedForReview must be a boolean'),
  handleValidationErrors,
];

// User validation schemas
export const validateUpdateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  handleValidationErrors,
];

// Payment validation schemas
export const validateCreatePayment = [
  body('planId')
    .optional()
    .isString()
    .withMessage('Plan ID must be a string'),
  body('testId')
    .optional()
    .isString()
    .withMessage('Test ID must be a string'),
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Amount must be at least 1'),
  body('currency')
    .optional()
    .isIn(['INR', 'USD'])
    .withMessage('Currency must be INR or USD'),
  handleValidationErrors,
];

// Common validation helpers
export const validateId = [
  param('id')
    .isString()
    .isLength({ min: 1 })
    .withMessage('ID parameter is required'),
  handleValidationErrors,
];

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors,
];

export const validateSearch = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  handleValidationErrors,
];
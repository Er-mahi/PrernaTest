import { body, param, query } from "express-validator";

export const validateIdParam = [param("id").isString().notEmpty()];
export const validateSignupBody = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
  body("name").optional().isLength({ min: 2, max: 50 })
];
export const validateLoginBody = [body("email").isEmail(), body("password").notEmpty()];
export const validateForgotBody = [body("email").isEmail()];
export const validateResetBody = [body("token").notEmpty(), body("newPassword").isLength({ min: 8 })];
export const validatePagination = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 })
];
export const validateStartAttempt = [param("testId").isString().notEmpty()];
export const validateSaveAnswer = [
  param("id").isString().notEmpty(),
  body("questionId").isString().notEmpty(),
  body("selectedOptionId").optional().isString().notEmpty(),
  body("isMarkedForReview").optional().isBoolean(),
  body("timeSpent").optional().isInt({ min: 0 })
];

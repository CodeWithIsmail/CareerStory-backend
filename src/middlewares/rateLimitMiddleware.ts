import { rateLimit } from 'express-rate-limit';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { AuthRequest } from './authenticationMiddleware.ts';

const createRateLimitError = (message: string) => ({
  success: false,
  statusCode: 429,
  message: message,
});

export const resendEmailLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1,
  message: createRateLimitError(ERROR_MESSAGES.COMMON.RATE_LIMIT_EXCEEDED),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req: AuthRequest) => req.params.userName || 'unknown',
});

export const changePasswordInitiateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  keyGenerator: (req: AuthRequest) => req.userId || 'unknown',
  message: createRateLimitError('Too many password change requests. Please try again after 1 hour.'),
  standardHeaders: false,
  legacyHeaders: false,
});

export const changePasswordVerifyLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  keyGenerator: (req: AuthRequest) => req.userId || 'unknown',
  message: createRateLimitError('Too many verification attempts. Please try again after 10 minutes.'),
  standardHeaders: false,
  legacyHeaders: false,
});

export const changePasswordSetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  keyGenerator: (req: AuthRequest) => req.userId || 'unknown',
  message: createRateLimitError('Too many password set attempts. Please try again after 1 hour.'),
  standardHeaders: false,
  legacyHeaders: false,
});

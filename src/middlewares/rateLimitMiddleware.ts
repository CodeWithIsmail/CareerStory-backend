import { rateLimit } from 'express-rate-limit';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { AuthRequest } from './authenticationMiddleware.ts';

const createRateLimitError = (message: string) => ({
  success: false,
  statusCode: 429,
  message: message,
});

export const resendEmailLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1,
  message: createRateLimitError(ERROR_MESSAGES.COMMON.RATE_LIMIT_EXCEEDED),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req: AuthRequest) => req.params.userName || 'unknown',
});

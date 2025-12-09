import { rateLimit } from 'express-rate-limit';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';

export const resendEmailLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1,
  message: ERROR_MESSAGES.COMMON.RATE_LIMIT_EXCEEDED,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req) => req.params.userName || 'unknown',
});

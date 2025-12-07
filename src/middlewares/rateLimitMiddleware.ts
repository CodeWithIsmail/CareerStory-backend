import { rateLimit } from 'express-rate-limit';

export const resendEmailLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 2,
  message: {
    message: 'Too many resend attempts, please try few moments later.',
  },

  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req) => req.params.userName || 'unknown',
});

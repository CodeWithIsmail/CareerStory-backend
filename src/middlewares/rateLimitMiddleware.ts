import { rateLimit } from 'express-rate-limit';

export const resendEmailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    message: 'Too many resend attempts, please try few moments later.',
  },

  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req) => req.body.username || req.body.email || req.body.userId || req.ip,
});

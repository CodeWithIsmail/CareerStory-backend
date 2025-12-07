import z from 'zod';
import {
  authResponseSchema,
  createAuthSchema,
  loginSchema,
  signupSchema,
  tokenPayloadSchema,
} from '../validators/authValidator.ts';

export type SignupDto = z.infer<typeof signupSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type TokenPayloadDto = z.infer<typeof tokenPayloadSchema>;
export type AuthResponseDto = z.infer<typeof authResponseSchema>;
export type CreateAuthDto = z.infer<typeof createAuthSchema>;

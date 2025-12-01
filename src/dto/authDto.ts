import z from 'zod';
import { AuthValidator } from '../validators/authValidator.ts';

export type SignupDto = z.infer<typeof AuthValidator.signupSchema>;
export type LoginDto = z.infer<typeof AuthValidator.loginSchema>;
export type TokenPayload = z.infer<typeof AuthValidator.tokenPayloadSchema>;
export type AuthResponse = z.infer<typeof AuthValidator.authResponseSchema>;

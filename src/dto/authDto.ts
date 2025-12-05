import z from 'zod';
import { AuthValidator } from '../validators/authValidator.ts';

export type SignupDto = z.infer<typeof AuthValidator.signupSchema>;
export type LoginDto = z.infer<typeof AuthValidator.loginSchema>;
export type TokenPayloadDto = z.infer<typeof AuthValidator.tokenPayloadSchema>;
export type AuthResponseDto = z.infer<typeof AuthValidator.authResponseSchema>;
export type CreateAuthDto = z.infer<typeof AuthValidator.createAuthSchema>;
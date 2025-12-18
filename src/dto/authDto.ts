import z from 'zod';
import {
  authResponseSchema,
  createAuthSchema,
  loginSchema,
  signupSchema,
  tokenPayloadSchema,
  changePasswordInitiationSchema,
  verifyPasswordChangeCodeSchema,
  setNewPasswordSchema,
  changePasswordResponseSchema,
} from '../validators/authValidator.ts';

export type SignupDto = z.infer<typeof signupSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type TokenPayloadDto = z.infer<typeof tokenPayloadSchema>;
export type AuthResponseDto = z.infer<typeof authResponseSchema>;
export type CreateAuthDto = z.infer<typeof createAuthSchema>;

// export type ChangePasswordInitiationDto = z.infer<typeof changePasswordInitiationSchema>;
// export type VerifyPasswordChangeCodeDto = z.infer<typeof verifyPasswordChangeCodeSchema>;
// export type SetNewPasswordDto = z.infer<typeof setNewPasswordSchema>;
// export type ChangePasswordResponseDto = z.infer<typeof changePasswordResponseSchema>;

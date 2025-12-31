import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { basePasswordSchema } from './baseSchema.ts';
import { UserRole } from '../types/customTypes.ts';
import { TOKEN_TYPE } from '../types/customTypes.ts';
import { baseUserSchema } from './baseSchema.ts';

export const signupSchema = baseUserSchema
  .pick({ userName: true, email: true, name: true })
  .extend({
    password: basePasswordSchema,
    confirmPassword: basePasswordSchema,
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORD.MISMATCH,
    path: ['confirmPassword'],
  });

// export const loginSchema = signupSchema.pick({ userName: true, password: true }).strict();

export const loginSchema = z
  .object({
    userName: z.string().nonempty(VALIDATION_MESSAGES.USER.USERNAME.REQUIRED),
    password: z.string().nonempty(VALIDATION_MESSAGES.PASSWORD.REQUIRED),
  })
  .strict();

export const emailResendSchema = z.string().min(3, VALIDATION_MESSAGES.USER.USERNAME.MIN);

export const tokenPayloadSchema = z
  .object({
    userId: z.uuidv4(),
    role: z.enum(UserRole),
    tokenType: z.enum(TOKEN_TYPE),
  })
  .strict();

export const tokenParamSchema = z.jwt(VALIDATION_MESSAGES.AUTH.TOKEN.INVALID);

export const authResponseSchema = z
  .object({
    accessToken: z.string(),
    expiresIn: z.number(),
    user: tokenPayloadSchema.omit({ tokenType: true }),
  })
  .strip();

export const createAuthSchema = z
  .object({
    userId: z.uuidv4(),
    hashedPassword: z.string(),
  })
  .strict();

export const changePasswordInitiationSchema = z
  .object({
    currentPassword: basePasswordSchema,
  })
  .strict();

export const verifyPasswordChangeCodeSchema = z
  .object({
    code: z.string().length(6, VALIDATION_MESSAGES.AUTH.CHANGE_PASSWORD.CODE_REQUIRED),
  })
  .strict();

export const setNewPasswordSchema = signupSchema
  .pick({ password: true, confirmPassword: true })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORD.MISMATCH,
    path: ['confirmPassword'],
  });

export const changePasswordResponseSchema = z
  .object({
    message: z.string(),
    timestamp: z.date(),
  })
  .strip();

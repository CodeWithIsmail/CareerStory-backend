import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { TOKEN_TYPE, UserRole } from '../types/customTypes.ts';
import { basePasswordSchema, baseUserSchema } from './baseSchema.ts';

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

export const loginSchema = z
  .object({
    userName: z.string().nonempty(VALIDATION_MESSAGES.USER.USERNAME.REQUIRED),
    password: z.string().nonempty(VALIDATION_MESSAGES.PASSWORD.REQUIRED),
  })
  .strict();

export const emailResendSchema = z.string().min(3, VALIDATION_MESSAGES.USER.USERNAME.MIN);

export const changePasswordSchema = z
  .object({
    currentPassword: basePasswordSchema,
    newPassword: basePasswordSchema,
    confirmPassword: z
      .string({ message: VALIDATION_MESSAGES.PASSWORD.REQUIRED })
      .nonempty(VALIDATION_MESSAGES.PASSWORD.REQUIRED),
  })
  .strict()
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: VALIDATION_MESSAGES.PASSWORD.SAME_AS_CURRENT,
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORD.MISMATCH,
    path: ['confirmPassword'],
  });

export const tokenPayloadSchema = z
  .object({
    userId: z.number().int().positive(),
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
    userId: z.number().int().positive(),
    hashedPassword: z.string(),
  })
  .strict();

export const changePasswordResponseSchema = z
  .object({
    message: z.string(),
    timestamp: z.date(),
  })
  .strip();

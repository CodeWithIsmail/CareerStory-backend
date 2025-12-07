import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { basePasswordSchema, baseUserSchema } from './baseSchema.ts';
import { UserRole } from '../entities/User.ts';
import { TOKEN_TYPE } from '../types/customTypes.ts';

export const signupSchema = baseUserSchema
  .extend({
    password: basePasswordSchema,
    confirmPassword: basePasswordSchema,
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORD.MISMATCH,
    path: ['confirmPassword'],
  });

export const loginSchema = signupSchema.pick({ userName: true, password: true }).strict();

export const emailResendSchema = z.string().min(3, VALIDATION_MESSAGES.USER.EMAIL.REQUIRED);

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

import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { baseUserSchema } from './baseSchema.ts';
import { UserRole } from '../types/customTypes.ts';

export const createUserSchema = baseUserSchema
  .pick({
    userName: true,
    email: true,
    name: true,
  })
  .strict();

export const updateUserProfileSchema = baseUserSchema
  .pick({
    name: true,
    bio: true,
    organization: true,
    linkedInUrl: true,
    githubUrl: true,
    portfolioUrl: true,
  })
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD,
  });

export const userProfileSchema = baseUserSchema.omit({ deletedAt: true }).strip();

export const updateUserStatusSchema = baseUserSchema
  .pick({
    isEmailVerified: true,
    role: true,
  })
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD,
  });

export const updateUserRoleSchema = z
  .object({
    role: z.enum(UserRole, { message: VALIDATION_MESSAGES.USER.ROLE.INVALID }),
  })
  .strict();

export const userParamSchema = z.uuidv4(VALIDATION_MESSAGES.USER.USER_ID.INVALID);

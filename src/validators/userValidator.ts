import { z } from 'zod';
import { UserRole } from '../entities/User.ts';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { baseUserSchema } from './baseSchema.ts';

export const createUserSchema = baseUserSchema
  .extend({
    role: z.enum(UserRole, { message: VALIDATION_MESSAGES.USER.ROLE.INVALID }).default(UserRole.USER),
    isEmailVerified: z.boolean().default(false),
  })
  .strict();

export const updateUserSchema = baseUserSchema.pick({ name: true }).strict();

export const updateUserRoleSchema = z
  .object({
    role: z.enum(UserRole, { message: VALIDATION_MESSAGES.USER.ROLE.INVALID }),
  })
  .strict();

export const userResponseSchema = createUserSchema
  .extend({
    userId: z.uuidv4(),
    joinDate: z.date(),
  })
  .strip();

export const userParamSchema = z.uuidv4(VALIDATION_MESSAGES.USER.USER_ID.INVALID);

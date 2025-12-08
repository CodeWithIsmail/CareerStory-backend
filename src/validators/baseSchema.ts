import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { ca } from 'zod/locales';

export const baseUserSchema = z.object({
  userName: z
    .string({ message: VALIDATION_MESSAGES.USER.USERNAME.REQUIRED })
    .regex(/^[a-z0-9_]+$/, VALIDATION_MESSAGES.USER.USERNAME.INVALID)
    .min(3, VALIDATION_MESSAGES.USER.USERNAME.MIN)
    .max(50, VALIDATION_MESSAGES.USER.USERNAME.MAX)
    .transform((userName) => userName.toLowerCase()) as z.ZodType<string>,

  email: z
    .email({ message: VALIDATION_MESSAGES.USER.EMAIL.INVALID })
    .trim()
    .max(255, VALIDATION_MESSAGES.USER.EMAIL.MAX)
    .transform((email) => email.toLowerCase()) as z.ZodType<string>,

  name: z
    .string({ message: VALIDATION_MESSAGES.USER.NAME.REQUIRED })
    .trim()
    .min(3, VALIDATION_MESSAGES.USER.NAME.MIN)
    .max(100, VALIDATION_MESSAGES.USER.NAME.MAX),
});

export const basePasswordSchema = z
  .string({ message: VALIDATION_MESSAGES.PASSWORD.REQUIRED })
  .trim()
  .min(6, VALIDATION_MESSAGES.PASSWORD.MIN)
  .max(128, VALIDATION_MESSAGES.PASSWORD.MAX)
  .regex(/[a-z]/, VALIDATION_MESSAGES.PASSWORD.LOWERCASE)
  .regex(/[A-Z]/, VALIDATION_MESSAGES.PASSWORD.UPPERCASE)
  .regex(/[0-9]/, VALIDATION_MESSAGES.PASSWORD.NUMBER)
  .regex(/[^A-Za-z0-9]/, VALIDATION_MESSAGES.PASSWORD.SPECIAL);

export const baseStorySchema = z.object({
  title: z
    .string({ message: VALIDATION_MESSAGES.STORY.TITLE.REQUIRED })
    .trim()
    .min(5, VALIDATION_MESSAGES.STORY.TITLE.MIN)
    .max(255, VALIDATION_MESSAGES.STORY.TITLE.MAX),
  body: z
    .string({ message: VALIDATION_MESSAGES.STORY.BODY.REQUIRED })
    .trim()
    .min(10, VALIDATION_MESSAGES.STORY.BODY.MIN)
    .max(5000, VALIDATION_MESSAGES.STORY.BODY.MAX),
  categoryIds: z.array(z.uuid(VALIDATION_MESSAGES.CATEGORY.INVALID)).default([]),
});

export const basePaginationSchema = z.object({
  find: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  itemsPerPage: z.coerce.number().int().min(1).max(100).default(20),
  sortDirection: z
    .enum(['ASC', 'DESC'], { message: VALIDATION_MESSAGES.SORT_DIRECTION.INVALID })
    .default('ASC'),
});

export const baseCategorySchema = z.object({
  name: z
    .string({ message: VALIDATION_MESSAGES.CATEGORY.NAME.REQUIRED })
    .min(1, VALIDATION_MESSAGES.CATEGORY.NAME.REQUIRED)
    .max(50, VALIDATION_MESSAGES.CATEGORY.NAME.MAX),
  description: z.string().max(255, VALIDATION_MESSAGES.CATEGORY.DESCRIPTION.MAX).optional().nullable(),
});

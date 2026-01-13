import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { UserRole } from '../types/customTypes.ts';

export const baseUrlSchema = z
  .url({ message: VALIDATION_MESSAGES.URL.INVALID })
  .trim()
  .max(255, VALIDATION_MESSAGES.URL.MAX);

export const baseUserSchema = z.object({
  userId: z.uuidv4(VALIDATION_MESSAGES.USER.USER_ID.INVALID),
  userName: z
    .string()
    .nonempty(VALIDATION_MESSAGES.USER.USERNAME.REQUIRED)
    .min(3, VALIDATION_MESSAGES.USER.USERNAME.MIN)
    .max(50, VALIDATION_MESSAGES.USER.USERNAME.MAX)
    .regex(/^[a-z0-9_]+$/, VALIDATION_MESSAGES.USER.USERNAME.INVALID),

  email: z
    .string()
    .nonempty(VALIDATION_MESSAGES.USER.EMAIL.REQUIRED)
    .email({ message: VALIDATION_MESSAGES.USER.EMAIL.INVALID })
    .trim()
    .max(255, VALIDATION_MESSAGES.USER.EMAIL.MAX)
    .transform((email) => email.toLowerCase()) as z.ZodType<string>,

  name: z
    .string()
    .trim()
    .nonempty(VALIDATION_MESSAGES.USER.NAME.REQUIRED)
    .min(3, VALIDATION_MESSAGES.USER.NAME.MIN)
    .max(100, VALIDATION_MESSAGES.USER.NAME.MAX),

  bio: z.string().trim().max(1000).nullable().optional(),

  organization: z.string().trim().max(255).nullable().optional(),

  linkedInUrl: baseUrlSchema.nullable().optional(),

  githubUrl: baseUrlSchema.nullable().optional(),

  portfolioUrl: baseUrlSchema.nullable().optional(),

  isEmailVerified: z.boolean().default(false),

  role: z.enum(UserRole, { message: VALIDATION_MESSAGES.USER.ROLE.INVALID }).default(UserRole.USER),

  joinDate: z.date(),

  updatedAt: z.date(),

  deletedAt: z.date().nullable().optional(),
});

export const basePasswordSchema = z
  .string({ message: VALIDATION_MESSAGES.PASSWORD.REQUIRED })
  .trim()
  .nonempty(VALIDATION_MESSAGES.PASSWORD.REQUIRED)
  .min(6, VALIDATION_MESSAGES.PASSWORD.MIN)
  .max(128, VALIDATION_MESSAGES.PASSWORD.MAX)
  .regex(/[a-z]/, VALIDATION_MESSAGES.PASSWORD.LOWERCASE)
  .regex(/[A-Z]/, VALIDATION_MESSAGES.PASSWORD.UPPERCASE)
  .regex(/[0-9]/, VALIDATION_MESSAGES.PASSWORD.NUMBER)
  .regex(/[^A-Za-z0-9]/, VALIDATION_MESSAGES.PASSWORD.SPECIAL);

export const baseStorySchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty(VALIDATION_MESSAGES.STORY.TITLE.REQUIRED)
    .min(5, VALIDATION_MESSAGES.STORY.TITLE.MIN)
    .max(255, VALIDATION_MESSAGES.STORY.TITLE.MAX),
  body: z
    .string()
    .trim()
    .nonempty(VALIDATION_MESSAGES.STORY.BODY.REQUIRED)
    .min(10, VALIDATION_MESSAGES.STORY.BODY.MIN)
    .max(5000, VALIDATION_MESSAGES.STORY.BODY.MAX),
  categoryIds: z.array(z.uuid(VALIDATION_MESSAGES.CATEGORY.INVALID)),
});

export const basePaginationSchema = z.object({
  find: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  itemsPerPage: z.coerce.number().int().min(1).max(100).default(10),
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

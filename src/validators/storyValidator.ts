import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { baseStorySchema } from './baseSchema.ts';
import { categoryResponseSchema } from './categoryValidator.ts';
import { userProfileSchema } from './userValidator.ts';

export const createStorySchema = baseStorySchema
  .extend({
    categoryIds: baseStorySchema.shape.categoryIds.default([]),
    generateSummary: z.boolean({ message: VALIDATION_MESSAGES.STORY.SUMMARY.REQUIRED }),
  })
  .strict();

export const updateStorySchema = baseStorySchema
  .extend({
    generateSummary: z.boolean(),
  })
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD,
  });

export const storyResponseSchema = baseStorySchema
  .omit({ categoryIds: true })
  .extend({
    storyId: z.number().int().positive(),
    createdAt: z.date(),
    updatedAt: z.date(),
    summary: z.string().nullable().optional(),
    categories: categoryResponseSchema
      .pick({ categoryId: true, name: true, description: true })
      .array()
      .default([]),
    user: userProfileSchema
      .pick({ userId: true, userName: true, name: true, organization: true })
      .strip()
      .nullable()
      .optional(),
  })
  .strip();

export const storyParamSchema = z.coerce.number().int().positive(VALIDATION_MESSAGES.STORY.STORY_ID.INVALID);

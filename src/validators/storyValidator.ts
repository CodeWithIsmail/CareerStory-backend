import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { baseStorySchema } from './baseSchema.ts';
import { userResponseSchema } from './userValidator.ts';

export const createStorySchema = baseStorySchema.strict();

export const updateStorySchema = createStorySchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD,
  });

export const storyResponseSchema = baseStorySchema
  .extend({
    storyId: z.uuidv4(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: userResponseSchema.pick({ userId: true, userName: true, name: true }).nullable().optional(),
  })
  .strip();

export const storyParamSchema = z.uuidv4(VALIDATION_MESSAGES.STORY.STORY_ID.INVALID);

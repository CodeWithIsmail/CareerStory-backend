import { z } from 'zod';
import { baseCategorySchema } from './baseSchema.ts';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';

export const createCategorySchema = baseCategorySchema.strict();

export const updateCategorySchema = baseCategorySchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD,
  });

export const categoryResponseSchema = baseCategorySchema
  .extend({
    categoryId: z.number().int().positive(),
    createdAt: z.date(),
  })
  .strip();

export const categoryParamSchema = z.coerce
  .number(VALIDATION_MESSAGES.CATEGORY.INVALID)
  .int(VALIDATION_MESSAGES.CATEGORY.INVALID)
  .positive(VALIDATION_MESSAGES.CATEGORY.INVALID);

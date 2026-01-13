import {
  categoryResponseSchema,
  createCategorySchema,
  updateCategorySchema,
} from '../validators/categoryValidator.ts';
import { z } from 'zod';

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
export type CategoryResponseDto = z.infer<typeof categoryResponseSchema>;

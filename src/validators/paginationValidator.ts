import { z } from 'zod';
import { userOrderByOptions, storyOrderByOptions } from '../constants/paginationFields.ts';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
export const basePaginationSchema = z.object({
  find: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  itemsPerPage: z.coerce.number().int().min(1).max(100).default(20),
  sortDirection: z
    .enum(['ASC', 'DESC'], { message: VALIDATION_MESSAGES.SORT_DIRECTION.INVALID })
    .default('ASC'),
});

export class PaginationValidator {
  static userPaginationSchema = basePaginationSchema
    .extend({
      orderBy: z.enum(userOrderByOptions).default('userName'),
    })
    .strict();

  static storyPaginationSchema = basePaginationSchema
    .extend({
      orderBy: z.enum(storyOrderByOptions).default('title'),
    })
    .strict();

  static validateUserPagination(data: unknown) {
    return this.userPaginationSchema.parse(data);
  }

  static validateStoryPagination(data: unknown) {
    return this.storyPaginationSchema.parse(data);
  }
}

export type UserPaginationQuery = z.infer<typeof PaginationValidator.userPaginationSchema>;
export type StoryPaginationQuery = z.infer<typeof PaginationValidator.storyPaginationSchema>;

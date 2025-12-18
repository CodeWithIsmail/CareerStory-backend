import { z } from 'zod';
import { userOrderByOptions, storyOrderByOptions } from '../constants/paginationFields.ts';
import { basePaginationSchema } from './baseSchema.ts';
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

import { z } from 'zod';

export const basePaginationSchema = z.object({
  find: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  itemsPerPage: z.coerce.number().int().min(1).max(100).default(20),
  sortDirection: z
    .enum(['asc', 'desc', 'ASC', 'DESC'])
    .transform((val) => val.toUpperCase())
    .default('ASC'),
});

export class PaginationValidator {
  static userFields = ['userId', 'userName', 'name', 'email', 'createdAt', 'updatedAt'];
  static storyFields = ['storyId', 'userId', 'title', 'body', 'createdAt', 'updatedAt'];

  static userPaginationSchema = basePaginationSchema
    .extend({
      orderBy: z.enum(PaginationValidator.userFields).default('userName'),
    })
    .strict();

  static storyPaginationSchema = basePaginationSchema
    .extend({
      orderBy: z.enum(PaginationValidator.storyFields).default('title'),
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

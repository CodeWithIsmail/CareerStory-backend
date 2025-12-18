import { z } from 'zod';
import { userOrderByOptions, storyOrderByOptions } from '../constants/paginationFields.ts';
import { basePaginationSchema } from './baseSchema.ts';

export const userPaginationSchema = basePaginationSchema
  .extend({
    orderBy: z.enum(userOrderByOptions).default('userName'),
  })
  .strict();

export const storyPaginationSchema = basePaginationSchema
  .extend({
    orderBy: z.enum(storyOrderByOptions).default('userId'),
  })
  .strict();

export type UserPaginationQuery = z.infer<typeof userPaginationSchema>;
export type StoryPaginationQuery = z.infer<typeof storyPaginationSchema>;

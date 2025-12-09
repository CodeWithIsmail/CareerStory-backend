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
    category: z.preprocess((val) => {
      if (val === undefined) return undefined;
      return Array.isArray(val) ? val : [val];
    }, z.array(z.string()).optional()),
    orderBy: z.enum(storyOrderByOptions).default('userId'),
  })
  .strict();

export type UserPaginationQuery = z.infer<typeof userPaginationSchema>;
export type StoryPaginationQuery = z.infer<typeof storyPaginationSchema>;

import { z } from 'zod';
import {
  createStorySchema,
  updateStorySchema,
  storyResponseSchema,
  voteStorySchema,
} from '../validators/storyValidator.ts';

export type CreateStoryDto = z.infer<typeof createStorySchema>;
export type UpdateStoryDto = z.infer<typeof updateStorySchema>;
export type StoryResponseDto = z.infer<typeof storyResponseSchema>;
export type VoteStoryDto = z.infer<typeof voteStorySchema>;

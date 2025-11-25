import { z } from 'zod';
import { StoryValidator } from '../validators/storyValidator.ts';

export type CreateStoryDto = z.infer<typeof StoryValidator.createStorySchema>;
export type UpdateStoryDto = z.infer<typeof StoryValidator.updateStorySchema>;

export class StoryResponseDto {
  storyId: string;
  userId: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

import { z } from 'zod';
import { StoryValidator } from '../validators/storyValidator.ts';
import { Expose } from 'class-transformer';

export type CreateStoryDto = z.infer<typeof StoryValidator.createStorySchema>;
export type UpdateStoryDto = z.infer<typeof StoryValidator.updateStorySchema>;

export class StoryResponseDto {
  @Expose()
  storyId: string;
  @Expose()
  userId: string;
  @Expose()
  title: string;
  @Expose()
  body: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

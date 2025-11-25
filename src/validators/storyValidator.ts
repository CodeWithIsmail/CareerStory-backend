import { z } from 'zod';
import { CreateStoryDto, UpdateStoryDto } from '../dto/storyDto.ts';

export class StoryValidator {
  static createStorySchema = z.object({
    userId: z.uuidv4('userId must be a valid UUID'),
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters')
      .max(255, 'Title must be at most 255 characters'),
    body: z.string().min(10, 'Body must be at least 10 characters'),
  });

  static updateStorySchema = z
    .object({
      title: z
        .string()
        .min(5, 'Title must be at least 5 characters')
        .max(255, 'Title must be at most 255 characters')
        .optional(),
      body: z.string().min(10, 'Body must be at least 10 characters').optional(),
    })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    });

  static validateCreateStory(data: unknown): CreateStoryDto {
    return this.createStorySchema.parse(data);
  }

  static validateUpdateStory(data: unknown): UpdateStoryDto {
    return this.updateStorySchema.parse(data);
  }

  static validateStoryIdParam(params: unknown): string {
    let storyId = z.uuidv4().parse(params);
    return storyId;
  }
}

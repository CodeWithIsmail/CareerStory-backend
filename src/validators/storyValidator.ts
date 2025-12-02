import { z } from 'zod';
import { CreateStoryDto, UpdateStoryDto } from '../dto/storyDto.ts';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';

export class StoryValidator {
  static StorySchema = z.object({
    userId: z.uuidv4(VALIDATION_MESSAGES.STORY.USER_ID.INVALID),
    title: z
      .string({ message: VALIDATION_MESSAGES.STORY.TITLE.REQUIRED })
      .trim()
      .min(5, VALIDATION_MESSAGES.STORY.TITLE.MIN)
      .max(255, VALIDATION_MESSAGES.STORY.TITLE.MAX),
    body: z
      .string({ message: VALIDATION_MESSAGES.STORY.BODY.REQUIRED })
      .trim()
      .min(10, VALIDATION_MESSAGES.STORY.BODY.MIN)
      .max(5000, VALIDATION_MESSAGES.STORY.BODY.MAX),
  });

  static createStorySchema = this.StorySchema.omit({ userId: true }).strict();

  static updateStorySchema = this.StorySchema.partial()
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
      message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD,
    });

  static validateCreateStory(data: unknown): CreateStoryDto {
    return this.createStorySchema.parse(data);
  }

  static validateStoryIdParam(params: unknown): string {
    return z.uuidv4().parse(params);
  }
}

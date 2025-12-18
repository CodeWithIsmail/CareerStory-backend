import { z } from 'zod';
import { CreateStoryDto } from '../dto/storyDto.ts';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { baseStorySchema } from './baseSchema.ts';

export class StoryValidator {
  static createStorySchema = baseStorySchema.strict();

  static updateStorySchema = baseStorySchema
    .partial()
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

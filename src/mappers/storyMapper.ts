import { Story } from '../entities/Story.ts';
import { StoryResponseDto } from '../dto/storyDto.ts';
import { storyResponseSchema } from '../validators/storyValidator.ts';

export const mapStoryToDto = (story: Story): StoryResponseDto => storyResponseSchema.parse(story);

export const mapStoriesToDtoList = (stories: Story[]): StoryResponseDto[] =>
  stories.map((story) => mapStoryToDto(story));

import { Story } from '../entities/Story.ts';
import { StoryResponseDto } from '../dto/storyDto.ts';
import { plainToInstance } from 'class-transformer';

export const mapStoryToDto = (story: Story): StoryResponseDto =>
  plainToInstance(StoryResponseDto, story, { excludeExtraneousValues: true });

export const mapStoriesToDtoList = (stories: Story[]): StoryResponseDto[] =>
  plainToInstance(StoryResponseDto, stories, { excludeExtraneousValues: true });

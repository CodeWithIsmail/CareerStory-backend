import { Story } from '../entities/Story.ts';
import { StoryResponseDto } from '../dto/storyDto.ts';

export const mapStoryToDto = (story: Story): StoryResponseDto => ({
  storyId: story.storyId,
  userId: story.userId,
  title: story.title,
  body: story.body,
  createdAt: story.createdAt,
  updatedAt: story.updatedAt,
});

export const mapStoriesToDtoList = (stories: Story[]): StoryResponseDto[] => {
  return stories.map(mapStoryToDto);
};

import { Story } from '../entities/Story.ts';
import { StoryResponseDto } from '../dto/storyDto.ts';
import { storyResponseSchema } from '../validators/storyValidator.ts';
import { VoteType } from '../types/customTypes.ts';

export const mapStoryToDto = (story: Story): StoryResponseDto => {
  let userVote = null;
  if (story.userVote) {
    if (typeof story.userVote === 'object' && 'value' in story.userVote) {
      userVote = story.userVote.value === 1 ? VoteType.UP : VoteType.DOWN;
    }
  }

  const dtoData = {
    ...story,
    voteCount: story.voteCount || 0,
    userVote: userVote,
  };

  return storyResponseSchema.parse(dtoData);
};

export const mapStoriesToDtoList = (stories: Story[]): StoryResponseDto[] =>
  stories.map((story) => mapStoryToDto(story));

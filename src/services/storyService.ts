import { CreateStoryDto, UpdateStoryDto, StoryResponseDto } from '../dto/storyDto.ts';
import { mapStoryToDto, mapStoriesToDtoList } from '../utils/storyMapper.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { UserRepository } from '../repositories/userRepository.ts';
import { StoryRepository } from '../repositories/storyRepository.ts';
import logger from '../utils/logger.ts';
import { LOG_MESSAGES } from '../constants/logMessages.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';

export class StoryService {
  private storyRepository = new StoryRepository();
  private userRepository = new UserRepository();

  async createStory(story: CreateStoryDto): Promise<StoryResponseDto> {
    logger.debug(LOG_MESSAGES.STORY.CREATE.START, { story });

    const user = await this.userRepository.getUserById(story.userId);
    if (!user) {
      logger.warn(LOG_MESSAGES.STORY.CREATE.USER_NOT_FOUND, { userId: story.userId });
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, 'creating story');
    }

    const newStory = await this.storyRepository.createStory(story);
    if (!newStory) {
      logger.error(LOG_MESSAGES.STORY.CREATE.FAILED, { story });
      throw ErrorFactory.createDatabaseError(
        ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR,
        'creating story',
      );
    }

    logger.info(LOG_MESSAGES.STORY.CREATE.SUCCESS, { storyId: newStory.storyId });
    return mapStoryToDto(newStory);
  }

  async getAllStories(): Promise<StoryResponseDto[]> {
    logger.debug(LOG_MESSAGES.STORY.FETCH.ALL_START);
    const stories = await this.storyRepository.getAllStories();
    logger.info(LOG_MESSAGES.STORY.FETCH.ALL_SUCCESS, { storyCount: stories.length });
    return mapStoriesToDtoList(stories);
  }

  async getStoryById(storyId: string): Promise<StoryResponseDto> {
    logger.debug(LOG_MESSAGES.STORY.FETCH.BY_ID_START, { storyId });
    const story = await this.storyRepository.getStoryById(storyId);

    if (!story) {
      logger.warn(LOG_MESSAGES.STORY.FETCH.BY_ID_NOT_FOUND, { storyId });
      throw ErrorFactory.createNotFoundError(
        ERROR_MESSAGES.STORY.NOT_FOUND,
        `fetching story ${storyId}`,
      );
    }

    logger.info(LOG_MESSAGES.STORY.FETCH.BY_ID_SUCCESS, { storyId });
    return mapStoryToDto(story);
  }

  async getStoriesByUserId(userId: string): Promise<StoryResponseDto[]> {
    logger.debug(LOG_MESSAGES.STORY.FETCH.BY_USER_START, { userId });
    const stories = await this.storyRepository.getStoriesByUserId(userId);
    logger.info(LOG_MESSAGES.STORY.FETCH.BY_USER_SUCCESS, { userId, storyCount: stories.length });
    return mapStoriesToDtoList(stories);
  }

  async updateStory(storyId: string, updateData: UpdateStoryDto): Promise<StoryResponseDto> {
    logger.debug(LOG_MESSAGES.STORY.UPDATE.START, { storyId, updateData });

    const updatedStory = await this.storyRepository.updateStory(storyId, updateData);
    if (!updatedStory) {
      logger.warn(LOG_MESSAGES.STORY.UPDATE.NOT_FOUND, { storyId });
      throw ErrorFactory.createNotFoundError(
        ERROR_MESSAGES.STORY.NOT_FOUND,
        `updating story ${storyId}`,
      );
    }

    logger.info(LOG_MESSAGES.STORY.UPDATE.SUCCESS, { storyId });
    return mapStoryToDto(updatedStory);
  }

  async deleteStory(storyId: string): Promise<void> {
    logger.debug(LOG_MESSAGES.STORY.DELETE.START, { storyId });
    const result = await this.storyRepository.deleteStory(storyId);

    if (result.affected === 0) {
      logger.warn(LOG_MESSAGES.STORY.DELETE.NOT_FOUND, { storyId });
      throw ErrorFactory.createNotFoundError(
        ERROR_MESSAGES.STORY.NOT_FOUND,
        `deleting story ${storyId}`,
      );
    }

    logger.info(LOG_MESSAGES.STORY.DELETE.SUCCESS, { storyId });
  }
}

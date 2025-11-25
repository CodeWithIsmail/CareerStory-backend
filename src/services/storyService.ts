import { StoryRepository } from '../repositories/storyRepository.ts';
import { CreateStoryDto, UpdateStoryDto, StoryResponseDto } from '../dto/storyDto.ts';
import { mapStoryToDto, mapStoriesToDtoList } from '../utils/storyMapper.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { UserRepository } from '../repositories/userRepository.ts';
import logger from '../utils/logger.ts';

export class StoryService {
  private storyRepository = new StoryRepository();
  private userRepository = new UserRepository();

  async createStory(story: CreateStoryDto): Promise<StoryResponseDto> {
    logger.debug('Creating a new story', { story });

    const user = await this.userRepository.getUserById(story.userId);
    if (!user) {
      logger.warn('User not found for story creation', { userId: story.userId });
      throw ErrorFactory.createNotFoundError('User not found', 'creating story');
    }

    const newStory = await this.storyRepository.createStory(story);
    if (!newStory) {
      logger.error('Failed to create story', { story });
      throw ErrorFactory.createDatabaseError('Failed to create story', 'creating story');
    }

    logger.info('Story created successfully', { storyId: newStory.storyId });
    return mapStoryToDto(newStory);
  }

  async getAllStories(): Promise<StoryResponseDto[]> {
    logger.debug('Fetching all stories');
    const stories = await this.storyRepository.getAllStories();
    logger.info('Stories fetched successfully', { storyCount: stories.length });
    return mapStoriesToDtoList(stories);
  }

  async getStoryById(storyId: string): Promise<StoryResponseDto> {
    logger.debug('Fetching story', { storyId });
    const story = await this.storyRepository.getStoryById(storyId);

    if (!story) {
      logger.warn('Story not found', { storyId });
      throw ErrorFactory.createNotFoundError('Story not found', `fetching story ${storyId}`);
    }

    logger.info('Story fetched successfully', { storyId });
    return mapStoryToDto(story);
  }

  async getStoriesByUserId(userId: string): Promise<StoryResponseDto[]> {
    logger.debug('Fetching stories by user', { userId });
    const stories = await this.storyRepository.getStoriesByUserId(userId);
    logger.info('User stories fetched successfully', { userId, storyCount: stories.length });
    return mapStoriesToDtoList(stories);
  }

  async updateStory(storyId: string, updateData: UpdateStoryDto): Promise<StoryResponseDto> {
    logger.debug('Updating story', { storyId, updateData });

    const updatedStory = await this.storyRepository.updateStory(storyId, updateData);
    if (!updatedStory) {
      logger.warn('Story not found for update', { storyId });
      throw ErrorFactory.createNotFoundError('Story not found', `updating story ${storyId}`);
    }

    logger.info('Story updated successfully', { storyId });
    return mapStoryToDto(updatedStory);
  }

  async deleteStory(storyId: string): Promise<void> {
    logger.debug('Deleting story', { storyId });
    const result = await this.storyRepository.deleteStory(storyId);

    if (result.affected === 0) {
      logger.warn('Story not found for deletion', { storyId });
      throw ErrorFactory.createNotFoundError('Story not found', `deleting story ${storyId}`);
    }

    logger.info('Story deleted successfully', { storyId });
  }
}

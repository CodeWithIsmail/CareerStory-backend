import { CreateStoryDto, UpdateStoryDto, StoryResponseDto } from '../dto/storyDto.ts';
import { mapStoryToDto, mapStoriesToDtoList } from '../mappers/storyMapper.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { StoryRepository } from '../repositories/storyRepository.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { StoryPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginatedResponse } from '../types/customTypes.ts';
import { UserService } from './userService.ts';
import { mapPaginatedResponse } from '../mappers/paginationMapper.ts';
import { Story } from '../entities/Story.ts';

export class StoryService {
  private storyRepository = new StoryRepository();
  private userService = new UserService();

  async createStory(story: CreateStoryDto): Promise<StoryResponseDto> {
    const newStory = await this.storyRepository.createStory(story);
    if (!newStory) {
      throw ErrorFactory.createDatabaseError(ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR, 'creating story');
    }
    console.log('New Story Created:', newStory);
    return mapStoryToDto(newStory);
  }

  async getStories(
    paginationParams: StoryPaginationQuery,
    userId?: string,
  ): Promise<PaginatedResponse<StoryResponseDto>> {
    let paginatedStories;
    if (userId) {
      await this.userService.getUserById(userId);
      paginatedStories = await this.storyRepository.getStories(paginationParams, userId);
    } else paginatedStories = await this.storyRepository.getStories(paginationParams);
    return mapPaginatedResponse(paginatedStories, mapStoriesToDtoList);
  }

  async getStoryById(storyId: string): Promise<StoryResponseDto> {
    const story = await this.storyRepository.getStoryById(storyId);
    if (!story) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, `fetching story ${storyId}`);
    }
    return mapStoryToDto(story);
  }

  async updateStory(storyId: string, updateData: UpdateStoryDto): Promise<StoryResponseDto> {
    const updatedStory = await this.storyRepository.updateStory(storyId, updateData);
    if (!updatedStory) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, `updating story ${storyId}`);
    }
    return mapStoryToDto(updatedStory);
  }

  async deleteStory(storyId: string): Promise<void> {
    const result = await this.storyRepository.deleteStory(storyId);
    if (result.affected === 0) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, `deleting story ${storyId}`);
    }
  }

  async storyAuthorUserId(storyId: string): Promise<string> {
    const story = await this.storyRepository.getStoryById(storyId);
    if (!story) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, `fetching story ${storyId}`);
    }
    return story.userId;
  }

  // async getAllStories(paginationParams: StoryPaginationQuery): Promise<PaginatedResponse<StoryResponseDto>> {
  //   const paginatedStories = await this.storyRepository.getStories(paginationParams);
  //   return mapPaginatedResponse<Story, StoryResponseDto>(paginatedStories, mapStoriesToDtoList);
  // }

  // async getStoriesByUserId(
  //   userId: string,
  //   paginationParams: StoryPaginationQuery,
  // ): Promise<PaginatedResponse<StoryResponseDto>> {
  //   await this.userService.getUserById(userId);
  //   const paginatedStories = await this.storyRepository.getStories(paginationParams, userId);
  //   return mapPaginatedResponse<Story, StoryResponseDto>(paginatedStories, mapStoriesToDtoList);
  // }
}

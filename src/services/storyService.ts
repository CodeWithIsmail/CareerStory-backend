import { CreateStoryDto, UpdateStoryDto, StoryResponseDto } from '../dto/storyDto.ts';
import { mapStoryToDto, mapStoriesToDtoList } from '../mappers/storyMapper.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { StoryRepository } from '../repositories/storyRepository.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { StoryPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginatedResponse, StoryOrNull } from '../types/customTypes.ts';
import { UserService } from './userService.ts';
import { mapPaginatedResponse } from '../mappers/paginationMapper.ts';
import { CONTEXT } from '../constants/context.ts';
import { CategoryService } from './categoryService.ts';
import { Category } from '../entities/Category.ts';
export class StoryService {
  private storyRepository = new StoryRepository();
  private userService = new UserService();
  private categoryService = new CategoryService();

  async createStory(story: CreateStoryDto): Promise<StoryResponseDto> {
    let categories: Category[] = [];
    if (story.categoryIds.length > 0) {
      categories = await this.categoryService.getCategoriesByIds(story.categoryIds);
      const validCategoryIds = categories.map((category) => category.categoryId);
      const invalidCategoryIds = story.categoryIds.filter(
        (categoryId) => !validCategoryIds.includes(categoryId),
      );
      if (invalidCategoryIds.length > 0) {
        throw ErrorFactory.createNotFoundError(
          `${ERROR_MESSAGES.CATEGORY.FETCH}: Invalid category IDs - ${invalidCategoryIds.join(', ')}`,
          CONTEXT.STORY.CREATE,
        );
      }
    }

    const newStory = await this.storyRepository.createStory(story, categories);
    if (!newStory) {
      throw ErrorFactory.createDatabaseError(
        ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR,
        CONTEXT.STORY.CREATE,
      );
    }
    return mapStoryToDto(newStory);
  }

  async getStories(
    paginationParams: StoryPaginationQuery,
    userId?: string,
  ): Promise<PaginatedResponse<StoryResponseDto>> {
    let paginatedStories;
    if (userId) {
      await this.userService.getUserById(userId);
    }

    paginatedStories = await this.storyRepository.getStories(
      paginationParams,
      userId,
      paginationParams.category,
    );
    return mapPaginatedResponse(paginatedStories, mapStoriesToDtoList);
  }

  async getStoryById(storyId: string): Promise<StoryResponseDto> {
    const story = await this.storyRepository.getStoryById(storyId);
    if (!story) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.FETCH);
    }
    return mapStoryToDto(story);
  }

  async updateStory(storyId: string, updateData: UpdateStoryDto): Promise<StoryResponseDto> {
    const story = await this.storyRepository.getStoryById(storyId);
    if (!story) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.UPDATE);
    }
    let updatedStory: StoryOrNull;

    if (updateData.categoryIds !== undefined) {
      const categories = await this.categoryService.getCategoriesByIds(updateData.categoryIds);
      const validCategoryIds = categories.map((category) => category.categoryId);
      const invalidCategoryIds = updateData.categoryIds.filter(
        (categoryId) => !validCategoryIds.includes(categoryId),
      );
      if (invalidCategoryIds.length > 0) {
        throw ErrorFactory.createNotFoundError(
          `${ERROR_MESSAGES.CATEGORY.FETCH}: Invalid category IDs - ${invalidCategoryIds.join(', ')}`,
          CONTEXT.STORY.UPDATE,
        );
      }
      updatedStory = await this.storyRepository.updateStory(storyId, updateData, categories);
    } else updatedStory = await this.storyRepository.updateStory(storyId, updateData);

    if (!updatedStory) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.UPDATE);
    }
    return mapStoryToDto(updatedStory);
  }

  async deleteStory(storyId: string): Promise<void> {
    const result = await this.storyRepository.deleteStory(storyId);
    if (result.affected === 0) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.DELETE);
    }
  }

  async storyAuthorUserId(storyId: string): Promise<string> {
    const story = await this.storyRepository.getStoryById(storyId);
    if (!story) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.FETCH);
    }
    return story.userId;
  }
}

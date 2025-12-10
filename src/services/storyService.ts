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
import { AIService } from './aiService.ts';
export class StoryService {
  private storyRepository = new StoryRepository();
  private userService = new UserService();
  private categoryService = new CategoryService();
  private aiService = new AIService();

  async createStory(story: CreateStoryDto): Promise<StoryResponseDto> {
    let categories: Category[] = [];
    if (story.categoryIds.length > 0) {
      categories = await this.validateAndFetchCategories(story.categoryIds, CONTEXT.STORY.CREATE);
    }

    let summary: string | null = null;
    if (story.generateSummary) {
      summary = await this.aiService.generateStorySummary(story.title, story.body);
    }
    const newStoryData = { ...story, summary };

    const newStory = await this.storyRepository.createStory(newStoryData, categories);
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
    const story = await this.getStoryById(storyId);
    let updatedStory: StoryOrNull;
    const { generateSummary, ...newUpdateData } = updateData;
    if (generateSummary) {
      const summary = await this.aiService.generateStorySummary(
        updateData.title || story.title,
        updateData.body || story.body,
      );
      newUpdateData['summary'] = summary;
    }

    if (updateData.categoryIds !== undefined) {
      const categories = await this.validateAndFetchCategories(updateData.categoryIds, CONTEXT.STORY.UPDATE);
      updatedStory = await this.storyRepository.updateStory(storyId, newUpdateData, categories);
    } else updatedStory = await this.storyRepository.updateStory(storyId, newUpdateData);

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

  async storyAuthorUserId(storyId: string): Promise<string | null> {
    const story = await this.getStoryById(storyId);
    return story.user?.userId;
  }

  async validateAndFetchCategories(categoryIds: string[], context: string): Promise<Category[]> {
    const categories = await this.categoryService.getCategoriesByIds(categoryIds);
    const validCategoryIds = categories.map((category) => category.categoryId);
    const invalidCategoryIds = categoryIds.filter((categoryId) => !validCategoryIds.includes(categoryId));
    if (invalidCategoryIds.length > 0) {
      throw ErrorFactory.createNotFoundError(
        `${ERROR_MESSAGES.CATEGORY.FETCH}: Invalid category IDs - ${invalidCategoryIds.join(', ')}`,
        context,
      );
    }
    return categories;
  }
}

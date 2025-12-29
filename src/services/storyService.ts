import { CreateStoryDto, UpdateStoryDto, StoryResponseDto, VoteStoryDto } from '../dto/storyDto.ts';
import { mapStoryToDto, mapStoriesToDtoList } from '../mappers/storyMapper.ts';
import { StoryRepository } from '../repositories/storyRepository.ts';
import { VoteRepository } from '../repositories/voteRepository.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { StoryPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginatedResponse } from '../types/customTypes.ts';
import { UserService } from './userService.ts';
import { mapPaginatedResponse } from '../mappers/paginationMapper.ts';
import { CONTEXT } from '../constants/context.ts';
import { CategoryService } from './categoryService.ts';
import { Category } from '../entities/Category.ts';
import { AIService } from './aiService.ts';
import { DatabaseError, NotFoundError } from '../errors/CustomErrors.ts';

export class StoryService {
  private storyRepository = new StoryRepository();
  private voteRepository = new VoteRepository();
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
      throw new DatabaseError(ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR, CONTEXT.STORY.CREATE);
    }
    return mapStoryToDto(newStory);
  }

  async voteStory(storyId: string, userId: string, voteData: VoteStoryDto): Promise<void> {
    const story = await this.storyRepository.getStoryById(storyId, userId);
    if (!story) {
      throw new NotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.FETCH);
    }
    await this.voteRepository.handleVote(userId, storyId, voteData);
  }

  async getStories(
    paginationParams: StoryPaginationQuery,
    currentUserId: string,
    userId?: string,
  ): Promise<PaginatedResponse<StoryResponseDto>> {
    if (userId) {
      await this.userService.getUserById(userId);
    }

    const paginatedStories = await this.storyRepository.getStories(
      paginationParams,
      currentUserId,
      userId,
      paginationParams.category,
    );
    return mapPaginatedResponse(paginatedStories, mapStoriesToDtoList);
  }

  async getStoryById(storyId: string, currentUserId: string): Promise<StoryResponseDto> {
    const story = await this.storyRepository.getStoryById(storyId, currentUserId);
    if (!story) {
      throw new NotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.FETCH);
    }
    return mapStoryToDto(story);
  }

  async updateStory(
    storyId: string,
    updateData: UpdateStoryDto,
    currentUserId: string,
  ): Promise<StoryResponseDto> {
    const story = await this.storyRepository.getStoryById(storyId, '');
    if (!story) {
      throw new NotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.FETCH);
    }

    let updatedStory;
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
      updatedStory = await this.storyRepository.updateStory(
        storyId,
        newUpdateData,
        currentUserId,
        categories,
      );
    } else {
      updatedStory = await this.storyRepository.updateStory(storyId, newUpdateData, currentUserId);
    }

    if (!updatedStory) {
      throw new NotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.UPDATE);
    }
    return mapStoryToDto(updatedStory);
  }

  async deleteStory(storyId: string): Promise<void> {
    const result = await this.storyRepository.deleteStory(storyId);
    if (result.affected === 0) {
      throw new NotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.DELETE);
    }
  }

  async storyAuthorUserId(storyId: string): Promise<string | null> {
    const story = await this.storyRepository.getStoryById(storyId, '');
    return story?.user?.userId || null;
  }

  async validateAndFetchCategories(categoryIds: string[], context: string): Promise<Category[]> {
    const categories = await this.categoryService.getCategoriesByIds(categoryIds);
    const validCategoryIds = categories.map((category) => category.categoryId);
    const invalidCategoryIds = categoryIds.filter((categoryId) => !validCategoryIds.includes(categoryId));
    if (invalidCategoryIds.length > 0) {
      throw new NotFoundError(
        `${ERROR_MESSAGES.CATEGORY.FETCH}: Invalid category IDs - ${invalidCategoryIds.join(', ')}`,
        context,
      );
    }
    return categories;
  }
}

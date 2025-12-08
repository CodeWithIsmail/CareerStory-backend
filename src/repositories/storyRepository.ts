import { DeleteResult, In, IsNull } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { Story } from '../entities/Story.ts';
import { CreateStoryDto, UpdateStoryDto } from '../dto/storyDto.ts';
import { PaginatedResponse, StoryOrNull } from '../types/customTypes.ts';
import { StoryPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginationHelper } from '../utils/paginationUtils.ts';
import { storyFindOptions } from '../constants/paginationFields.ts';
import { mapPaginationConfig } from '../mappers/paginationMapper.ts';
import { Category } from '../entities/Category.ts';

export class StoryRepository {
  private storyRepository = AppDataSource.getRepository(Story);
  private categoryRepository = AppDataSource.getRepository(Category);

  async createStory(storyData: CreateStoryDto): Promise<Story> {
    const { categoryIds, ...restStoryData } = storyData;

    const newStory = this.storyRepository.create(storyData);
    const savedStory = await this.storyRepository.save(newStory);

    if (categoryIds && categoryIds.length > 0) {
      const categories = await this.categoryRepository.find({ where: { categoryId: In(categoryIds) } });
      savedStory.categories = categories;
      await this.storyRepository.save(savedStory);
    }
    return savedStory;
  }

  async getStories(
    paginationParams: StoryPaginationQuery,
    userId?: string,
    categoryName?: string[],
  ): Promise<PaginatedResponse<Story>> {
    const query = this.storyRepository
      .createQueryBuilder('stories')
      .leftJoinAndSelect('stories.user', 'users')
      .leftJoinAndSelect('stories.categories', 'categories');

    if (userId) {
      query.andWhere('stories.userId = :userId', { userId });
    }
    if (categoryName && categoryName.length > 0) {
      query.andWhere('LOWER(categories.name) IN (:...categoryName)', {
        categoryName: categoryName.map((name) => name.toLowerCase()),
      });
    }

    const paginationConfig = mapPaginationConfig('stories', storyFindOptions);
    return PaginationHelper.paginate(query, paginationParams, paginationConfig);
  }

  async getStoryById(storyId: string): Promise<StoryOrNull> {
    return this.storyRepository.findOne({
      where: { storyId },
      relations: ['user', 'categories'],
    });
  }

  async updateStory(storyId: string, updateData: UpdateStoryDto): Promise<StoryOrNull> {
    const { categoryIds, ...restUpdateData } = updateData;
    if (Object.keys(restUpdateData).length > 0) {
      await this.storyRepository.update(storyId, restUpdateData);
    }

    if (categoryIds !== undefined) {
      const story = await this.storyRepository.findOne({
        where: { storyId },
        relations: ['categories'],
      });
      if (story) {
        if (categoryIds.length > 0) {
          const categories = await this.categoryRepository.find({ where: { categoryId: In(categoryIds) } });
          story.categories = categories;
        } else {
          story.categories = [];
        }
        await this.storyRepository.save(story);
      }
    }
    return this.getStoryById(storyId);
  }

  async deleteStory(storyId: string): Promise<DeleteResult> {
    return this.storyRepository.softDelete({ storyId, deletedAt: IsNull() });
  }
}

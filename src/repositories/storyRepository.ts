import { DeleteResult, IsNull } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { Story } from '../entities/Story.ts';
import { CreateStoryDto, UpdateStoryDto } from '../dto/storyDto.ts';
import { PaginatedResponse, StoryOrNull } from '../types/customTypes.ts';
import { StoryPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginationHelper } from '../utils/paginationHelper.ts';
import { storyFindOptions } from '../constants/paginationFields.ts';

export class StoryRepository {
  private storyRepository = AppDataSource.getRepository(Story);

  async createStory(storyData: CreateStoryDto): Promise<Story> {
    const newStory = this.storyRepository.create(storyData);
    return this.storyRepository.save(newStory);
  }

  async getAllStories(paginationParams: StoryPaginationQuery): Promise<PaginatedResponse<Story>> {
    const query = this.storyRepository
      .createQueryBuilder('stories')
      .leftJoinAndSelect('stories.user', 'users');

    return PaginationHelper.paginate(query, paginationParams, {
      entityAlias: 'stories',
      searchableFields: storyFindOptions,
    });
  }

  async getStoryById(storyId: string): Promise<StoryOrNull> {
    return this.storyRepository
      .createQueryBuilder('stories')
      .leftJoinAndSelect('stories.user', 'user')
      .where('stories.storyId = :storyId', { storyId })
      .getOne();
  }

  async getStoriesByUserId(userId: string): Promise<Story[]> {
    return this.storyRepository.find({
      where: { userId },
    });
  }

  async updateStory(storyId: string, updateData: UpdateStoryDto): Promise<StoryOrNull> {
    await this.storyRepository.update(storyId, updateData);
    return this.getStoryById(storyId);
  }

  async deleteStory(storyId: string): Promise<DeleteResult> {
    return this.storyRepository.softDelete({ storyId, deletedAt: IsNull() });
  }
}

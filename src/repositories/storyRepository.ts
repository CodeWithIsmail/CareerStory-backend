import { DeleteResult, IsNull } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { Story } from '../entities/Story.ts';
import { CreateStoryDto, UpdateStoryDto } from '../dto/storyDto.ts';
import { PaginatedResponse, StoryOrNull } from '../types/customTypes.ts';
import { StoryPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginationHelper } from '../utils/paginationHelper.ts';
import { storyFindOptions } from '../constants/paginationFields.ts';
import { mapPaginationConfig } from '../mappers/paginationMapper.ts';

export class StoryRepository {
  private storyRepository = AppDataSource.getRepository(Story);

  async createStory(storyData: CreateStoryDto): Promise<Story> {
    const newStory = this.storyRepository.create(storyData);
    return this.storyRepository.save(newStory);
  }

  async getStories(
    paginationParams: StoryPaginationQuery,
    userId?: string,
  ): Promise<PaginatedResponse<Story>> {
    const query = this.storyRepository
      .createQueryBuilder('stories')
      .leftJoinAndSelect('stories.user', 'users');
    if (userId) {
      query.where('stories.userId = :userId', { userId });
    }

    const paginationConfig = mapPaginationConfig('stories', storyFindOptions);

    return PaginationHelper.paginate(query, paginationParams, paginationConfig);
  }

  async getStoryById(storyId: string): Promise<StoryOrNull> {
    return this.storyRepository.findOne({
      where: { storyId },
      relations: ['user'],
    });
  }

  async updateStory(storyId: string, updateData: UpdateStoryDto): Promise<StoryOrNull> {
    await this.storyRepository.update(storyId, updateData);
    return this.getStoryById(storyId);
  }

  async deleteStory(storyId: string): Promise<DeleteResult> {
    return this.storyRepository.softDelete({ storyId, deletedAt: IsNull() });
  }

  // async getAllStories(paginationParams: StoryPaginationQuery): Promise<PaginatedResponse<Story>> {
  //   const query = this.storyRepository
  //     .createQueryBuilder('stories')
  //     .leftJoinAndSelect('stories.user', 'users');

  //   const paginationConfig = mapPaginationConfig('stories', storyFindOptions);

  //   return PaginationHelper.paginate(query, paginationParams, paginationConfig);
  // }

  // async getStoriesByUserId(
  //   userId: string,
  //   paginationParams: StoryPaginationQuery,
  // ): Promise<PaginatedResponse<Story>> {
  //   const query = this.storyRepository
  //     .createQueryBuilder('stories')
  //     .leftJoinAndSelect('stories.user', 'users')
  //     .where('users.userId = :userId', { userId });

  //   const paginationConfig = mapPaginationConfig('stories', storyFindOptions);

  //   return PaginationHelper.paginate(query, paginationParams, paginationConfig);
  // }
}

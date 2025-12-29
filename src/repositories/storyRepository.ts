import { DeleteResult, IsNull, SelectQueryBuilder } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { Story } from '../entities/Story.ts';
import { Vote } from '../entities/Vote.ts';
import { CreateStoryDto, UpdateStoryDto } from '../dto/storyDto.ts';
import { PaginatedResponse, StoryOrNull } from '../types/customTypes.ts';
import { StoryPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginationHelper } from '../utils/paginationUtils.ts';
import { storyFindOptions } from '../constants/paginationFields.ts';
import { mapPaginationConfig } from '../mappers/paginationMapper.ts';
import { Category } from '../entities/Category.ts';

export class StoryRepository {
  private storyRepository = AppDataSource.getRepository(Story);
  private voteRepository = AppDataSource.getRepository(Vote);

  private async attachVoteCounts(stories: Story[]): Promise<Story[]> {
    if (stories.length === 0) return stories;

    const storyIds = stories.map((s) => s.storyId);

    const voteSums = await this.voteRepository
      .createQueryBuilder('vote')
      .select('vote.storyId', 'storyId')
      .addSelect('SUM(vote.value)', 'sum')
      .where('vote.storyId IN (:...storyIds)', { storyIds })
      .groupBy('vote.storyId')
      .getRawMany();

    const voteMap = new Map<string, number>();
    voteSums.forEach((v) => {
      voteMap.set(v.storyId, parseInt(v.sum, 10) || 0);
    });

    return stories.map((story) => {
      story.voteCount = voteMap.get(story.storyId) || 0;
      return story;
    });
  }

  private createBaseQuery(currentUserId: string): SelectQueryBuilder<Story> {
    const query = this.storyRepository
      .createQueryBuilder('stories')
      .leftJoinAndSelect('stories.user', 'users')
      .leftJoinAndSelect('stories.categories', 'categories')

      .leftJoinAndMapOne(
        'stories.userVote',
        Vote,
        'user_vote',
        'user_vote.storyId = stories.storyId AND user_vote.userId = :currentUserId',
        { currentUserId },
      );

    return query;
  }

  async createStory(storyData: CreateStoryDto, categories: Category[]): Promise<Story> {
    const newStory = this.storyRepository.create({ ...storyData, categories });
    return this.storyRepository.save(newStory);
  }

  async getStories(
    paginationParams: StoryPaginationQuery,
    currentUserId: string,
    userId?: string,
    categoryName?: string[],
  ): Promise<PaginatedResponse<Story>> {
    const query = this.createBaseQuery(currentUserId);

    if (userId) {
      query.andWhere('stories.userId = :userId', { userId });
    }
    if (categoryName && categoryName.length > 0) {
      query.andWhere('LOWER(categories.name) IN (:...categoryName)', {
        categoryName: categoryName.map((name) => name.toLowerCase()),
      });
    }

    const paginationConfig = mapPaginationConfig('stories', storyFindOptions);
    const paginatedResult = await PaginationHelper.paginate(query, paginationParams, paginationConfig);
    paginatedResult.data = await this.attachVoteCounts(paginatedResult.data);

    return paginatedResult;
  }

  async getStoryById(storyId: string, currentUserId: string): Promise<StoryOrNull> {
    const query = this.createBaseQuery(currentUserId);
    query.where('stories.storyId = :storyId', { storyId });

    const story = await query.getOne();
    if (!story) return null;
    const [enrichedStory] = await this.attachVoteCounts([story]);
    return enrichedStory;
  }

  async updateStory(
    storyId: string,
    updateData: UpdateStoryDto,
    currentUserId: string,
    categories?: Category[],
  ): Promise<StoryOrNull> {
    const { categoryIds, ...restUpdateData } = updateData;
    if (Object.keys(restUpdateData).length > 0) {
      await this.storyRepository.update(storyId, restUpdateData);
    }

    if (categories !== undefined) {
      const story = await this.storyRepository.findOne({
        where: { storyId },
        relations: ['categories'],
      });
      if (story) {
        story.categories = categories;
        await this.storyRepository.save(story);
      }
    }

    return this.getStoryById(storyId, currentUserId);
  }

  async deleteStory(storyId: string): Promise<DeleteResult> {
    return this.storyRepository.softDelete({ storyId, deletedAt: IsNull() });
  }
}

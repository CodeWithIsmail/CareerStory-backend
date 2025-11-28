import { DeleteResult, IsNull } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { Story } from '../entities/Story.ts';
import { CreateStoryDto, UpdateStoryDto } from '../dto/storyDto.ts';
import { PaginatedResponse, StoryOrNull } from '../types/customTypes.ts';
import { StoryPaginationQuery } from '../validators/paginationValidator.ts';
import { NotFoundError } from '../errors/CustomErrors.ts';

export class StoryRepository {
  private storyRepository = AppDataSource.getRepository(Story);

  async createStory(storyData: CreateStoryDto): Promise<Story> {
    const newStory = this.storyRepository.create(storyData);
    return this.storyRepository.save(newStory);
  }

  async getAllStories(paginationParams: StoryPaginationQuery): Promise<PaginatedResponse<Story>> {
    const { page, itemsPerPage, sortDirection, orderBy, find } = paginationParams;

    const skip = (page - 1) * itemsPerPage;

    const query = this.storyRepository
      .createQueryBuilder('stories')
      .innerJoinAndSelect('stories.user', 'user');

    if (find && find.trim()) {
      query.where(
        `stories.title ILIKE :find
   OR stories.body ILIKE :find
   OR user.userName ILIKE :find
   OR user.name ILIKE :find
   OR user.email ILIKE :find
  OR TO_CHAR(stories.createdAt, 'YYYY-MM-DD') ILIKE :find
   OR similarity(stories.title, :find) > 0.2
   OR similarity(stories.body, :find) > 0.2
   OR similarity(user.userName, :find) > 0.2
   OR similarity(user.name, :find) > 0.2
   OR similarity(user.email, :find) > 0.2`,
        { find: `%${find}%` },
      );
    }

    const [data, totalItems] = await query
      .skip(skip)
      .take(itemsPerPage)
      .orderBy(`stories.${orderBy}`, sortDirection as 'ASC' | 'DESC')
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (page > totalPages) {
      throw new NotFoundError(
        `Page ${page} does not exist. Total pages: ${totalPages}.`,
        'fetching users',
      );
    }

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;

    return {
      data,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      },
    };
  }

  async getStoryById(storyId: string): Promise<StoryOrNull> {
    return this.storyRepository.findOneBy({ storyId });
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

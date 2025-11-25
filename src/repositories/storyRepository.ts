import { DeleteResult, IsNull } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { Story } from '../entities/Story.ts';
import { CreateStoryDto, UpdateStoryDto } from '../dto/storyDto.ts';
import { StoryOrNull } from '../types/customTypes.ts';

export class StoryRepository {
  private storyRepository = AppDataSource.getRepository(Story);

  async createStory(storyData: CreateStoryDto): Promise<Story> {
    const newStory = this.storyRepository.create(storyData);
    return this.storyRepository.save(newStory);
  }

  async getAllStories(): Promise<Story[]> {
    return this.storyRepository.find();
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

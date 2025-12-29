import { AppDataSource } from '../dataSource.ts';
import { Vote } from '../entities/Vote.ts';
import { VoteType } from '../types/customTypes.ts';
import { VoteStoryDto } from '../dto/storyDto.ts';

export class VoteRepository {
  private voteRepository = AppDataSource.getRepository(Vote);

  async handleVote(userId: string, storyId: string, voteData: VoteStoryDto): Promise<void> {
    const value = voteData.voteType === VoteType.UP ? 1 : -1;

    const existingVote = await this.voteRepository.findOneBy({ userId, storyId });

    if (existingVote) {
      if (existingVote.value === value) {
        await this.voteRepository.remove(existingVote);
      } else {
        existingVote.value = value;
        await this.voteRepository.save(existingVote);
      }
    } else {
      const newVote = this.voteRepository.create({ userId, storyId, value });
      await this.voteRepository.save(newVote);
    }
  }
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from './User.ts';
import type { Story } from './Story.ts';

@Entity('votes')
@Unique(['user', 'story'])
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  voteId: string;

  @Column({ type: 'int' })
  value: number;

  @Column()
  userId: string;

  @Column()
  storyId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne('Story')
  @JoinColumn({ name: 'storyId' })
  story: Story;
}

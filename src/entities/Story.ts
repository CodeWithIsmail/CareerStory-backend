import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './Category.ts';
import { User } from './User.ts';

@Entity({ name: 'stories' })
export class Story {
  @PrimaryGeneratedColumn('uuid')
  storyId: string;

  @Column('uuid')
  userId: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @ManyToMany(() => Category, (category) => category.stories)
  @JoinTable({ name: 'story_categories' })
  categories: Category[];
}

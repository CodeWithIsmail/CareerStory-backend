import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../types/customTypes.ts';
import { UrlNullableColumn } from '../utils/columnUtils.ts';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  userId: number;

  @Column({ unique: true, length: 50 })
  userName: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  organization: string | null;

  @UrlNullableColumn()
  linkedInUrl: string | null;

  @UrlNullableColumn()
  githubUrl: string | null;

  @UrlNullableColumn()
  portfolioUrl: string | null;

  @Column({ default: true })
  isEmailVerified: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  joinDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
export { UserRole };

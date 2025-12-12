import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UrlNullableColumn } from '../utils/columnUtils.ts';
import { UserRole } from '../types/customTypes.ts';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true, length: 50 })
  userName: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 1000, nullable: true })
  bio: string | null;

  @Column({ length: 255, nullable: true })
  organization: string | null;

  @UrlNullableColumn()
  photoUrl: string | null;

  @UrlNullableColumn()
  linkedInUrl: string | null;

  @UrlNullableColumn()
  githubUrl: string | null;

  @UrlNullableColumn()
  portfolioUrl: string | null;

  @Column({ default: false })
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

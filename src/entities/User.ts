import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  DeleteDateColumn,
} from 'typeorm';

// enum for user roles
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity({ name: 'users' })
@Unique(['userName', 'email']) // ensure combination of username and email is unique
export class User {
  @PrimaryGeneratedColumn({ type: 'int' }) // auto-incrementing primary key
  id: number;

  @Column({ unique: true, length: 50 }) // username must be unique and max 50 chars
  userName: string;

  @Column({ length: 100 }) // full name with max 100 chars
  name: string;

  @Column({ unique: true, length: 255 }) // email must be unique and max 255 chars
  email: string;

  @CreateDateColumn() // automatically set when user is created
  joinDate: Date;

  @Column({ type: 'enum', enum: UserRole }) //user role: ADMIN or USER
  role: UserRole;

  @DeleteDateColumn()
  deletedAt?: Date; // timestamp for soft deletion
}

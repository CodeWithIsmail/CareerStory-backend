import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.ts';

@Entity()
export class Auth {
  @PrimaryColumn('uuid')
  userId: string;

  @Column()
  hashedPassword: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordLastModificationTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'userId',
  })
  user: User;
}

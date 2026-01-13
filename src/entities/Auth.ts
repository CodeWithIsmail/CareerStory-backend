import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './User.ts';
import { DateOrNull, StringOrNull } from '../types/customTypes.ts';

@Entity()
export class Auth {
  @PrimaryColumn('uuid')
  userId: string;

  @Column()
  hashedPassword: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordLastModificationTime: DateOrNull;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'userId',
  })
  user: User;
}

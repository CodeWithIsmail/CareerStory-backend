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

  @Column({ nullable: true })
  passwordChangeCode: StringOrNull;

  @Column({ type: 'timestamp', nullable: true })
  passwordChangeCodeExpiresAt: DateOrNull;

  @Column({ default: false })
  passwordChangeCodeVerified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  passwordChangeCodeVerifiedAt: DateOrNull;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'userId',
  })
  user: User;
}

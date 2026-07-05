import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './User.ts';

@Entity()
export class Auth {
  @PrimaryColumn('int')
  userId: number;

  @Column()
  hashedPassword: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordLastModificationTime: Date | null;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'userId',
  })
  user: User;
}

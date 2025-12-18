import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './User.ts';

@Entity()
export class Auth {
  @PrimaryColumn('uuid')
  userId: string;

  @Column()
  hashedPassword: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordLastModificationTime: Date;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'userId',
  })
  user: User;
}

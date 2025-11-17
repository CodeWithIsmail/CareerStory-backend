import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './User.ts';

@Entity()
export class Auth {
  @PrimaryColumn()
  userName: string;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => User)
  @JoinColumn([
    {
      name: 'userName',
      referencedColumnName: 'userName',
    },
    {
      name: 'email',
      referencedColumnName: 'email',
    },
  ])
  user: User;
}

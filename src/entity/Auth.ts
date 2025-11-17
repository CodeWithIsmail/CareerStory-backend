import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User.js';

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

import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './User.ts';

@Entity()
export class Auth {
  @PrimaryColumn({ length: 50 }) // part of composite primary key, matches User.userName
  userName: string;

  @PrimaryColumn({ length: 255 }) // part of composite primary key, matches User.email
  email: string;

  @Column() // hashed password
  password: string;

  @Column({ type: 'timestamp', nullable: true }) // timestamp of last password modification
  passwordLastModificationTime: Date;

  @OneToOne(() => User) // one-to-one relationship with User entity
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

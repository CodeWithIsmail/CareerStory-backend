import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Auth } from './entities/Auth.ts';
import { User } from './entities/User.ts';
import { Story } from './entities/Story.ts';
import { ENV } from './config/environment.ts';
import { Category } from './entities/Category.ts';
import { Vote } from './entities/Vote.ts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_DATABASE,
  synchronize: true,
  entities: [User, Auth, Story, Category, Vote],
});

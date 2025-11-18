import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Auth } from './entities/Auth.ts';
import { User } from './entities/User.ts';

/**
 * AppDataSource - TypeORM database connection configuration
 * Using PostgreSQL as the relational database
 */

export const AppDataSource = new DataSource({
  type: 'postgres', // database type
  host: process.env.DB_HOST, // db host
  port: parseInt(process.env.DB_PORT), // db port
  username: process.env.DB_USERNAME, // db username
  password: process.env.DB_PASSWORD, // db password
  database: process.env.DB_DATABASE, // db name
  synchronize: true, // auto sync database schema
  logging: false, // enable query logging if needed
  entities: [User, Auth], // entities to be managed by TypeORM
});

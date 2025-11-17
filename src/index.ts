import { AppDataSource } from './data-source.ts';

try {
  await AppDataSource.initialize();
  console.log('Data Source has been initialized!');
} catch (error) {
  console.log(error);
}

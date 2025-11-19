import express from 'express';
import userRouter from './routes/userRoutes.ts';
import { AppDataSource } from './dataSource.ts';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/api', userRouter);

try {
  await AppDataSource.initialize();
  console.log('Data Source has been initialized!');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.error('Error during Data Source initialization:');
}

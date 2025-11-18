import express from 'express';
import userRouter from './routes/user.routes.ts';
import { AppDataSource } from './data-source.ts';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/api', userRouter);

try {
  await AppDataSource.initialize();
  console.log('Data Source has been initialized!');
  // Start the server and listen on the defined port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.error('Error during Data Source initialization:');
}

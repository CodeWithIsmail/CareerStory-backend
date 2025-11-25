import express from 'express';
import userRouter from './routes/userRoutes.ts';
import { AppDataSource } from './dataSource.ts';
import { globalErrorMiddleware } from './middlewares/globalErrorMiddleware.ts';
import { Request, Response } from 'express';
import { NotFoundError } from './errors/CustomErrors.ts';
import { ErrorFactory } from './errors/errorFactory.ts';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use((req: Request, res: Response) => {
  const error = new NotFoundError('Route not found', `${req.method} ${req.path}`);
  throw error;
});
app.use(globalErrorMiddleware);

await AppDataSource.initialize();
console.log('Data Source has been initialized!');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

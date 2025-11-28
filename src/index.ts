import express from 'express';
import userRouter from './routes/userRoutes.ts';
import { AppDataSource } from './dataSource.ts';
import { globalErrorMiddleware } from './middlewares/globalErrorMiddleware.ts';
import { routeNotFoundMiddleware } from './middlewares/notFoundMiddleware.ts';
import logger from './utils/logger.ts';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use(globalErrorMiddleware);
app.use(routeNotFoundMiddleware);

await AppDataSource.initialize();
logger.info('Database connected successfully');
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

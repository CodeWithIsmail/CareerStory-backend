import express from 'express';
import userRouter from './routes/userRoutes.ts';
import { AppDataSource } from './dataSource.ts';
import { globalErrorMiddleware } from './middlewares/globalErrorMiddleware.ts';
import { routeNotFoundMiddleware } from './middlewares/notFoundMiddleware.ts';
import logger from './utils/logger.ts';
import { LOG_MESSAGES } from './constants/logMessages.ts';
import storyRouter from './routes/storyRoutes.ts';
import authRouter from './routes/authRoutes.ts';
import { ENV } from './config/environment.ts';

const PORT = ENV.PORT;

const app = express();

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stories', storyRouter);
app.use(globalErrorMiddleware);
app.use(routeNotFoundMiddleware);

await AppDataSource.initialize();
logger.info(LOG_MESSAGES.DATABASE.CONNECTION.SUCCESS);
app.listen(PORT, () => {
  logger.info(LOG_MESSAGES.SERVER.RUNNING, { port: PORT });
});

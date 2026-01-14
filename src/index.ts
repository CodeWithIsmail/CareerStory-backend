// import express from 'express';
// import swaggerUi from 'swagger-ui-express';
// import userRouter from './routes/userRoutes.ts';
// import { AppDataSource } from './dataSource.ts';
// import { globalErrorMiddleware } from './middlewares/globalErrorMiddleware.ts';
// import { routeNotFoundMiddleware } from './middlewares/notFoundMiddleware.ts';
// import logger from './utils/logger.ts';
// import { LOG_MESSAGES } from './constants/logMessages.ts';
// import storyRouter from './routes/storyRoutes.ts';
// import authRouter from './routes/authRoutes.ts';
// import { ENV } from './config/environment.ts';
// import categoryRouter from './routes/categoryRoutes.ts';
// import { specs, swaggerUiOptions } from './swagger/swaggerConfig.ts';
// import cors from 'cors';
// const PORT = ENV.PORT;

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/stories', storyRouter);
// app.use('/api/v1/categories', categoryRouter);
// app.use(routeNotFoundMiddleware);
// app.use(globalErrorMiddleware);

// await AppDataSource.initialize();
// logger.info(LOG_MESSAGES.DATABASE.CONNECTION.SUCCESS);
// app.listen(PORT, () => {
//   logger.info(LOG_MESSAGES.SERVER.RUNNING, { port: PORT });
// });

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import userRouter from './routes/userRoutes.ts';
import { AppDataSource } from './dataSource.ts';
import { globalErrorMiddleware } from './middlewares/globalErrorMiddleware.ts';
import { routeNotFoundMiddleware } from './middlewares/notFoundMiddleware.ts';
import logger from './utils/logger.ts';
import { LOG_MESSAGES } from './constants/logMessages.ts';
import storyRouter from './routes/storyRoutes.ts';
import authRouter from './routes/authRoutes.ts';
import { ENV } from './config/environment.ts';
import categoryRouter from './routes/categoryRoutes.ts';
import { specs, swaggerUiOptions } from './swagger/swaggerConfig.ts';
import cors from 'cors';

const PORT = ENV.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stories', storyRouter);
app.use('/api/v1/categories', categoryRouter);
app.use(routeNotFoundMiddleware);
app.use(globalErrorMiddleware);

const startServer = async () => {
  try {
    console.log('Connecting to database...');
    console.log('DB_HOST:', ENV.DB_HOST);
    console.log('DB_DATABASE:', ENV.DB_DATABASE);

    await AppDataSource.initialize();
    logger.info(LOG_MESSAGES.DATABASE.CONNECTION.SUCCESS);

    app.listen(PORT, () => {
      logger.info(LOG_MESSAGES.SERVER.RUNNING, { port: PORT });
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:');
    console.error(error);
    process.exit(1);
  }
};

startServer();
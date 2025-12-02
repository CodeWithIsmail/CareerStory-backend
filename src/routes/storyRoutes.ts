import { Router } from 'express';
import { StoryController } from '../controllers/storyController.ts';
import {
  validateParamId,
  validateReqBody,
  validateReqQuery,
} from '../middlewares/reqValidationMiddleware.ts';
import { StoryValidator } from '../validators/storyValidator.ts';
import { PaginationValidator } from '../validators/paginationValidator.ts';
import { authenticate } from '../middlewares/authenticationMiddleware.ts';
import { ENV } from '../config/environment.ts';
import { authorizeStoryOwnerOrAdmin } from '../middlewares/authorizationMiddleware.ts';
const storyRouter = Router();
const storyController = new StoryController();

storyRouter
  .post(
    '/',
    authenticate(ENV.JWT_SECRET),
    validateReqBody(StoryValidator.createStorySchema),
    storyController.createStory,
  )
  .get(
    '/',
    validateReqQuery(PaginationValidator.validateStoryPagination.bind(PaginationValidator)),
    storyController.getAllStories,
  )
  .get(
    '/user/:userId',
    validateParamId('userId', StoryValidator.validateStoryIdParam),
    storyController.getStoriesByUserId,
  )
  .get(
    '/:storyId',
    validateParamId('storyId', StoryValidator.validateStoryIdParam),
    storyController.getStoryById,
  )
  .patch(
    '/:storyId',
    authenticate(ENV.JWT_SECRET),
    validateParamId('storyId', StoryValidator.validateStoryIdParam),
    authorizeStoryOwnerOrAdmin,
    validateReqBody(StoryValidator.updateStorySchema),
    storyController.updateStory,
  )
  .delete(
    '/:storyId',
    authenticate(ENV.JWT_SECRET),
    validateParamId('storyId', StoryValidator.validateStoryIdParam),
    authorizeStoryOwnerOrAdmin,
    storyController.deleteStory,
  );

export default storyRouter;

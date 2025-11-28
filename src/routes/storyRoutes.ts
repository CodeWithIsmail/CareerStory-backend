import { Router } from 'express';
import { StoryController } from '../controllers/storyController.ts';
import {
  validateParamId,
  validateReqBody,
  validateReqQuery,
} from '../middlewares/reqValidationMiddleware.ts';
import { StoryValidator } from '../validators/storyValidator.ts';
import { PaginationValidator } from '../validators/paginationValidator.ts';
const storyRouter = Router();
const storyController = new StoryController();

storyRouter
  .post('/', validateReqBody(StoryValidator.createStorySchema), storyController.createStory)
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
    validateParamId('storyId', StoryValidator.validateStoryIdParam),
    validateReqBody(StoryValidator.updateStorySchema),
    storyController.updateStory,
  )
  .delete(
    '/:storyId',
    validateParamId('storyId', StoryValidator.validateStoryIdParam),
    storyController.deleteStory,
  );

export default storyRouter;

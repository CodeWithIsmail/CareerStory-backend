import { Router } from 'express';
import { StoryController } from '../controllers/storyController.ts';
import { reqValidation } from '../middlewares/reqValidationMiddleware.ts';
import { createStorySchema, storyParamSchema, updateStorySchema } from '../validators/storyValidator.ts';
import { storyPaginationSchema } from '../validators/paginationValidator.ts';
import { authenticate } from '../middlewares/authenticationMiddleware.ts';
import { authorizeStoryOwnerOrAdmin } from '../middlewares/authorizationMiddleware.ts';
import { REQ_SOURCE } from '../types/customTypes.ts';

const storyRouter = Router();
const storyController = new StoryController();

storyRouter
  .post('/', authenticate, reqValidation(REQ_SOURCE.BODY, createStorySchema), storyController.createStory)

  .get('/', reqValidation(REQ_SOURCE.QUERY, storyPaginationSchema), storyController.getAllStories)

  .get(
    '/:storyId',
    reqValidation(REQ_SOURCE.PARAM, storyParamSchema, 'storyId'),
    storyController.getStoryById,
  )

  .patch(
    '/:storyId',
    authenticate,
    reqValidation(REQ_SOURCE.PARAM, storyParamSchema, 'storyId'),
    authorizeStoryOwnerOrAdmin,
    reqValidation(REQ_SOURCE.BODY, updateStorySchema),
    storyController.updateStory,
  )

  .delete(
    '/:storyId',
    authenticate,
    reqValidation(REQ_SOURCE.PARAM, storyParamSchema, 'storyId'),
    authorizeStoryOwnerOrAdmin,
    storyController.deleteStory,
  );

export default storyRouter;

import { Router } from 'express';
import { StoryController } from '../controllers/storyController.ts';
import { validateParamId, validateReqBody } from '../middlewares/reqValidationMiddleware.ts';
import { StoryValidator } from '../validators/storyValidator.ts';
const storyRouter = Router();
const storyController = new StoryController();

storyRouter
  .post('/', validateReqBody(StoryValidator.createStorySchema), storyController.createStory)
  .get('/', storyController.getAllStories)
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

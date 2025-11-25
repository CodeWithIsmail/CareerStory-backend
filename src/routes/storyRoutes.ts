import { Router } from 'express';
import { StoryController } from '../controllers/storyController.ts';

const storyRouter = Router();
const storyController = new StoryController();

storyRouter
  .post('/', storyController.createStory)
  .get('/', storyController.getAllStories)
  .get('/user/:userId', storyController.getStoriesByUserId)
  .get('/:storyId', storyController.getStoryById)
  .patch('/:storyId', storyController.updateStory)
  .delete('/:storyId', storyController.deleteStory);

export default storyRouter;

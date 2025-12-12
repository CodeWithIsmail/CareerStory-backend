import { Request, Response } from 'express';
import { StoryService } from '../services/storyService.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.ts';
import { AuthRequest } from '../middlewares/authenticationMiddleware.ts';

export class StoryController {
  private storyService = new StoryService();

  createStory = async (req: AuthRequest, res: Response) => {
    const newStory = await this.storyService.createStory({ ...req.body, userId: req.userId });
    return ResponseHandler.created(res, newStory, RESPONSE_MESSAGES.STORY.CREATE.SUCCESS);
  };

  getAllStories = async (req: AuthRequest, res: Response) => {
    const stories = await this.storyService.getStories(req.validatedQuery, req.userId);
    return ResponseHandler.success(res, stories, RESPONSE_MESSAGES.STORY.FETCH.ALL_SUCCESS);
  };

  getStoryById = async (req: Request, res: Response) => {
    const story = await this.storyService.getStoryById(req.params.storyId);
    return ResponseHandler.success(res, story, RESPONSE_MESSAGES.STORY.FETCH.BY_ID_SUCCESS);
  };

  updateStory = async (req: Request, res: Response) => {
    const updatedStory = await this.storyService.updateStory(req.params.storyId, req.body);
    return ResponseHandler.success(res, updatedStory, RESPONSE_MESSAGES.STORY.UPDATE.SUCCESS);
  };

  deleteStory = async (req: Request, res: Response) => {
    await this.storyService.deleteStory(req.params.storyId);
    return ResponseHandler.noContent(res);
  };
}

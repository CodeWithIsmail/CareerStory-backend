import { Request, Response, NextFunction } from 'express';
import { StoryService } from '../services/storyService.ts';
import { CreateStoryDto, UpdateStoryDto } from '../dto/storyDto.ts';
import { StoryValidator } from '../validators/storyValidator.ts';
import { UserValidator } from '../validators/userValidator.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.ts';

export class StoryController {
  private storyService = new StoryService();

  createStory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newStory = await this.storyService.createStory(req.body);
      return ResponseHandler.created(res, newStory, RESPONSE_MESSAGES.STORY.CREATE.SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  getAllStories = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stories = await this.storyService.getAllStories();
      return ResponseHandler.success(res, stories, RESPONSE_MESSAGES.STORY.FETCH.ALL_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  getStoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const story = await this.storyService.getStoryById(req.params.storyId);
      return ResponseHandler.success(res, story, RESPONSE_MESSAGES.STORY.FETCH.BY_ID_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  getStoriesByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stories = await this.storyService.getStoriesByUserId(req.params.userId);
      return ResponseHandler.success(res, stories, RESPONSE_MESSAGES.STORY.FETCH.BY_USER_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  updateStory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedStory = await this.storyService.updateStory(req.params.storyId, req.body);
      return ResponseHandler.success(res, updatedStory, RESPONSE_MESSAGES.STORY.UPDATE.SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  deleteStory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.storyService.deleteStory(req.params.storyId);
      return ResponseHandler.success(
        res,
        { id: req.params.storyId },
        RESPONSE_MESSAGES.STORY.DELETE.SUCCESS,
      );
    } catch (error) {
      next(error);
    }
  };
}

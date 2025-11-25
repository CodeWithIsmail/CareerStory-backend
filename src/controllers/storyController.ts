import { Request, Response, NextFunction } from 'express';
import { StoryService } from '../services/storyService.ts';
import { CreateStoryDto, UpdateStoryDto } from '../dto/storyDto.ts';
import { StoryValidator } from '../validators/storyValidator.ts';
import { UserValidator } from '../validators/userValidator.ts';
import { constantStatusCodes } from '../constants/errorMessages.ts';

export class StoryController {
  private storyService = new StoryService();

  createStory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedNewStory: CreateStoryDto = StoryValidator.validateCreateStory(req.body);
      const newStory = await this.storyService.createStory(validatedNewStory);
      return res.status(constantStatusCodes.CREATED).json(newStory);
    } catch (error) {
      next(error);
    }
  };

  getAllStories = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stories = await this.storyService.getAllStories();
      return res.status(constantStatusCodes.OK).json(stories);
    } catch (error) {
      next(error);
    }
  };

  getStoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storyId = StoryValidator.validateStoryIdParam(req.params.storyId);
      const story = await this.storyService.getStoryById(storyId);
      return res.status(constantStatusCodes.OK).json(story);
    } catch (error) {
      next(error);
    }
  };

  getStoriesByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = UserValidator.validateUserIdParam(req.params.userId);
      const stories = await this.storyService.getStoriesByUserId(userId);
      return res.status(constantStatusCodes.OK).json(stories);
    } catch (error) {
      next(error);
    }
  };

  updateStory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storyId = StoryValidator.validateStoryIdParam(req.params.storyId);
      const updateData: UpdateStoryDto = StoryValidator.validateUpdateStory(req.body);
      const updatedStory = await this.storyService.updateStory(storyId, updateData);
      return res.status(constantStatusCodes.OK).json(updatedStory);
    } catch (error) {
      next(error);
    }
  };

  deleteStory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storyId = StoryValidator.validateStoryIdParam(req.params.storyId);
      await this.storyService.deleteStory(storyId);
      return res.status(constantStatusCodes.OK).json({ message: 'Story deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

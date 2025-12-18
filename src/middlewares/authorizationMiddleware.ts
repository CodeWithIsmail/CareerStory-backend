import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../entities/User.js';
import { ErrorFactory } from '../errors/errorFactory.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { StoryService } from '../services/storyService.ts';

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.role)) {
      throw ErrorFactory.createForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, 'auth');
    }
    next();
  };
};

export const authorizeStoryOwnerOrAdmin = async (req: Request, _res: Response, next: NextFunction) => {
  const storyService = new StoryService();
  const storyId = req.params.storyId;
  const storyAuthorUserId = await storyService.storyAuthorUserId(storyId);

  if (req.userId !== storyAuthorUserId && req.role !== UserRole.ADMIN) {
    throw ErrorFactory.createForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, 'auth');
  }

  next();
};

export const authorizeOwnerOrAdmin = (req: Request, _res: Response, next: NextFunction) => {
  const resourceOwnerId = req.params.userId;

  if (req.userId !== resourceOwnerId && req.role !== UserRole.ADMIN) {
    throw ErrorFactory.createForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, 'auth');
  }

  next();
};

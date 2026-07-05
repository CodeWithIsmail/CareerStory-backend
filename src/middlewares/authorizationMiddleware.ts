import { Response, NextFunction } from 'express';
import { UserRole } from '../entities/User.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { StoryService } from '../services/storyService.ts';
import { CONTEXT } from '../constants/context.ts';
import { ForbiddenError } from '../errors/CustomErrors.ts';
import { AuthRequest } from './authenticationMiddleware.ts';

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.role)) {
      throw new ForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, CONTEXT.MIDDLEWARE.AUTHORIZATION);
    }
    next();
  };
};

export const authorizeStoryOwnerOrAdmin = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  const storyService = new StoryService();
  const storyId = Number(req.params.storyId);
  const storyAuthorUserId = await storyService.storyAuthorUserId(storyId);

  if (req.userId !== storyAuthorUserId && req.role !== UserRole.ADMIN) {
    throw new ForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, CONTEXT.MIDDLEWARE.AUTHORIZATION);
  }
  next();
};

export const authorizeOwnerOrAdmin = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const resourceOwnerId = Number(req.params.userId);

  if (req.userId !== resourceOwnerId && req.role !== UserRole.ADMIN) {
    throw new ForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, CONTEXT.MIDDLEWARE.AUTHORIZATION);
  }
  next();
};

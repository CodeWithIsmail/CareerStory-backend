import { RequestHandler } from 'express';
import { CONTEXT } from '../constants/context.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { UserRole } from '../entities/User.js';
import { ForbiddenError } from '../errors/CustomErrors.ts';
import { StoryService } from '../services/storyService.ts';

export const authorizeRoles = (...roles: UserRole[]) => {
  return ((req, _res, next) => {
    if (!roles.includes(req.role)) {
      throw new ForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, CONTEXT.MIDDLEWARE.AUTHORIZATION);
    }
    next();
  }) satisfies RequestHandler;
};

export const authorizeStoryOwnerOrAdmin: RequestHandler = async (req, _res, next) => {
  const storyService = new StoryService();
  const storyId = Number(req.params.storyId);
  const storyAuthorUserId = await storyService.storyAuthorUserId(storyId);

  if (req.userId !== storyAuthorUserId && req.role !== UserRole.ADMIN) {
    throw new ForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, CONTEXT.MIDDLEWARE.AUTHORIZATION);
  }
  next();
};

export const authorizeOwnerOrAdmin: RequestHandler = (req, _res, next) => {
  const resourceOwnerId = Number(req.params.userId);

  if (req.userId !== resourceOwnerId && req.role !== UserRole.ADMIN) {
    throw new ForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, CONTEXT.MIDDLEWARE.AUTHORIZATION);
  }
  next();
};

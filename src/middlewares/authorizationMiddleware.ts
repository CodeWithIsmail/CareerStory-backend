import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../entities/User.js';
import { ErrorFactory } from '../errors/errorFactory.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { StoryService } from '../services/storyService.ts';

// Only allow specific roles
export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw ErrorFactory.createForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, 'auth');
    }
    next();
  };
};

export const authorizeStoryOwnerOrAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.NO_TOKEN, 'auth');
    }

    const storyService = new StoryService();

    const storyId = req.params.storyId;
    const storyAuthorUserId = await storyService.storyAuthorUserId(storyId);

    // If story not found, let the controller handle 404
    if (!storyAuthorUserId) return next();

    // Check ownership or admin role
    if (req.user.userId !== storyAuthorUserId && req.user.role !== UserRole.ADMIN) {
      throw ErrorFactory.createForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, 'auth');
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const authorizeOwnerOrAdmin = (req: Request, _res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.NO_TOKEN, 'auth');
    }

    const resourceOwnerId = req.params.userId;

    // Check ownership or admin role
    if (req.user.userId !== resourceOwnerId && req.user.role !== UserRole.ADMIN) {
      throw ErrorFactory.createForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, 'auth');
    }

    next();
  } catch (err) {
    next(err);
  }
};

import { NextFunction, RequestHandler, Response } from 'express';
import { CONTEXT } from '../constants/context.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { UserRole } from '../entities/User.ts';
import { UnauthorizedError } from '../errors/CustomErrors.ts';
import { UserService } from '../services/userService.ts';
import { verifyToken } from '../utils/tokenUtils.ts';

declare global {
  namespace Express {
    interface Request {
      userId: number;
      role: UserRole;
    }
  }
}

export const authenticate: RequestHandler = async (req, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError(ERROR_MESSAGES.AUTH.NO_TOKEN, CONTEXT.MIDDLEWARE.AUTHENTICATION);
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  const userService = new UserService();
  const user = await userService.getUserById(decoded.userId);
  if (!user) {
    throw new UnauthorizedError(ERROR_MESSAGES.USER.NOT_FOUND, CONTEXT.MIDDLEWARE.AUTHENTICATION);
  }
  req.userId = decoded.userId;
  req.role = decoded.role;
  next();
};

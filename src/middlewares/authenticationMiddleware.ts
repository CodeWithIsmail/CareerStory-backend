import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorFactory } from '../errors/errorFactory.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { TokenPayload } from '../dto/authDto.ts';
import { ENV } from '../config/environment.ts';
import { UserService } from '../services/userService.ts';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.NO_TOKEN, 'auth');
  }

  const token = authHeader.split(' ')[1];
  const secret = ENV.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    const userService = new UserService();
    const user = await userService.getUserById(decoded.userId);
    if (!user) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 'auth');
    }
    req.user = decoded;
    next();
  } catch (err) {
    throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 'auth');
  }
};

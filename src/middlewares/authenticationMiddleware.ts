import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorFactory } from '../errors/errorFactory.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { UserRole } from '../entities/User.js';

interface JwtPayload {
  userId: string;
  userName: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (jwtSecret: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.NO_TOKEN, 'auth');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      req.user = decoded;
      next();
    } catch (err) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 'auth');
    }
  };
};

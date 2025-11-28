import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/CustomErrors.ts';

export function routeNotFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  const error = new NotFoundError('Route not found', `${req.method} ${req.path}`);
  next(error);
}
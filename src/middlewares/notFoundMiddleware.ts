import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/CustomErrors.ts';

export function routeNotFoundMiddleware(req: Request, _res: Response, next: NextFunction) {
  const error = new NotFoundError('Requested route not found', `${req.method} ${req.originalUrl}`);
  next(error);
}

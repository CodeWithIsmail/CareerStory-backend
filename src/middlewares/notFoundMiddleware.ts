import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/CustomErrors.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';

export function routeNotFoundMiddleware(req: Request, _res: Response, next: NextFunction) {
  const error = new NotFoundError(ERROR_MESSAGES.COMMON.ROUTE_NOT_FOUND, `${req.method} ${req.originalUrl}`);
  next(error);
}

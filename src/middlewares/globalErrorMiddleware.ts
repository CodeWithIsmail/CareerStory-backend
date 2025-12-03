import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../errors/errorHandler.ts';

export const globalErrorMiddleware = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const context = `${req.method} ${req.originalUrl}`;
  ErrorHandler.handleError(err, res, context);
};

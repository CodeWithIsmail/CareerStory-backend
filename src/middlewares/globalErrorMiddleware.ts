import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.ts';
import { ErrorHandler } from '../errors/errorHandler.ts';

export const globalErrorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const context = `${req.method} ${req.path}`;

  logger.error('Request error occurred', {
    error: err instanceof Error ? err.message : String(err),
    context,
    stack: err instanceof Error ? err.stack : undefined,
  });

  ErrorHandler.handleError(err, res, context);
};
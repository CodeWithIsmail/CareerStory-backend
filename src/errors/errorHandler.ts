import { Response } from 'express';
import { AppError } from './AppError.ts';
import { z } from 'zod';
import { ErrorFactory } from './errorFactory.ts';
import { constantErrorMessages, constantStatusCodes } from '../constants/errorMessages.ts';

export class ErrorHandler {
  static handleError(error: unknown, res: Response, context: string = '') {
    if (error instanceof z.ZodError) {
      const validationError = ErrorFactory.createValidationError(
        constantErrorMessages.USER.BAD_REQUEST,
        context,
      );
      return res.status(validationError.statusCode).json({ message: validationError.message });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(constantStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: context
        ? `${constantErrorMessages.USER.INTERNAL_SERVER_ERROR} during ${context}`
        : constantErrorMessages.USER.INTERNAL_SERVER_ERROR,
    });
  }
}

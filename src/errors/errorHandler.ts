import { Response } from 'express';
import { AppError } from './AppError.ts';
import { z } from 'zod';
import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '../constants/errorMessages.ts';
import { QueryFailedError } from 'typeorm';
import logger from '../utils/logger.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { formatZodErrors } from '../utils/formatZodErrors.ts';
export class ErrorHandler {
  static handleError(error: unknown, res: Response, context: string = ''): void {
    let statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR;
    let errorDetails: any;

    // Handle Zod Validation Errors
    if (error instanceof z.ZodError) {
      statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      message = ERROR_MESSAGES.COMMON.INVALID_INPUT;
      errorDetails = formatZodErrors(error);

      logger.warn('Validation error', {
        context,
        errorCount: errorDetails.length,
        details: errorDetails,
      });
    }

    // Handle Custom Application Errors
    else if (error instanceof AppError) {
      statusCode = error.statusCode;
      message = error.message;

      logger.warn('Application error', {
        context,
        statusCode,
        message,
      });
    }

    // Handle TypeORM Database Errors
    else if (error instanceof QueryFailedError) {
      statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      message = error.message;
      logger.error('Database error occurred', {
        context,
        errorCode: (error as any).code,
        driverError: (error as any).driverError,
      });
    }

    // Handle Generic Errors
    else if (error instanceof Error) {
      statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      message = ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR;

      logger.error('Unexpected error', {
        context,
        errorMessage: error.message,
        stack: error.stack,
      });
    }

    // Handle Unknown Errors
    else {
      logger.error('Unknown error occurred', {
        context,
        error: String(error),
      });
    }

    ResponseHandler.error(res, message, statusCode, errorDetails);
  }
}

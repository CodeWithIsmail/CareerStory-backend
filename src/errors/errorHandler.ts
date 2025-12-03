import { Response } from 'express';
import { AppError } from './AppError.ts';
import { z } from 'zod';
import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '../constants/errorMessages.ts';
import { QueryFailedError } from 'typeorm';
import logger from '../utils/logger.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { formatZodErrors } from '../utils/formatZodErrors.ts';
export class ErrorHandler {
  static handleError(error: unknown, res: Response, context: string = '') {
    let statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR;
    let errorDetails: any;

    if (error instanceof z.ZodError) {
      statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      message = ERROR_MESSAGES.COMMON.INVALID_INPUT;
      errorDetails = formatZodErrors(error);

      logger.error('Validation error', {
        context,
        errorCount: errorDetails.length,
        details: errorDetails,
      });
    } else if (error instanceof AppError) {
      statusCode = error.statusCode;
      message = error.message;

      logger.error('Application error', {
        context,
        statusCode,
        message,
      });
    } else if (error instanceof QueryFailedError) {
      statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      message = ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR;

      logger.error('Database error occurred', {
        context,
        errorCode: (error as any).code,
        driverError: (error as any).driverError,
      });
    } else if (error instanceof Error) {
      statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      message = ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR;

      logger.error('Unexpected error', {
        context,
        errorMessage: error.message,
        stack: error.stack,
      });
    } else {
      statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      message = ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR;

      logger.error('Unknown error occurred', {
        context,
        error: String(error),
      });
    }

    ResponseHandler.error(res, message, statusCode, errorDetails);
  }
}

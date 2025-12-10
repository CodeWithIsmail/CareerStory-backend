import { Response } from 'express';
import { AppError } from './AppError.ts';
import { z } from 'zod';
import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '../constants/errorMessages.ts';
import { QueryFailedError } from 'typeorm';
import logger from '../utils/logger.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { formatZodErrors } from '../utils/formatZodErrors.ts';
import { CONTEXT } from '../constants/context.ts';
import { AISummaryError } from './CustomErrors.ts';
export class ErrorHandler {
  static handleError(error: unknown, res: Response, context: string = '') {
    let statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR;
    let errorDetails: any;

    if (error instanceof z.ZodError) {
      statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      message = ERROR_MESSAGES.COMMON.INVALID_INPUT;
      errorDetails = formatZodErrors(error);

      logger.error(CONTEXT.MIDDLEWARE.VALIDATION, {
        context,
        errorCount: errorDetails.length,
        details: errorDetails,
      });
    } else if (error instanceof AppError) {
      statusCode = error.statusCode;
      message = error.message;

      logger.error(CONTEXT.MIDDLEWARE.APPLICATION, {
        context,
        statusCode,
        message,
      });
    } else if (error instanceof AISummaryError) {
      statusCode = error.statusCode;
      message = error.message;

      logger.error(CONTEXT.AI.SUMMARY_GENERATION, {
        context,
        statusCode,
        message,
      });
    } else if (error instanceof QueryFailedError) {
      const pgError = error as any;

      switch (pgError.code) {
        case '23505':
          statusCode = HTTP_STATUS_CODES.CONFLICT;
          message = ERROR_MESSAGES.DATABASE.DUPLICATE_ENTRY;
          break;
        case '23503':
          statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
          message = ERROR_MESSAGES.DATABASE.FOREIGN_KEY_CONFLICT;
          break;
        case '23502':
          statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
          message = ERROR_MESSAGES.DATABASE.NOT_NULL_VIOLATION;
          break;
        case '22P02':
          statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
          message = ERROR_MESSAGES.DATABASE.INVALID_TYPE;
          break;
      }
    } else if (error instanceof Error) {
      logger.error(CONTEXT.MIDDLEWARE.UNEXPECTED, {
        context,
        errorMessage: error.message,
        stack: error.stack,
      });
    }
    ResponseHandler.error(res, message, statusCode, errorDetails);
  }
}

import { Response } from 'express';
import { AppError } from './AppError.ts';
import { z } from 'zod';
import { constantErrorMessages, constantStatusCodes } from '../constants/errorMessages.ts';
import { ErrorResponseDto, ErrorDetail } from '../dto/errorDto.ts';
import { QueryFailedError } from 'typeorm';
import logger from '../utils/logger.ts';

export class ErrorHandler {
  static handleError(error: unknown, res: Response, context: string = ''): void {
    let statusCode = constantStatusCodes.INTERNAL_SERVER_ERROR;
    let message = constantErrorMessages.USER.INTERNAL_SERVER_ERROR;
    let details: any = {};

    // Handle Zod Validation Errors
    if (error instanceof z.ZodError) {
      statusCode = constantStatusCodes.BAD_REQUEST;
      message = constantErrorMessages.USER.BAD_REQUEST;
      const validationErrors: ErrorDetail[] = error.issues.map((issue: any) => ({
        field: issue.path.join('.') || 'unknown',
        message: issue.message,
        code: issue.code,
      }));
      details = { errors: validationErrors };

      logger.warn('Validation error', {
        context,
        errorCount: validationErrors.length,
        details: validationErrors,
      });
    }
    // Handle TypeORM Database Errors
    else if (error instanceof QueryFailedError) {
      logger.error('Database error occurred', {
        context,
        errorCode: (error as any).code,
        driverError: (error as any).driverError,
      });

      // Check for duplicate key violation
      if ((error as any).code === 'ER_DUP_ENTRY' || (error as any).code === '23505') {
        statusCode = constantStatusCodes.CONFLICT;
        message = 'This record already exists (duplicate entry)';
      }

      // Generic database error
      else {
        statusCode = constantStatusCodes.INTERNAL_SERVER_ERROR;
        message = 'A database error occurred';
      }
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
    // Handle Generic Errors
    else if (error instanceof Error) {
      statusCode = constantStatusCodes.INTERNAL_SERVER_ERROR;
      message = constantErrorMessages.USER.INTERNAL_SERVER_ERROR;

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

    // Build response
    const response: ErrorResponseDto = {
      success: false,
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      ...(Object.keys(details).length > 0 && details),
      ...(process.env.NODE_ENV === 'development' && { stack: (error as any)?.stack }),
    };

    res.status(statusCode).json(response);
  }
}

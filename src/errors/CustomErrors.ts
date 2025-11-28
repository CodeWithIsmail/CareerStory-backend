import { HTTP_STATUS_CODES, ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { AppError } from './AppError.ts';

export class ValidationError extends AppError {
  constructor(message: string = ERROR_MESSAGES.COMMON.INVALID_INPUT, context: string = '') {
    super(message, HTTP_STATUS_CODES.BAD_REQUEST, context);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = ERROR_MESSAGES.COMMON.UNAUTHORIZED, context: string = '') {
    super(message, HTTP_STATUS_CODES.UNAUTHORIZED, context);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = ERROR_MESSAGES.COMMON.FORBIDDEN, context: string = '') {
    super(message, HTTP_STATUS_CODES.FORBIDDEN, context);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = ERROR_MESSAGES.COMMON.NOT_FOUND, context: string = '') {
    super(message, HTTP_STATUS_CODES.NOT_FOUND, context);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = ERROR_MESSAGES.COMMON.INTERNAL_SERVER_ERROR, context: string = '') {
    super(message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, context);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = ERROR_MESSAGES.COMMON.CONFLICT, context: string = '') {
    super(message, HTTP_STATUS_CODES.CONFLICT, context);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = constantErrorMessages.USER.CONFLICT, context: string = '') {
    super(message, constantStatusCodes.CONFLICT, context);
  }
}

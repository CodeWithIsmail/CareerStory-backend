import { constantErrorMessages, constantStatusCodes } from '../constants/errorMessages.ts';
import { AppError } from './AppError.ts';

export class ValidationError extends AppError {
  constructor(message: string = constantErrorMessages.USER.BAD_REQUEST, context: string = '') {
    super(message, constantStatusCodes.BAD_REQUEST, context);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = constantErrorMessages.USER.UNAUTHORIZED, context: string = '') {
    super(message, constantStatusCodes.UNAUTHORIZED, context);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = constantErrorMessages.USER.FORBIDDEN, context: string = '') {
    super(message, constantStatusCodes.FORBIDDEN, context);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = constantErrorMessages.USER.NOT_FOUND, context: string = '') {
    super(message, constantStatusCodes.NOT_FOUND, context);
  }
}

export class DatabaseError extends AppError {
  constructor(
    message: string = constantErrorMessages.USER.INTERNAL_SERVER_ERROR,
    context: string = '',
  ) {
    super(message, constantStatusCodes.INTERNAL_SERVER_ERROR, context);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = constantErrorMessages.USER.CONFLICT, context: string = '') {
    super(message, constantStatusCodes.CONFLICT, context);
  }
}

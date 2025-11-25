import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  DatabaseError,
} from './CustomErrors.ts';

export class ErrorFactory {
  static createNotFoundError = (message?: string, context?: string): NotFoundError => {
    return new NotFoundError(message, context);
  };

  static createValidationError = (message?: string, context?: string): ValidationError => {
    return new ValidationError(message, context);
  };

  static createUnauthorizedError = (message?: string, context?: string): UnauthorizedError => {
    return new UnauthorizedError(message, context);
  };

  static createForbiddenError = (message?: string, context?: string): ForbiddenError => {
    return new ForbiddenError(message, context);
  };

  static createDatabaseError = (message?: string, context?: string): DatabaseError => {
    return new DatabaseError(message, context);
  };
}

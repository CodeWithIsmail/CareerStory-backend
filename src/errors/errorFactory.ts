import { AppError } from './AppError.ts';
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  DatabaseError,
} from './CustomErrors.ts';

export class ErrorFactory {
  static createNotFoundError = (message?: string): NotFoundError => {
    return new NotFoundError(message);
  };

  static createValidationError = (message?: string): ValidationError => {
    return new ValidationError(message);
  };

  static createUnauthorizedError = (message?: string): UnauthorizedError => {
    return new UnauthorizedError(message);
  };

  static createForbiddenError = (message?: string): ForbiddenError => {
    return new ForbiddenError(message);
  };

  static createDatabaseError = (message?: string): DatabaseError => {
    return new DatabaseError(message);
  };
}

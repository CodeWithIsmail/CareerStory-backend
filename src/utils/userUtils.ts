import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { CreateUserDto } from '../dto/userDto.ts';
import { User } from '../entities/User.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';

export const checkForDuplicateUser = (isExistingUser: User, user: CreateUserDto, context: string): void => {
  if (isExistingUser) {
    if (isExistingUser.email == user.email && isExistingUser.userName == user.userName)
      throw ErrorFactory.createConflictError(ERROR_MESSAGES.USER.DUPLICATE_EMAIL_AND_USERNAME, context);
    else if (isExistingUser.email === user.email)
      throw ErrorFactory.createConflictError(ERROR_MESSAGES.USER.DUPLICATE_EMAIL, context);
    else throw ErrorFactory.createConflictError(ERROR_MESSAGES.USER.DUPLICATE_USERNAME, context);
  }
};

import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { CreateUserDto } from '../dto/userDto.ts';
import { ConflictError } from '../errors/CustomErrors.ts';
import { UserOrNull } from '../types/customTypes.ts';

export const checkForDuplicateUser = (
  isExistingUser: UserOrNull,
  user: CreateUserDto,
  context: string,
): void => {
  if (isExistingUser) {
    if (isExistingUser.email == user.email && isExistingUser.userName == user.userName)
      throw new ConflictError(ERROR_MESSAGES.USER.DUPLICATE_EMAIL_AND_USERNAME, context);
    else if (isExistingUser.email === user.email)
      throw new ConflictError(ERROR_MESSAGES.USER.DUPLICATE_EMAIL, context);
    else throw new ConflictError(ERROR_MESSAGES.USER.DUPLICATE_USERNAME, context);
  }
};

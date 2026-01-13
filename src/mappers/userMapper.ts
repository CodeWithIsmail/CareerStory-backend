import { User } from '../entities/User.ts';
import { UserProfileDto } from '../dto/userDto.ts';
import { userProfileSchema } from '../validators/userValidator.ts';

export const mapUserToProfileDto = (user: User): UserProfileDto => userProfileSchema.parse(user);

export const mapUsersToProfileDtoList = (users: User[]): UserProfileDto[] =>
  users.map((user) => mapUserToProfileDto(user));

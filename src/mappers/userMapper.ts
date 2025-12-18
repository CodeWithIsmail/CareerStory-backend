import { User } from '../entities/User.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import { userResponseSchema } from '../validators/userValidator.ts';

export const mapUserToDto = (user: User): UserResponseDto => userResponseSchema.parse(user);

export const mapUsersToDtoList = (users: User[]): UserResponseDto[] =>
  users.map((user) => mapUserToDto(user));

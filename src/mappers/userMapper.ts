import { User } from '../entities/User.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import { plainToInstance } from 'class-transformer';

export const mapUserToDto = (user: User): UserResponseDto =>
  plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });

export const mapUsersToDtoList = (users: User[]): UserResponseDto[] =>
  plainToInstance(UserResponseDto, users, { excludeExtraneousValues: true });

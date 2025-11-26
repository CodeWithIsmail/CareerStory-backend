import { User } from '../entities/User.ts';
import { UserResponseDto } from '../dto/userDto.ts';

export const mapUserToDto = (user: User): UserResponseDto => ({
  userId: user.userId,
  userName: user.userName,
  name: user.name,
  email: user.email,
  joinDate: user.joinDate,
  role: user.role,
});

export const mapUsersToDtoList = (users: User[]): UserResponseDto[] => {
  return users.map(mapUserToDto);
};

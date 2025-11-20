import { UserRole } from '../entities/User.ts';
import { User } from '../entities/User.ts';

/**
 * Data Transfer Objects (DTOs) for User entity
 * --------------------------------------------
 * Defines the structure of data for creating, updating, and responding with User information.
 * Facilitates data validation and transformation between different layers of the application.
 */

export class CreateUserDto {
  userName: string;
  name: string;
  email: string;
  role: UserRole;
}

export class UpdateUserDto {
  userName?: string;
  name?: string;
  email?: string;
  role?: UserRole;
}

export class UserResponseDto {
  id: string;
  userName: string;
  name: string;
  email: string;
  joinDate: Date;
  role: UserRole;

  static fromEntity(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.userName = user.userName;
    dto.name = user.name;
    dto.email = user.email;
    dto.joinDate = user.joinDate;
    dto.role = user.role;
    return dto;
  }
}

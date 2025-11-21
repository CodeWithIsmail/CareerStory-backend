import { z } from 'zod';
import { UserRole } from '../entities/User.ts';
import { UserValidator } from '../validators/userValidator.ts';

/**
 * Data Transfer Objects (DTOs) for User entity
 * --------------------------------------------
 * Defines the structure of data for creating, updating, and responding with User information.
 * Facilitates data validation and transformation between different layers of the application.
 */

export type CreateUserDto = z.infer<typeof UserValidator.createUserSchema>;
export type UpdateUserDto = z.infer<typeof UserValidator.updateUserSchema>;

export class UserResponseDto {
  id: string;
  userName: string;
  name: string;
  email: string;
  joinDate: Date;
  role: UserRole;
}

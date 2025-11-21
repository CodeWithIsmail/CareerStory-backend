import { z } from 'zod';
import { UserRole } from '../entities/User.ts';
import { createUserSchema, updateUserSchema } from '../validators/userValidator.ts';

/**
 * Data Transfer Objects (DTOs) for User entity
 * --------------------------------------------
 * Defines the structure of data for creating, updating, and responding with User information.
 * Facilitates data validation and transformation between different layers of the application.
 */

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export class UserResponseDto {
  id: string;
  userName: string;
  name: string;
  email: string;
  joinDate: Date;
  role: UserRole;
}

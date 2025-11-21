import { z } from 'zod';
import { UserRole } from '../entities/User.ts';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto.ts';

/**
 * UserValidator
 * ----------------
 * Validates incoming data for User entity operations.
 * Uses Zod schemas to enforce data integrity.
 * Provides methods to validate create, update, and parameter data.
 */
export class UserValidator {
  static createUserSchema = z.object({
    userName: z.string().min(3).max(50),
    name: z.string().min(3).max(100),
    email: z.email().max(255),
    role: z.enum(UserRole),
  });

  static updateUserSchema = z.object({
    userName: z.string().min(3).max(50).optional(),
    name: z.string().min(3).max(100).optional(),
    email: z.email().max(255).optional(),
    role: z.enum(UserRole).optional(),
  });

  static userIdParamSchema = z.object({
    userId: z.uuid(),
  });

  static validateCreateUser(data: unknown): CreateUserDto {
    return this.createUserSchema.parse(data);
  }

  static validateUpdateUser(data: unknown): UpdateUserDto {
    return this.updateUserSchema.parse(data);
  }

  static validateUserIdParam(params: unknown): string {
    return this.userIdParamSchema.parse(params).userId;
  }
}

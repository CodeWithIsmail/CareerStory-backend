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
    userName: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(50, 'Username must be at most 50 characters'),
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(100, 'Name must be at most 100 characters'),
    email: z.email().max(255),
    role: z.enum(UserRole),
  });

  static updateUserSchema = z
    .object({
      name: z
        .string()
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must be at most 100 characters')
        .optional(),
      role: z.enum(UserRole).optional(),
    })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    });

  static validateCreateUser(data: unknown): CreateUserDto {
    return this.createUserSchema.parse(data);
  }

  static validateUpdateUser(data: unknown): UpdateUserDto {
    return this.updateUserSchema.parse(data);
  }

  static validateUserIdParam(params: unknown): string {
    let userId = z.uuidv4().parse(params);
    return userId;
  }
}
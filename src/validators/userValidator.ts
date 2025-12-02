import { z } from 'zod';
import { UserRole } from '../entities/User.ts';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto.ts';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';

export class UserValidator {
  static createUserSchema = z
    .object({
      userName: z
        .string({ message: VALIDATION_MESSAGES.USER.USERNAME.REQUIRED })
        .regex(/^[a-zA-Z0-9_]+$/, VALIDATION_MESSAGES.USER.USERNAME.INVALID)
        .min(3, VALIDATION_MESSAGES.USER.USERNAME.MIN)
        .max(50, VALIDATION_MESSAGES.USER.USERNAME.MAX),

      name: z
        .string({ message: VALIDATION_MESSAGES.USER.NAME.REQUIRED })
        .trim()
        .min(3, VALIDATION_MESSAGES.USER.NAME.MIN)
        .max(100, VALIDATION_MESSAGES.USER.NAME.MAX),

      email: z
        .email({ message: VALIDATION_MESSAGES.USER.EMAIL.INVALID })
        .trim()
        .max(255, VALIDATION_MESSAGES.USER.EMAIL.MAX)
        .transform((email) => email.toLowerCase()),

      role: z
        .enum(UserRole, { message: VALIDATION_MESSAGES.USER.ROLE.INVALID })
        .default(UserRole.USER),
    })
    .strict();

  static updateUserSchema = this.createUserSchema
    .pick({ name: true })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
      message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD,
    });

  static validateCreateUser(data: unknown): CreateUserDto {
    return this.createUserSchema.parse(data);
  }

  static validateUserIdParam(params: unknown): string {
    return z.uuidv4(VALIDATION_MESSAGES.USER.USER_ID.INVALID).parse(params);
  }
}

import { z } from 'zod';
import { UserRole } from '../entities/User.ts';
import { CreateUserDto } from '../dto/userDto.ts';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { baseUserSchema } from './baseSchema.ts';

export class UserValidator {
  static createUserSchema = baseUserSchema
    .extend({
      role: z.enum(UserRole, { message: VALIDATION_MESSAGES.USER.ROLE.INVALID }).default(UserRole.USER),
    })
    .strict();

  static updateUserSchema = baseUserSchema.pick({ name: true }).strict();

  static validateCreateUser(data: unknown): CreateUserDto {
    return this.createUserSchema.parse(data);
  }

  static validateUserIdParam(params: unknown): string {
    return z.uuidv4(VALIDATION_MESSAGES.USER.USER_ID.INVALID).parse(params);
  }
}

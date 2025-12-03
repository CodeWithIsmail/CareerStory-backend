import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { LoginDto, SignupDto } from '../dto/authDto.ts';
import { basePasswordSchema, baseUserSchema } from './baseSchema.ts';
import { UserValidator } from '../validators/userValidator.ts';
export class AuthValidator {
  static signupSchema = baseUserSchema
    .extend({
      password: basePasswordSchema,
      confirmPassword: basePasswordSchema,
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
      message: VALIDATION_MESSAGES.PASSWORD.MISMATCH,
      path: ['confirmPassword'],
    });

  static loginSchema = this.signupSchema.pick({ userName: true, password: true }).strict();

  static tokenPayloadSchema = UserValidator.createUserSchema
    .extend({
      userId: z.uuidv4(),
    })
    .strict();

  static authResponseSchema = z
    .object({
      accessToken: z.string(),
      expiresIn: z.number(),
      user: this.tokenPayloadSchema,
    })
    .strict();

  static createAuthSchema = z
    .object({
      userId: z.uuidv4(),
      hashedPassword: z.string(),
    })
    .strict();

  static validateSignup(data: unknown): SignupDto {
    return this.signupSchema.parse(data);
  }
  static validateLogin(data: unknown): LoginDto {
    return this.loginSchema.parse(data);
  }
}

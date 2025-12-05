import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { LoginDto, SignupDto } from '../dto/authDto.ts';
import { basePasswordSchema, baseUserSchema } from './baseSchema.ts';
import { UserValidator } from '../validators/userValidator.ts';
import { UserRole } from '../entities/User.ts';
import { TOKEN_TYPE } from '../types/customTypes.ts';
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

  static tokenPayloadSchema = z
    .object({
      userId: z.uuidv4(),
      role: z.enum(UserRole),
      tokenType: z.enum(TOKEN_TYPE),
    })
    .strict();

  static authResponseSchema = z
    .object({
      accessToken: z.string(),
      expiresIn: z.number(),
      user: this.tokenPayloadSchema.omit({ tokenType: true }),
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

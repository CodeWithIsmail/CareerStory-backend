import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/validationMessages.ts';
import { UserRole } from '../entities/User.ts';
import { LoginDto, SignupDto } from '../dto/authDto.ts';

export class AuthValidator {
  static signupSchema = z
    .object({
      userName: z
        .string({ message: VALIDATION_MESSAGES.USER.USERNAME.REQUIRED })
        .regex(/^[a-zA-Z0-9_]+$/, VALIDATION_MESSAGES.USER.USERNAME.INVALID)
        .min(3, VALIDATION_MESSAGES.USER.USERNAME.MIN)
        .max(50, VALIDATION_MESSAGES.USER.USERNAME.MAX),

      email: z
        .email({ message: VALIDATION_MESSAGES.USER.EMAIL.INVALID })
        .trim()
        .max(255, VALIDATION_MESSAGES.USER.EMAIL.MAX)
        .transform((email) => email.toLowerCase()),

      name: z
        .string({ message: VALIDATION_MESSAGES.USER.NAME.REQUIRED })
        .trim()
        .min(3, VALIDATION_MESSAGES.USER.NAME.MIN)
        .max(100, VALIDATION_MESSAGES.USER.NAME.MAX),

      password: z
        .string({ message: VALIDATION_MESSAGES.PASSWORD.REQUIRED })
        .trim()
        .min(6, VALIDATION_MESSAGES.PASSWORD.MIN)
        .max(128, VALIDATION_MESSAGES.PASSWORD.MAX),

      confirmPassword: z.string({ message: VALIDATION_MESSAGES.PASSWORD.REQUIRED }).trim(),
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
      message: VALIDATION_MESSAGES.PASSWORD.MISMATCH,
      path: ['confirmPassword'],
    });

  static loginSchema = z
    .object({
      userName: z.string({ message: VALIDATION_MESSAGES.USER.USERNAME.REQUIRED }),
      password: z.string({ message: VALIDATION_MESSAGES.PASSWORD.REQUIRED }),
    })
    .strict();

  static tokenPayloadSchema = z
    .object({
      userId: z.uuidv4(),
      userName: z.string(),
      email: z.email(),
      name: z.string(),
      role: z.enum(UserRole),
    })
    .strict();

  static authResponseSchema = z
    .object({
      accessToken: z.string(),
      expiresIn: z.number(),
      user: z.object({
        userId: z.uuidv4(),
        userName: z.string(),
        email: z.email(),
        name: z.string(),
        role: z.enum(UserRole),
      }),
    })
    .strict();

  static createAuthSchema = z.object({
    userId: z.uuidv4(),
    passwordHash: z.string(),
  }).strict();



  static validateSignup(data: unknown): SignupDto {
    return this.signupSchema.parse(data);
  }
  static validateLogin(data: unknown): LoginDto {
    return this.loginSchema.parse(data);
  }
}

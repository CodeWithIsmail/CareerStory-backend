import { z } from 'zod';
import { createUserSchema, updateUserSchema, userResponseSchema } from '../validators/userValidator.ts';

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type UserResponseDto = z.infer<typeof userResponseSchema>;

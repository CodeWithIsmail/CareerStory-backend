import { z } from 'zod';
import { UserRole } from '../entities/User.ts';

export const createUserSchema = z.object({
  userName: z.string().min(3).max(50),
  name: z.string().min(3).max(100),
  email: z.email().max(255),
  role: z.enum(UserRole),
});

export const updateUserSchema = z.object({
  userName: z.string().min(3).max(50).optional(),
  name: z.string().min(3).max(100).optional(),
  email: z.email().max(255).optional(),
  role: z.enum(UserRole).optional(),
});

export const userIdParamSchema = z.object({
  userId: z.uuid(),
});

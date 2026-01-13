import { z } from 'zod';
import {
  createUserSchema,
  userProfileSchema,
  updateUserProfileSchema,
  updateUserStatusSchema,
  updateUserRoleSchema,
} from '../validators/userValidator.ts';

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UserProfileDto = z.infer<typeof userProfileSchema>;
export type UpdateUserProfileDto = z.infer<typeof updateUserProfileSchema>;
export type UpdateUserStatusDto = z.infer<typeof updateUserStatusSchema>;
export type UpdateUserRoleDto = z.infer<typeof updateUserRoleSchema>;

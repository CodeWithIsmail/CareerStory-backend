import { z } from 'zod';
import { UserRole } from '../entities/User.ts';
import { UserValidator } from '../validators/userValidator.ts';

export type CreateUserDto = z.infer<typeof UserValidator.createUserSchema>;
export type UpdateUserDto = z.infer<typeof UserValidator.updateUserSchema>;

export class UserResponseDto {
  userId: string;
  userName: string;
  name: string;
  email: string;
  joinDate: Date;
  role: UserRole;
}

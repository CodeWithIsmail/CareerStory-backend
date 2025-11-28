import { z } from 'zod';
import { UserRole } from '../entities/User.ts';
import { UserValidator } from '../validators/userValidator.ts';
import { Expose } from 'class-transformer';

export type CreateUserDto = z.infer<typeof UserValidator.createUserSchema>;
export type UpdateUserDto = z.infer<typeof UserValidator.updateUserSchema>;

export class UserResponseDto {
  @Expose()
  userId: string;
  @Expose()
  userName: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  joinDate: Date;
  @Expose()
  role: UserRole;
}

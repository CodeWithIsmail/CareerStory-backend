import { SignupDto } from '../dto/authDto.ts';
import { CreateUserDto } from '../dto/userDto.ts';
import { UserRole } from '../entities/User.ts';

export const mapSignupToCreateUser = (signup: SignupDto): CreateUserDto => ({
  userName: signup.userName,
  name: signup.name,
  email: signup.email,
  role: UserRole.USER,
});

import { CreateAuthDto, SignupDto } from '../dto/authDto.ts';
import { CreateUserDto } from '../dto/userDto.ts';
import { Auth } from '../entities/Auth.ts';
import { User, UserRole } from '../entities/User.ts';

export const mapSignupToCreateUser = (signup: SignupDto): CreateUserDto => ({
  userName: signup.userName,
  name: signup.name,
  email: signup.email,
  role: UserRole.USER,
});

// export const mapCreateAuthDtoToEntity = (dto: CreateAuthDto, user: UserResponseDto): Auth => {
//   const auth = new Auth();
//   auth.userId = dto.userId;
//   auth.hashedPassword = dto.passwordHash;
//   auth.user = user; // attach existing User entity
//   return auth;
// };

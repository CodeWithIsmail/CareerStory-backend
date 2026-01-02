import { CreateAuthDto, SignupDto } from '../dto/authDto.ts';
import { CreateUserDto } from '../dto/userDto.ts';
import { generateHashedPassword } from '../utils/passwordUtils.ts';

export const mapSignupToCreateUser = (signup: SignupDto): CreateUserDto => ({
  userName: signup.userName,
  name: signup.name,
  email: signup.email,
});

export const mapSignUpToCreateAuth = async (userId: string, password: string): Promise<CreateAuthDto> => ({
  userId: userId,
  hashedPassword: await generateHashedPassword(password),
});

export const updatePasswordField = (hashedPassword: string, passwordLastModificationTime: Date) => ({
  hashedPassword,
  passwordLastModificationTime,
});

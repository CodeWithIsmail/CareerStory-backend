import { CreateAuthDto, SignupDto } from '../dto/authDto.ts';
import { CreateUserDto } from '../dto/userDto.ts';
import { UserRole } from '../entities/User.ts';
import { DateOrNull, StringOrNull } from '../types/customTypes.ts';
import { generateHashedPassword } from '../utils/passwordUtils.ts';

export const mapSignupToCreateUser = (signup: SignupDto): CreateUserDto => ({
  userName: signup.userName,
  name: signup.name,
  email: signup.email,
  role: UserRole.USER,
  isEmailVerified: false,
});

export const mapSignUpToCreateAuth = async (userId: string, password: string): Promise<CreateAuthDto> => ({
  userId: userId,
  hashedPassword: await generateHashedPassword(password),
});

export const resetPasswordChangeFields = (code: StringOrNull = null, expiresAt: DateOrNull = null) => ({
  passwordChangeCode: code,
  passwordChangeCodeExpiresAt: expiresAt,
  passwordChangeCodeVerified: false,
  passwordChangeCodeVerifiedAt: null,
});

export const updatePasswordField = (hashedPassword: string, passwordLastModificationTime: Date) => ({
  hashedPassword,
  passwordLastModificationTime,
  ...resetPasswordChangeFields(null, null),
});

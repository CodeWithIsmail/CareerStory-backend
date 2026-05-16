import jwt from 'jsonwebtoken';
import { ENV } from '../config/environment.ts';
import { CONTEXT } from '../constants/context.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import {
  AuthResponseDto,
  ChangePasswordDto,
  CreateAuthDto,
  LoginDto,
  SignupDto,
  TokenPayloadDto,
} from '../dto/authDto.ts';
import { UserProfileDto } from '../dto/userDto.ts';
import { Auth } from '../entities/Auth.ts';
import { BadRequestError, DatabaseError, UnauthorizedError } from '../errors/CustomErrors.ts';
import { mapSignUpToCreateAuth, mapSignupToCreateUser, updateAuthMapper } from '../mappers/authMapper.ts';
import { AuthRepository } from '../repositories/authRepository.ts';
import { TOKEN_TYPE } from '../types/customTypes.ts';
import { sendPasswordChangeConfirmationEmail, sendVerificationEmail } from '../utils/emailUtils.ts';
import { generateHashedPassword, validateUserPassword } from '../utils/passwordUtils.ts';
import { generateToken, generateTokenError } from '../utils/tokenUtils.ts';
import { UserService } from './userService.ts';

export class AuthService {
  private userService = new UserService();
  private authRepository = new AuthRepository();

  async signup(signupDto: SignupDto): Promise<UserProfileDto> {
    const createUserDto = mapSignupToCreateUser(signupDto);
    const newUser = await this.userService.createUser(createUserDto);
    const authData: CreateAuthDto = await mapSignUpToCreateAuth(newUser.userId, signupDto.password);
    await this.authRepository.createAuth(authData);
    // await this.sendVerificationEmail(newUser);
    return newUser;
  }

  async sendVerificationEmail(newUser: UserProfileDto): Promise<void> {
    const emailVerificationToken = generateToken(newUser, TOKEN_TYPE.EMAIL_VERIFICATION);
    await sendVerificationEmail(newUser, emailVerificationToken);
  }

  async resendConfirmationEmail(userName: string): Promise<void> {
    const user = await this.userService.getUserByUsername(userName);
    if (user.isEmailVerified) {
      throw new BadRequestError(
        ERROR_MESSAGES.AUTH.EMAIL_ALREADY_VERIFIED,
        CONTEXT.AUTH.RESEND_CONFIRMATION_EMAIL,
      );
    }
    await this.sendVerificationEmail(user);
  }

  async confirmEmail(token: string): Promise<void> {
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as TokenPayloadDto;
      if (decoded.tokenType !== TOKEN_TYPE.EMAIL_VERIFICATION) {
        throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, CONTEXT.AUTH.CONFIRM_EMAIL);
      }
      const userId = decoded.userId;
      await this.userService.updateUser(userId, { isEmailVerified: true });
    } catch (error) {
      generateTokenError(error);
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.getUserByUsername(loginDto.userName);
    if (!user.isEmailVerified) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTH.EMAIL_NOT_VERIFIED, CONTEXT.AUTH.LOGIN);
    }
    const auth = await this.getAuthByUserId(user.userId, CONTEXT.AUTH.LOGIN);
    await validateUserPassword(loginDto.password, auth.hashedPassword, CONTEXT.AUTH.LOGIN);

    const accessToken = generateToken(user, TOKEN_TYPE.AUTH);
    return {
      accessToken,
      expiresIn: ENV.AUTH_JWT_EXPIRES_IN,
      user,
    };
  }

  async getAuthByUserId(userId: number, context: string): Promise<Auth> {
    const auth = await this.authRepository.getAuthByUserId(userId);
    if (!auth) {
      throw new UnauthorizedError(ERROR_MESSAGES.USER.UNAUTHORIZED, context);
    }
    return auth;
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<void> {
    const { currentPassword, newPassword } = changePasswordDto;

    const auth = await this.getAuthByUserId(userId, CONTEXT.AUTH.CHANGE_PASSWORD);
    await validateUserPassword(currentPassword, auth.hashedPassword, CONTEXT.AUTH.CHANGE_PASSWORD);

    const hashedNewPassword = await generateHashedPassword(newPassword);
    const lastModificationTime = new Date();

    const updateData = updateAuthMapper(hashedNewPassword, lastModificationTime);

    const result = await this.authRepository.updatePassword(userId, updateData);

    if (!result) {
      throw new DatabaseError(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.UPDATE_FAILED,
        CONTEXT.AUTH.CHANGE_PASSWORD,
      );
    }

    await sendPasswordChangeConfirmationEmail(
      result.user.userName,
      result.user.email,
      lastModificationTime.toLocaleString(),
    );
  }
}

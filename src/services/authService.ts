import { SignupDto, LoginDto, AuthResponseDto, CreateAuthDto, TokenPayloadDto } from '../dto/authDto.ts';
import { mapSignUpToCreateAuth, mapSignupToCreateUser } from '../mappers/authMapper.ts';
import { UserService } from './userService.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import { ENV } from '../config/environment.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { generateToken, generateTokenError } from '../utils/tokenUtils.ts';
import { AuthRepository } from '../repositories/authRepository.ts';
import { AuthOrNull, TOKEN_TYPE } from '../types/customTypes.ts';
import {
  generateHashedPassword,
  generatePasswordChangeCode,
  isPasswordChangeCodeExpired,
  validateUserPassword,
} from '../utils/passwordUtils.ts';
import {
  sendPasswordChangeCodeEmail,
  sendPasswordChangeConfirmationEmail,
  sendVerificationEmail,
} from '../utils/emailUtils.ts';
import jwt from 'jsonwebtoken';
import { CONTEXT } from '../constants/context.ts';
import { DatabaseError, UnauthorizedError } from '../errors/CustomErrors.ts';

export class AuthService {
  private userService = new UserService();
  private authRepository = new AuthRepository();

  async signup(signupDto: SignupDto): Promise<UserResponseDto> {
    const createUserDto = mapSignupToCreateUser(signupDto);
    const newUser = await this.userService.createUser(createUserDto);
    const authData: CreateAuthDto = await mapSignUpToCreateAuth(newUser.userId, signupDto.password);
    await this.authRepository.createAuth(authData);
    await this.sendVerificationEmail(newUser);
    return newUser;
  }

  async sendVerificationEmail(newUser: UserResponseDto): Promise<void> {
    const emailVerificationToken = generateToken(newUser, TOKEN_TYPE.EMAIL_VERIFICATION);
    await sendVerificationEmail(newUser, emailVerificationToken);
  }

  async resendConfirmationEmail(userName: string): Promise<void> {
    const user = await this.userService.getUserByUsername(userName);
    await this.sendVerificationEmail(user);
  }

  async confirmEmail(token: string): Promise<void> {
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as TokenPayloadDto;
      if (decoded.tokenType !== TOKEN_TYPE.EMAIL_VERIFICATION) {
        throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, CONTEXT.AUTH.CONFIRM_EMAIL);
      }
      const userId = decoded.userId;
      await this.userService.updateEmailVerificationStatus(userId);
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

  async getAuthByUserId(userId: string, context: string): Promise<AuthOrNull> {
    const auth = await this.authRepository.getAuthByUserId(userId);
    if (!auth) {
      throw new UnauthorizedError(ERROR_MESSAGES.USER.UNAUTHORIZED, context);
    }
    return auth;
  }

  async initiatePasswordChange(userId: string, currentPassword: string): Promise<void> {
    const auth = await this.getAuthByUserId(userId, CONTEXT.AUTH.CHANGE_PASSWORD_INITIATE);
    await validateUserPassword(currentPassword, auth.hashedPassword, CONTEXT.AUTH.CHANGE_PASSWORD_INITIATE);

    const verificationCode = generatePasswordChangeCode();
    const expiresAt = new Date(Date.now() + ENV.PASSWORD_CHANGE_CODE_EXPIRES_IN * 1000);

    const result = await this.authRepository.storePasswordChangeCode(userId, verificationCode, expiresAt);

    if (!result) {
      throw new DatabaseError(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.UPDATE_FAILED,
        CONTEXT.AUTH.CHANGE_PASSWORD_INITIATE,
      );
    }

    const user = await this.userService.getUserById(userId);
    await sendPasswordChangeCodeEmail(user.userName, user.email, verificationCode);
  }

  async verifyPasswordChangeCode(userId: string, code: string): Promise<void> {
    const auth = await this.getAuthByUserId(userId, CONTEXT.AUTH.CHANGE_PASSWORD_VERIFY);
    console.log(auth);
    if (!auth.passwordChangeCode || !auth.passwordChangeCodeExpiresAt) {
      throw new UnauthorizedError(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.CODE_INVALID,
        CONTEXT.AUTH.CHANGE_PASSWORD_VERIFY,
      );
    }

    const isExpired = isPasswordChangeCodeExpired(auth.passwordChangeCodeExpiresAt);
    if (isExpired) {
      await this.authRepository.clearPasswordChangeCode(userId);
      throw new UnauthorizedError(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.CODE_EXPIRED,
        CONTEXT.AUTH.CHANGE_PASSWORD_VERIFY,
      );
    }

    const isCodeValid = auth.passwordChangeCode === code;
    if (!isCodeValid) {
      throw new UnauthorizedError(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.CODE_INVALID,
        CONTEXT.AUTH.CHANGE_PASSWORD_VERIFY,
      );
    }

    const result = await this.authRepository.verifyPasswordChangeCode(userId);
    if (!result) {
      throw new DatabaseError(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.UPDATE_FAILED,
        CONTEXT.AUTH.CHANGE_PASSWORD_VERIFY,
      );
    }
  }

  async setNewPassword(userId: string, newPassword: string): Promise<void> {
    const auth = await this.getAuthByUserId(userId, CONTEXT.AUTH.CHANGE_PASSWORD_SET);

    if (!auth.passwordChangeCodeVerified) {
      throw new UnauthorizedError(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.CODE_NOT_VERIFIED,
        CONTEXT.AUTH.CHANGE_PASSWORD_SET,
      );
    }

    if (isPasswordChangeCodeExpired(auth.passwordChangeCodeExpiresAt!)) {
      throw new UnauthorizedError(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.CODE_EXPIRED,
        CONTEXT.AUTH.CHANGE_PASSWORD_SET,
      );
    }

    const hashedNewPassword = await generateHashedPassword(newPassword);
    const lastModificationTime = new Date();

    const result = await this.authRepository.updatePassword(userId, hashedNewPassword, lastModificationTime);
    if (!result) {
      throw new DatabaseError(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.UPDATE_FAILED,
        CONTEXT.AUTH.CHANGE_PASSWORD_SET,
      );
    }

    const user = await this.userService.getUserById(userId);
    await sendPasswordChangeConfirmationEmail(
      user.userName,
      user.email,
      lastModificationTime.toLocaleString(),
    );
  }
}

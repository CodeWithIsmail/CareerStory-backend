import { SignupDto, LoginDto, AuthResponseDto, CreateAuthDto, TokenPayloadDto } from '../dto/authDto.ts';
import { mapSignUpToCreateAuth, mapSignupToCreateUser } from '../mappers/authMapper.ts';
import { UserService } from './userService.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import { ENV } from '../config/environment.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { generateToken } from '../utils/tokenUtils.ts';
import { AuthRepository } from '../repositories/authRepository.ts';
import { AuthOrNull, TOKEN_TYPE } from '../types/customTypes.ts';
import { validateUserPassword } from '../utils/passwordUtils.ts';
import { sendVerificationEmail } from '../utils/emailUtils.ts';
import jwt from 'jsonwebtoken';

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
        throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 'confirming email');
      }
      const userId = decoded.userId;
      await this.userService.updateEmailVerificationStatus(userId);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError)
        throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.TOKEN_EXPIRED, 'confirming email');
      if (error instanceof jwt.JsonWebTokenError)
        throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 'confirming email');
      else throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 'confirming email');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.getUserByUsername(loginDto.userName);
    if (!user.isEmailVerified) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.EMAIL_NOT_VERIFIED, 'login');
    }
    const auth = await this.getAuthByUserId(user.userId);
    const isValid = await validateUserPassword(loginDto.password, auth.hashedPassword);
    if (!isValid) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INCORRECT_PASSWORD, 'login');
    }
    const accessToken = generateToken(user, TOKEN_TYPE.AUTH);
    return {
      accessToken,
      expiresIn: ENV.AUTH_JWT_EXPIRES_IN,
      user,
    };
  }

  async getAuthByUserId(userId: string): Promise<AuthOrNull> {
    const auth = await this.authRepository.getAuthByUserId(userId);
    if (!auth) {
      throw ErrorFactory.createUnauthorizedError(
        ERROR_MESSAGES.USER.UNAUTHORIZED,
        `fetching auth for user ID ${userId}`,
      );
    }
    return auth;
  }
}

import bcrypt from 'bcrypt';
import { SignupDto, LoginDto, AuthResponse, CreateAuthDto } from '../dto/authDto.ts';
import { mapSignupToCreateUser } from '../mappers/authMapper.ts';
import { UserService } from './userService.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import { ENV } from '../config/environment.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { generateAccessToken } from '../utils/tokenUtils.ts';
import { AuthRepository } from '../repositories/authRepository.ts';
import { AuthOrNull } from '../types/customTypes.ts';
import { AppDataSource } from '../dataSource.ts';
import { EntityManager } from 'typeorm';

export class AuthService {
  private userService = new UserService();
  private authRepository = new AuthRepository();

  async signup(signupDto: SignupDto): Promise<UserResponseDto> {
    return AppDataSource.transaction(async (entityManager) => {
      const createUserDto = mapSignupToCreateUser(signupDto);
      const newUser = await this.userService.createUser(createUserDto, entityManager);

      const hashedPassword = await bcrypt.hash(signupDto.password, ENV.SALT_ROUNDS);
      const authData: CreateAuthDto = { userId: newUser.userId, hashedPassword };
      await this.authRepository.createAuth(authData, entityManager);
      return newUser;
    });
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.userService.getUserByUsername(loginDto.userName, true);
    const auth = await this.getAuthByUserId(user.userId);
    const isValid = await bcrypt.compare(loginDto.password, auth.hashedPassword);
    if (!isValid) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, 'during login');
    }
    const accessToken = generateAccessToken(user);
    return {
      accessToken,
      expiresIn: ENV.JWT_EXPIRES_IN,
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

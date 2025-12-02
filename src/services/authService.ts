import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { SignupDto, LoginDto, AuthResponse, TokenPayload } from '../dto/authDto.ts';
import { mapSignupToCreateUser } from '../mappers/authMapper.ts';
import { UserService } from './userService.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import { ENV } from '../config/environment.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';

export class AuthService {
  private userService = new UserService();
  private saltRounds = 10;
  private jwtSecret = ENV.JWT_SECRET || 'secret';
  private tokenExpiry = '30d'; // 1 month

  async signup(signupDto: SignupDto): Promise<UserResponseDto> {
    const createUserDto = mapSignupToCreateUser(signupDto);

    const hashedPassword = await bcrypt.hash(signupDto.password, this.saltRounds);

    const newUser = await this.userService.createUser(createUserDto);

    // Save hashed password in Auth repository
    await this.userService.createAuth({
      userId: newUser.userId,
      hashedPassword,
    });

    return newUser;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    // Get user by username
    const user = await this.userService.getUserByUsername(loginDto.userName);
    if (!user) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, 'login');
    }

    // Get password hash from Auth table
    const auth = await this.userService.getAuthByUserId(user.userId);
    if (!auth) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, 'login');
    }

    // Compare passwords
    const isValid = await bcrypt.compare(loginDto.password, auth.hashedPassword);
    if (!isValid) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, 'login');
    }

    // Generate JWT token
    const payload: TokenPayload = {
      userId: user.userId,
      userName: user.userName,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.tokenExpiry,
    } as SignOptions);

    return {
      accessToken,
      expiresIn: 30 * 24 * 60 * 60, // in seconds
      user,
    };
  }
}

import bcrypt from 'bcrypt';
import { AppDataSource } from '../dataSource.ts';
import { User } from '../entities/User.ts';
import { Auth } from '../entities/Auth.ts';
import { SignupDto, LoginDto } from '../dto/authDto.ts';
import { UserRepository } from '../repositories/userRepository.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import { mapSignupToCreateUser } from '../mappers/authMapper.ts';
import { mapUserToDto } from '../mappers/userMapper.ts';
const SALT_ROUNDS = 10;

export class AuthService {
  private userRepository = new UserRepository();
  private authRepository = AppDataSource.getRepository(Auth);

  async signup(data: SignupDto): Promise<UserResponseDto> {
    const existingUserByEmail = await this.userRepository.getUserByEmail(data.email);
    if (existingUserByEmail) {
      throw ErrorFactory.createConflictError(ERROR_MESSAGES.USER.DUPLICATE_EMAIL, 'signup');
    }

    const existingUserByUsername = await this.userRepository.getUserByUsername(data.userName);
    if (existingUserByUsername) {
      throw ErrorFactory.createConflictError(ERROR_MESSAGES.USER.DUPLICATE_USERNAME, 'signup');
    }

    const createUserData = mapSignupToCreateUser(data);
    const newUser = await this.userRepository.createUser(createUserData);

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const auth = this.authRepository.create({
      userId: newUser.userId,
      hashedPassword,
    });
    await this.authRepository.save(auth);

    return mapUserToDto(newUser);
  }

  async login(data: LoginDto): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserByUsername(data.userName);
    if (!user) {
      throw ErrorFactory.createNotFoundError(
        ERROR_MESSAGES.USER.NOT_FOUND,
        'login: username not found',
      );
    }

    const auth = await this.authRepository.findOne({ where: { userId: user.userId } });
    if (!auth) {
      throw ErrorFactory.createNotFoundError(
        ERROR_MESSAGES.USER.NOT_FOUND,
        'login: auth entry not found',
      );
    }

    const isMatch = await bcrypt.compare(data.password, auth.hashedPassword);
    if (!isMatch) {
      throw ErrorFactory.createConflictError(ERROR_MESSAGES.PASSWORD.INCORRECT, 'login');
    }

    return mapUserToDto(user);
  }
}

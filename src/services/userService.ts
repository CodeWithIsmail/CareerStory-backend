import { UserRepository } from '../repositories/userRepository.ts';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/userDto.ts';
import { mapUsersToDtoList, mapUserToDto } from '../utils/userMapper.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { constantErrorMessages } from '../constants/errorMessages.ts';
import logger from '../utils/logger.ts';
import { log } from 'console';
/**
 * UserService
 * ----------------
 * Contains business logic related to User entity.
 * Interacts with UserRepository for data access.
 */

export class UserService {
  private userRepository = new UserRepository();

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    logger.debug('Creating a new user', { user });

    const existingEmailUser = await this.userRepository.getUserByEmail(user.email);
    if (existingEmailUser) {
      logger.warn('Email already exists', { email: user.email });
      throw ErrorFactory.createConflictError('email', 'creating user');
    }

    const existingUsernameUser = await this.userRepository.getUserByUsername(user.userName);
    if (existingUsernameUser) {
      logger.warn('Username already exists', { userName: user.userName });
      throw ErrorFactory.createConflictError('username', 'creating user');
    }

    const newUser = await this.userRepository.createUser(user);
    if (!newUser) {
      logger.error('Failed to create user', { user });
      throw ErrorFactory.createDatabaseError(
        constantErrorMessages.USER.INTERNAL_SERVER_ERROR,
        'creating user',
      );
    }
    logger.info('User created successfully', { newUser });
    return mapUserToDto(newUser);
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    logger.debug('Fetching all users');
    const users = await this.userRepository.getAllUsers();
    logger.info('Users fetched successfully', { userCount: users.length });
    return mapUsersToDtoList(users);
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    logger.debug('Fetching user', { userId: id });
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      logger.warn('User not found', { userId: id });
      throw ErrorFactory.createNotFoundError(
        constantErrorMessages.USER.NOT_FOUND,
        `fetching user with ID ${id}`,
      );
    }
    logger.info('User fetched successfully', { userId: id });
    return mapUserToDto(user);
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    logger.debug('Updating user', { userId: id, updateData });
    const updatedUser = await this.userRepository.updateUser(id, updateData);
    if (!updatedUser) {
      logger.warn('User not found for update', { userId: id });
      throw ErrorFactory.createNotFoundError(
        constantErrorMessages.USER.NOT_FOUND,
        `updating user with ID ${id}`,
      );
    }
    logger.info('User updated successfully', { userId: id });
    return mapUserToDto(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    logger.debug('Deleting user', { userId: id });
    const result = await this.userRepository.deleteUser(id);
    if (result.affected === 0) {
      logger.warn('User not found for deletion', { userId: id });
      throw ErrorFactory.createNotFoundError(
        constantErrorMessages.USER.NOT_FOUND,
        `deleting user with ID ${id}`,
      );
    }
    logger.info('User deleted successfully', { userId: id });
  }
}

import { UserRepository } from '../repositories/userRepository.ts';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/userDto.ts';
import { mapUsersToDtoList, mapUserToDto } from '../mappers/userMapper.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import logger from '../utils/logger.ts';
import { LOG_MESSAGES } from '../constants/logMessages.ts';
import { UserPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginatedResponse } from '../types/customTypes.ts';
import { LoginDto } from '../dto/authDto.ts';
import { AuthRepository } from '../repositories/authRepository.ts';

export class UserService {
  private userRepository = new UserRepository();
  private authRepository = new AuthRepository();

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    logger.debug(LOG_MESSAGES.USER.CREATE.START, { user });

    const existingEmailUser = await this.userRepository.getUserByEmail(user.email);
    if (existingEmailUser) {
      logger.warn(LOG_MESSAGES.USER.CREATE.DUPLICATE_EMAIL, { email: user.email });
      throw ErrorFactory.createConflictError(ERROR_MESSAGES.USER.DUPLICATE_EMAIL, 'creating user');
    }

    const existingUsernameUser = await this.userRepository.getUserByUsername(user.userName);
    if (existingUsernameUser) {
      logger.warn(LOG_MESSAGES.USER.CREATE.DUPLICATE_USERNAME, { userName: user.userName });
      throw ErrorFactory.createConflictError(
        ERROR_MESSAGES.USER.DUPLICATE_USERNAME,
        'creating user',
      );
    }

    const newUser = await this.userRepository.createUser(user);
    if (!newUser) {
      logger.error(LOG_MESSAGES.USER.CREATE.FAILED, { user });
      throw ErrorFactory.createDatabaseError(
        ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR,
        'creating user',
      );
    }
    logger.info(LOG_MESSAGES.USER.CREATE.SUCCESS, { newUser });
    return mapUserToDto(newUser);
  }

  async getAllUsers(
    paginationParams: UserPaginationQuery,
  ): Promise<PaginatedResponse<UserResponseDto>> {
    logger.debug(LOG_MESSAGES.USER.FETCH.ALL_START);
    const paginatedUsers = await this.userRepository.getAllUsers(paginationParams);
    logger.info(LOG_MESSAGES.USER.FETCH.ALL_SUCCESS, {
      userCount: paginatedUsers.data.length,
      page: paginatedUsers.pagination.currentPage,
      totalItems: paginatedUsers.pagination.totalItems,
    });
    return {
      data: mapUsersToDtoList(paginatedUsers.data),
      pagination: paginatedUsers.pagination,
    };
  }

  async getUserById(userId: string): Promise<UserResponseDto> {
    logger.debug(LOG_MESSAGES.USER.FETCH.BY_ID_START, { userId });
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      logger.warn(LOG_MESSAGES.USER.FETCH.BY_ID_NOT_FOUND, { userId });
      throw ErrorFactory.createNotFoundError(
        ERROR_MESSAGES.USER.NOT_FOUND,
        `fetching user with ID ${userId}`,
      );
    }
    logger.info(LOG_MESSAGES.USER.FETCH.BY_ID_SUCCESS, { userId });
    return mapUserToDto(user);
  }

  async updateUser(userId: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    logger.debug(LOG_MESSAGES.USER.UPDATE.START, { userId, updateData });
    const updatedUser = await this.userRepository.updateUser(userId, updateData);
    if (!updatedUser) {
      logger.warn(LOG_MESSAGES.USER.UPDATE.NOT_FOUND_UPDATE, { userId });
      throw ErrorFactory.createNotFoundError(
        ERROR_MESSAGES.USER.NOT_FOUND,
        `updating user with ID ${userId}`,
      );
    }
    logger.info(LOG_MESSAGES.USER.UPDATE.SUCCESS, { userId });
    return mapUserToDto(updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    logger.debug(LOG_MESSAGES.USER.DELETE.START, { userId });
    const result = await this.userRepository.deleteUser(userId);
    if (result.affected === 0) {
      logger.warn(LOG_MESSAGES.USER.DELETE.NOT_FOUND_DELETE, { userId });
      throw ErrorFactory.createNotFoundError(
        ERROR_MESSAGES.USER.NOT_FOUND,
        `deleting user with ID ${userId}`,
      );
    }
    logger.info(LOG_MESSAGES.USER.DELETE.SUCCESS, { userId });
  }

  async createAuth(authData: { userId: string; hashedPassword: string }) {
    return this.authRepository.createAuth(authData);
  }

  async getAuthByUserId(userId: string) {
    return this.authRepository.getAuthByUserId(userId);
  }

  async getUserByUsername(userName: string) {
    return this.userRepository.getUserByUsername(userName);
  }
}

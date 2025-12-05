import { UserRepository } from '../repositories/userRepository.ts';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/userDto.ts';
import { mapUsersToDtoList, mapUserToDto } from '../mappers/userMapper.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { UserPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginatedResponse, UserOrNull } from '../types/customTypes.ts';
import { EntityManager } from 'typeorm';
import { checkForDuplicateUser } from '../utils/userUtils.ts';

export class UserService {
  private userRepository = new UserRepository();

  async createUser(user: CreateUserDto, entityManager: EntityManager): Promise<UserResponseDto> {
    const context = 'creating user';
    const isExistingUser = await this.userRepository.getUserByUsernameOrEmail(user.email, user.userName);
    checkForDuplicateUser(isExistingUser, user, context);
    const newUser = await this.userRepository.createUser(user, entityManager);
    if (!newUser) {
      throw ErrorFactory.createDatabaseError(ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR, context);
    }
    return mapUserToDto(newUser);
  }

  async getAllUsers(paginationParams: UserPaginationQuery): Promise<PaginatedResponse<UserResponseDto>> {
    const paginatedUsers = await this.userRepository.getAllUsers(paginationParams);
    return {
      data: mapUsersToDtoList(paginatedUsers.data),
      pagination: paginatedUsers.pagination,
    };
  }

  async getUserById(userId: string): Promise<UserResponseDto> {
    const context = `fetching user with ID ${userId}`;
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, context);
    }
    return mapUserToDto(user);
  }

  async getUserForAuthByUsername(userName: string): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserByUsername(userName);
    const context = `fetching user with username ${userName}`;
    if (!user) {
      throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.USER.UNAUTHORIZED, context);
    }
    return mapUserToDto(user);
  }

  async updateUser(userId: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    const context = `updating user with ID ${userId}`;
    const updatedUser = await this.userRepository.updateUser(userId, updateData);
    if (!updatedUser) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, context);
    }
    return mapUserToDto(updatedUser);
  }

  async updateEmailVerificationStatus(userId: string): Promise<UserResponseDto> {
    const context = `updating email verification status for user with ID ${userId}`;
    const updatedUser = await this.userRepository.updateEmailVerificationStatus(userId);
    if (!updatedUser) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, context);
    }
    return mapUserToDto(updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    const context = `deleting user with ID ${userId}`;
    const result = await this.userRepository.deleteUser(userId);
    if (result.affected === 0) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, context);
    }
  }
}

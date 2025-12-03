import { UserRepository } from '../repositories/userRepository.ts';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/userDto.ts';
import { mapUsersToDtoList, mapUserToDto } from '../mappers/userMapper.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { UserPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginatedResponse } from '../types/customTypes.ts';
import { EntityManager } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { Auth } from '../entities/Auth.ts';
import { AuthService } from './authService.ts';
import { User } from '../entities/User.ts';

export class UserService {
  private userRepository = new UserRepository();

  async createUser(user: CreateUserDto, entityManager: EntityManager): Promise<UserResponseDto> {
    const existingEmailUser = await this.userRepository.getUserByEmail(user.email);
    if (existingEmailUser) {
      throw ErrorFactory.createConflictError(ERROR_MESSAGES.USER.DUPLICATE_EMAIL, 'creating user');
    }
    const existingUsernameUser = await this.userRepository.getUserByUsername(user.userName);
    if (existingUsernameUser) {
      throw ErrorFactory.createConflictError(ERROR_MESSAGES.USER.DUPLICATE_USERNAME, 'creating user');
    }
    const newUser = await this.userRepository.createUser(user, entityManager);
    if (!newUser) {
      throw ErrorFactory.createDatabaseError(ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR, 'creating user');
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
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw ErrorFactory.createNotFoundError(
        ERROR_MESSAGES.USER.NOT_FOUND,
        `fetching user with ID ${userId}`,
      );
    }
    return mapUserToDto(user);
  }

  async updateUser(userId: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.updateUser(userId, updateData);
    if (!updatedUser) {
      throw ErrorFactory.createNotFoundError(
        ERROR_MESSAGES.USER.NOT_FOUND,
        `updating user with ID ${userId}`,
      );
    }
    return mapUserToDto(updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    await AppDataSource.transaction(async (entityManager) => {
      const userRepo = entityManager.getRepository(User);

      const user = await userRepo.findOne({
        where: { userId },
        relations: ['auth'],
      });

      if (!user) {
        throw ErrorFactory.createNotFoundError(
          ERROR_MESSAGES.USER.NOT_FOUND,
          `deleting user with ID ${userId}`,
        );
      }

      await userRepo.softRemove(user);
    });
  }

  async getUserByUsername(userName: string, forAuth = false): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserByUsername(userName);
    if (!user) {
      throw forAuth
        ? ErrorFactory.createUnauthorizedError(
            ERROR_MESSAGES.USER.UNAUTHORIZED,
            `fetching user with username ${userName}`,
          )
        : ErrorFactory.createNotFoundError(
            ERROR_MESSAGES.USER.NOT_FOUND,
            `fetching user with username ${userName}`,
          );
    }
    return user;
  }
}

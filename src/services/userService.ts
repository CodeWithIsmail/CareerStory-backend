import { UserRepository } from '../repositories/userRepository.ts';
import {
  CreateUserDto,
  UserProfileDto,
  UpdateUserProfileDto,
  UpdateUserStatusDto,
  UpdateUserRoleDto,
} from '../dto/userDto.ts';
import { mapUserToProfileDto, mapUsersToProfileDtoList } from '../mappers/userMapper.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { UserPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginatedResponse } from '../types/customTypes.ts';
import { checkForDuplicateUser } from '../utils/userUtils.ts';
import { CONTEXT } from '../constants/context.ts';
import { mapPaginatedResponse } from '../mappers/paginationMapper.ts';
import { User } from '../entities/User.ts';
import { DatabaseError, NotFoundError } from '../errors/CustomErrors.ts';

export class UserService {
  private userRepository = new UserRepository();

  async createUser(user: CreateUserDto): Promise<UserProfileDto> {
    const isExistingUser = await this.userRepository.getUserByUsernameOrEmail(user.email, user.userName);
    checkForDuplicateUser(isExistingUser, user, CONTEXT.USER.CREATE);
    const newUser = await this.userRepository.createUser(user);
    if (!newUser) {
      throw new DatabaseError(ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR, CONTEXT.USER.CREATE);
    }
    return mapUserToProfileDto(newUser);
  }

  async getAllUsers(paginationParams: UserPaginationQuery): Promise<PaginatedResponse<UserProfileDto>> {
    const paginatedUsers = await this.userRepository.getAllUsers(paginationParams);
    return mapPaginatedResponse<User, UserProfileDto>(paginatedUsers, mapUsersToProfileDtoList);
  }

  async getUserById(userId: number): Promise<UserProfileDto> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, CONTEXT.USER.FETCH);
    }
    return mapUserToProfileDto(user);
  }

  async getUserByUsername(userName: string): Promise<UserProfileDto> {
    const user = await this.userRepository.getUserByUsername(userName);
    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.USER.UNAUTHORIZED, CONTEXT.USER.FETCH);
    }
    return mapUserToProfileDto(user);
  }

  async updateUser(
    userId: number,
    updateData: UpdateUserProfileDto | UpdateUserStatusDto | UpdateUserRoleDto,
  ): Promise<UserProfileDto> {
    const updatedUser = await this.userRepository.updateUser(userId, updateData);
    if (!updatedUser) {
      throw new NotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, CONTEXT.USER.UPDATE);
    }
    return mapUserToProfileDto(updatedUser);
  }

  async deleteUser(userId: number): Promise<void> {
    const result = await this.userRepository.deleteUser(userId);
    if (result.affected === 0) {
      throw new NotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, CONTEXT.USER.DELETE);
    }
  }
}

import { DeleteResult, IsNull } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { User } from '../entities/User.ts';
import {
  CreateUserDto,
  UpdateUserProfileDto,
  UpdateUserRoleDto,
  UpdateUserStatusDto,
} from '../dto/userDto.ts';
import { PaginatedResponse, UserOrNull } from '../types/customTypes.ts';
import { UserPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginationHelper } from '../utils/paginationUtils.ts';
import { userFindOptions } from '../constants/paginationFields.ts';
import { mapPaginationConfig } from '../mappers/paginationMapper.ts';

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async getAllUsers(paginationParams: UserPaginationQuery): Promise<PaginatedResponse<User>> {
    const query = this.userRepository.createQueryBuilder('users');
    query.where('users.isEmailVerified = :isEmailVerified', { isEmailVerified: true });
    const paginationConfig = mapPaginationConfig('users', userFindOptions);
    return PaginationHelper.paginate(query, paginationParams, paginationConfig);
  }

  async getUserById(userId: string): Promise<UserOrNull> {
    return this.userRepository.findOneBy({ userId });
  }

  async getUserByUsername(userName: string): Promise<UserOrNull> {
    return this.userRepository.findOne({ where: { userName, deletedAt: IsNull() } });
  }

  async getUserByUsernameOrEmail(email: string, userName: string): Promise<UserOrNull> {
    return this.userRepository.findOne({
      where: [{ email }, { userName }],
      withDeleted: true,
    });
  }

  async updateUser(
    userId: string,
    updateData: UpdateUserProfileDto | UpdateUserStatusDto | UpdateUserRoleDto,
  ): Promise<UserOrNull> {
    await this.userRepository.update(userId, updateData);
    return this.getUserById(userId);
  }

  async deleteUser(userId: string): Promise<DeleteResult> {
    return this.userRepository.softDelete({ userId, deletedAt: IsNull() });
  }
}

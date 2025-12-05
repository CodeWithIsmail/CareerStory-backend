import { DeleteResult, EntityManager, IsNull } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { User } from '../entities/User.ts';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto.ts';
import { PaginatedResponse, UserOrNull } from '../types/customTypes.ts';
import { UserPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginationHelper } from '../utils/paginationHelper.ts';
import { userFindOptions } from '../constants/paginationFields.ts';
export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userData: CreateUserDto, entityManager: EntityManager): Promise<User> {
    const newUser = entityManager.create(User, userData);
    return entityManager.save(newUser);
  }

  async getAllUsers(paginationParams: UserPaginationQuery): Promise<PaginatedResponse<User>> {
    const query = this.userRepository.createQueryBuilder('users');
    return PaginationHelper.paginate(query, paginationParams, {
      entityAlias: 'users',
      searchableFields: userFindOptions,
    });
  }

  async getUserById(userId: string): Promise<UserOrNull> {
    return this.userRepository.findOneBy({ userId });
  }

  async getUserByUsername(userName: string): Promise<UserOrNull> {
    return this.userRepository.findOne({ where: { userName }, withDeleted: true });
  }

  async getUserByUsernameOrEmail(email: string, userName: string): Promise<UserOrNull> {
    return this.userRepository.findOne({
      where: [{ email }, { userName }],
      withDeleted: true,
    });
  }

  async updateUser(userId: string, updateData: UpdateUserDto): Promise<UserOrNull> {
    await this.userRepository.update(userId, updateData);
    return this.getUserById(userId);
  }

  async updateEmailVerificationStatus(userId: string): Promise<UserOrNull> {
    await this.userRepository.update(userId, { isEmailVerified: true });
    return this.getUserById(userId);
  }

  async deleteUser(userId: string): Promise<DeleteResult> {
    return this.userRepository.softDelete({ userId, deletedAt: IsNull() });
  }
}

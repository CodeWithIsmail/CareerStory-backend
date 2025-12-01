import { DeleteResult, IsNull, Not } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { User } from '../entities/User.ts';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto.ts';
import { PaginatedResponse, UserOrNull } from '../types/customTypes.ts';
import { UserPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginationHelper } from '../utils/paginationHelper.ts';
import { userFindOptions } from '../constants/paginationFields.ts';
export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
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

  async updateUser(userId: string, updateData: UpdateUserDto): Promise<UserOrNull> {
    await this.userRepository.update(userId, updateData);
    return this.getUserById(userId);
  }

  async deleteUser(userId: string): Promise<DeleteResult> {
    return this.userRepository.softDelete({ userId, deletedAt: IsNull() });
  }

  async getUserByEmail(email: string): Promise<UserOrNull> {
    return this.userRepository.findOneBy({ email });
  }

  async getUserByUsername(userName: string): Promise<UserOrNull> {
    return this.userRepository.findOneBy({ userName });
  }
}

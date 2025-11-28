import { DeleteResult, IsNull, Not } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { User } from '../entities/User.ts';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto.ts';
import { PaginatedResponse, UserOrNull } from '../types/customTypes.ts';
import { UserPaginationQuery } from '../validators/paginationValidator.ts';
import { NotFoundError } from '../errors/CustomErrors.ts';
export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async getAllUsers(paginationParams: UserPaginationQuery): Promise<PaginatedResponse<User>> {
    const { page, itemsPerPage, sortDirection, orderBy, find } = paginationParams;

    const skip = (page - 1) * itemsPerPage;

    const query = this.userRepository.createQueryBuilder('users');

    if (find && find.trim()) {
      query.andWhere(
        `users.userName ILIKE :find
   OR users.name ILIKE :find
   OR users.email ILIKE :find
   OR similarity(users.userName, :find) > 0.2
   OR similarity(users.name, :find) > 0.2
   OR similarity(users.email, :find) > 0.2`,
        { find: `%${find}%` },
      );
    }

    const [data, totalItems] = await query
      .skip(skip)
      .take(itemsPerPage)
      .orderBy(`users.${orderBy}`, sortDirection as 'ASC' | 'DESC')
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (page > totalPages) {
      throw new NotFoundError(
        `Page ${page} does not exist. Total pages: ${totalPages}.`,
        'fetching users',
      );
    }

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;

    return {
      data,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      },
    };
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

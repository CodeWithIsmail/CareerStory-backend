import { DeleteResult, IsNull } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { User } from '../entities/User.ts';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto.ts';

/**
 * UserRepository
 * ----------------
 * Handles all database operations related to the User entity.
 * Follows Repository Pattern to separate data access logic from service/controller.
 */

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update(id, updateData);
    return this.getUserById(id);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return this.userRepository.softDelete({ id, deletedAt: IsNull() });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async getUserByUsername(userName: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userName });
  }
}
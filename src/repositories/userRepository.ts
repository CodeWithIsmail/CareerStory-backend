import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { User } from '../entities/User.ts';

/**
 * UserRepository
 * ----------------
 * Handles all database operations related to the User entity.
 * Follows Repository Pattern to separate data access logic from service/controller.
 */

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(
    id: number,
    updateData: Partial<User>,
  ): Promise<User | null> {
    this.userRepository.update(id, updateData);
    return this.getUserById(id);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.softDelete(id);
  }
}

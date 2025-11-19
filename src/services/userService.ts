import { UserRepository } from '../repositories/userRepository.ts';
import { DeleteResult } from 'typeorm';
import { User } from '../entities/User.ts';

/**
 * UserService
 * ----------------
 * Contains business logic related to User entity.
 * Interacts with UserRepository for data access.
 */

export class UserService {
  private userRepository = new UserRepository();

  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.createUser(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async updateUser(
    id: number,
    updateData: Partial<User>,
  ): Promise<User | null> {
    return this.userRepository.updateUser(id, updateData);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.deleteUser(id);
  }
}

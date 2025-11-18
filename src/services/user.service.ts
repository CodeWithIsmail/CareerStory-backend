import { UserRepository } from '../repositories/user.repository.ts';
import { User } from '../entities/User.ts';

/**
 * UserService
 * ----------------
 * Contains business logic related to User entity.
 * Interacts with UserRepository for data access.
 */

export class UserService {
  private userRepository = new UserRepository(); // instance of UserRepository for database operations

  // create a new user
  async createUser(user: Partial<User>) {
    return await this.userRepository.create(user);
  }

  // retrieve all users (including soft-deleted)
  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  // find a user by ID
  async getUserById(id: number) {
    return await this.userRepository.findById(id);
  }

  // update a user by ID
  async updateUser(id: number, updateData: Partial<User>) {
    return await this.userRepository.update(id, updateData);
  }

  // soft delete a user by ID
  async deleteUser(id: number) {
    return await this.userRepository.softDelete(id);
  }
}

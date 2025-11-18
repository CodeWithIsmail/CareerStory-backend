import { AppDataSource } from '../data-source.ts';
import { User } from '../entities/User.ts';

/**
 * UserRepository
 * ----------------
 * Handles all database operations related to the User entity.
 * Follows Repository Pattern to separate data access logic from service/controller.
 */

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User); // TypeORM Repository instance for User entity

  // create a new user
  async create(user: Partial<User>) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // retrieve all users (including soft-deleted)
  async findAll() {
    return await this.userRepository.find();
  }

  // find a user by ID
  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  // update a user by ID
  async update(id: number, updateData: Partial<User>) {
    await this.userRepository.update(id, updateData);
    return this.findById(id);
  }

  // soft delete a user by ID
  async softDelete(id: number) {
    return await this.userRepository.softDelete(id);
  }
}

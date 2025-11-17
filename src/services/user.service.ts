import { UserRepository } from '../repositories/user.repository.ts';
import { User } from '../entities/User.ts';

export class UserService {
  private userRepository = new UserRepository();

  async createUser(user: Partial<User>) {
    return await this.userRepository.create(user);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number) {
    return await this.userRepository.findById(id);
  }

  async updateUser(id: number, updateData: Partial<User>) {
    return await this.userRepository.update(id, updateData);
  }

  async deleteUser(id: number) {
    return await this.userRepository.softDelete(id);
  }
}

import { AppDataSource } from '../data-source.ts';
import { User } from '../entities/User.ts';

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async create(user: Partial<User>) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<User>) {
    await this.userRepository.update(id, updateData);
    return this.findById(id);
  }

  async softDelete(id: number) {
    return await this.userRepository.softDelete(id);
  }
}

import { UserRepository } from '../repositories/userRepository.ts';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/userDto.ts';

/**
 * UserService
 * ----------------
 * Contains business logic related to User entity.
 * Interacts with UserRepository for data access.
 */

export class UserService {
  private userRepository = new UserRepository();

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    const newUser = await this.userRepository.createUser(user);
    return UserResponseDto.fromEntity(newUser);
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map(UserResponseDto.fromEntity);
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new Error('User not found');
    return UserResponseDto.fromEntity(user);
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.updateUser(id, updateData);
    if (!updatedUser) throw new Error('User not found');
    return UserResponseDto.fromEntity(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.deleteUser(id);
    if (result.affected === 0) throw new Error('User not found');
  }
}

import { UserRepository } from '../repositories/userRepository.ts';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/userDto.ts';
import { mapUsersToDtoList, mapUserToDto } from '../utils/userMapper.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { constantErrorMessages } from '../constants/errorMessages.ts';
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
    if (!newUser)
      throw ErrorFactory.createDatabaseError(
        constantErrorMessages.USER.INTERNAL_SERVER_ERROR,
        'creating user',
      );
    return mapUserToDto(newUser);
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.getAllUsers();
    return mapUsersToDtoList(users);
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserById(id);
    if (!user)
      throw ErrorFactory.createNotFoundError(
        constantErrorMessages.USER.NOT_FOUND,
        `fetching user with ID ${id}`,
      );
    return mapUserToDto(user);
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.updateUser(id, updateData);
    if (!updatedUser)
      throw ErrorFactory.createNotFoundError(
        constantErrorMessages.USER.NOT_FOUND,
        `updating user with ID ${id}`,
      );
    return mapUserToDto(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.deleteUser(id);
    if (result.affected === 0)
      throw ErrorFactory.createNotFoundError(
        constantErrorMessages.USER.NOT_FOUND,
        `deleting user with ID ${id}`,
      );
  }
}

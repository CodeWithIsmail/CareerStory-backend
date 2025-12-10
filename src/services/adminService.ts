import { CONTEXT } from '../constants/context.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import { UserRole } from '../entities/User.ts';
import { NotFoundError } from '../errors/CustomErrors.ts';
import { mapUserToDto } from '../mappers/userMapper.ts';
import { UserRepository } from '../repositories/userRepository.ts';

export class AdminService {
  private userRepository = new UserRepository();
  async updateUserRole(userId: string, role: UserRole): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.updateUserRole(userId, role);
    if (!updatedUser) {
      throw new NotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, CONTEXT.USER.UPDATE_ROLE);
    }
    return mapUserToDto(updatedUser);
  }
}

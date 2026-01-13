import { AppDataSource } from '../dataSource.ts';
import { CreateAuthDto, UpdateAuthPasswordDto } from '../dto/authDto.ts';
import { Auth } from '../entities/Auth.ts';
import { AuthOrNull } from '../types/customTypes.ts';

export class AuthRepository {
  private authRepository = AppDataSource.getRepository(Auth);

  async createAuth(authData: CreateAuthDto): Promise<Auth> {
    const auth = this.authRepository.create(authData);
    return this.authRepository.save(auth);
  }

  async getAuthByUserId(userId: string): Promise<AuthOrNull> {
    return this.authRepository.findOne({ where: { userId }, relations: ['user'] });
  }

  async updatePassword(userId: string, updateData: UpdateAuthPasswordDto): Promise<AuthOrNull> {
    await this.authRepository.update({ userId }, updateData);
    return this.getAuthByUserId(userId);
  }
}

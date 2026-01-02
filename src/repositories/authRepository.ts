import { AppDataSource } from '../dataSource.ts';
import { CreateAuthDto } from '../dto/authDto.ts';
import { Auth } from '../entities/Auth.ts';
import {  updatePasswordField } from '../mappers/authMapper.ts';
import { AuthOrNull } from '../types/customTypes.ts';

export class AuthRepository {
  private authRepository = AppDataSource.getRepository(Auth);

  async createAuth(authData: CreateAuthDto): Promise<Auth> {
    const auth = this.authRepository.create(authData);
    return this.authRepository.save(auth);
  }

  async getAuthByUserId(userId: string): Promise<AuthOrNull> {
    return this.authRepository.findOneBy({ userId });
  }

  async updatePassword(
    userId: string,
    hashedPassword: string,
    passwordLastModificationTime: Date,
  ): Promise<AuthOrNull> {
    const result = await this.authRepository.update(
      { userId },
      updatePasswordField(hashedPassword, passwordLastModificationTime),
    );
    if (result.affected === 0) return null;
    return this.getAuthByUserId(userId);
  }
}

import { AppDataSource } from '../dataSource.ts';
import { CreateAuthDto } from '../dto/authDto.ts';
import { Auth } from '../entities/Auth.ts';
import { resetPasswordChangeFields, updatePasswordField } from '../mappers/authMapper.ts';
import { AuthOrNull, StringOrNull } from '../types/customTypes.ts';

export class AuthRepository {
  private authRepository = AppDataSource.getRepository(Auth);

  async createAuth(authData: CreateAuthDto): Promise<Auth> {
    const auth = this.authRepository.create(authData);
    return this.authRepository.save(auth);
  }

  async getAuthByUserId(userId: string): Promise<AuthOrNull> {
    return this.authRepository.findOneBy({ userId });
  }

  async storePasswordChangeCode(userId: string, code: string, expiresAt: Date): Promise<Auth | null> {
    await this.authRepository.update({ userId }, resetPasswordChangeFields(code, expiresAt));
    return this.getAuthByUserId(userId);
  }

  async getPasswordChangeCode(userId: string): Promise<StringOrNull> {
    const auth = await this.getAuthByUserId(userId);
    return auth?.passwordChangeCode || null;
  }

  async verifyPasswordChangeCode(userId: string): Promise<AuthOrNull> {
    await this.authRepository.update(
      { userId },
      {
        passwordChangeCodeVerified: true,
        passwordChangeCodeVerifiedAt: new Date(),
      },
    );

    return this.getAuthByUserId(userId);
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

  async clearPasswordChangeCode(userId: string): Promise<void> {
    await this.authRepository.update({ userId }, resetPasswordChangeFields());
  }
}

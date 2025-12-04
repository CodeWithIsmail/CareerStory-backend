import { EntityManager } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { CreateAuthDto } from '../dto/authDto.ts';
import { Auth } from '../entities/Auth.ts';
import { AuthOrNull } from '../types/customTypes.ts';

export class AuthRepository {
  private authRepository = AppDataSource.getRepository(Auth);

  async createAuth(authData: CreateAuthDto, entityManager: EntityManager): Promise<Auth> {
    const auth = entityManager.create(Auth, authData);
    return entityManager.save(auth);
  }

  async getAuthByUserId(userId: string): Promise<AuthOrNull> {
    return this.authRepository.findOneBy({ userId });
  }
}

import { AppDataSource } from '../dataSource.ts';
import { Auth } from '../entities/Auth.ts';

export class AuthRepository {
  private repository = AppDataSource.getRepository(Auth);

  async getUserById(userId: string): Promise<Auth | null> {
    return this.repository.findOne({
      where: { userId },
      relations: ['user'],
    });
  }

  async save(auth: Auth): Promise<Auth> {
    return this.repository.save(auth);
  }

  async update(userId: string, auth: Partial<Auth>): Promise<Auth | null> {
    await this.repository.update(userId, auth);
    return this.getUserById(userId);
  }

  async exists(userId: string): Promise<boolean> {
    const count = await this.repository.countBy({ userId });
    return count > 0;
  }
}

import { AppDataSource } from '../dataSource.ts';
import { Auth } from '../entities/Auth.ts';

export class AuthRepository {
  private authRepo = AppDataSource.getRepository(Auth);

  async createAuth(authData: { userId: string; hashedPassword: string }) {
    const auth = this.authRepo.create(authData);
    return this.authRepo.save(auth);
  }

  async getAuthByUserId(userId: string) {
    return this.authRepo.findOneBy({ userId });
  }
}

import bcrypt from 'bcrypt';
import { ENV } from '../config/environment.ts';

export async function generateHashedPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, ENV.SALT_ROUNDS);
}

export async function validateUserPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

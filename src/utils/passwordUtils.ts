import bcrypt from 'bcrypt';
import { ENV } from '../config/environment.ts';
import crypto from 'crypto';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { UnauthorizedError } from '../errors/CustomErrors.ts';

export async function generateHashedPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, ENV.SALT_ROUNDS);
}

export async function validateUserPassword(
  password: string,
  hashedPassword: string,
  context: string,
): Promise<void> {
  const isValid = await bcrypt.compare(password, hashedPassword);
  if (!isValid) {
    throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INCORRECT_PASSWORD, context);
  }
}

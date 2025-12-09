import { ENV } from '../config/environment.ts';
import { TokenPayloadDto } from '../dto/authDto.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import jwt from 'jsonwebtoken';
import { TOKEN_TYPE, tokenExpiryMap } from '../types/customTypes.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { CONTEXT } from '../constants/context.ts';

export function generateToken(user: UserResponseDto, tokenType: TOKEN_TYPE): string {
  const payload: TokenPayloadDto = {
    userId: user.userId,
    role: user.role,
    tokenType: tokenType,
  };

  const token = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: tokenExpiryMap[tokenType],
  });
  return token;
}

export function verifyToken(token: string): TokenPayloadDto {
  try {
    return jwt.verify(token, ENV.JWT_SECRET) as TokenPayloadDto;
  } catch (err) {
    throw ErrorFactory.createUnauthorizedError(
      ERROR_MESSAGES.AUTH.INVALID_TOKEN,
      CONTEXT.MIDDLEWARE.AUTHENTICATION,
    );
  }
}

export function generateTokenError(error: any) {
  if (error instanceof jwt.TokenExpiredError)
    throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.TOKEN_EXPIRED, 'confirming email');
  if (error instanceof jwt.JsonWebTokenError)
    throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 'confirming email');
  else throw ErrorFactory.createUnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 'confirming email');
}

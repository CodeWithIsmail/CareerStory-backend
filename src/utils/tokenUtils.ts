import { ENV } from '../config/environment.ts';
import { TokenPayloadDto } from '../dto/authDto.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import jwt from 'jsonwebtoken';
import { TOKEN_TYPE, tokenExpiryMap } from '../types/customTypes.ts';

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

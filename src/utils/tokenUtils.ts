import { ENV } from '../config/environment.ts';
import { TokenPayloadDto } from '../dto/authDto.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import jwt from 'jsonwebtoken';

export function generateAccessToken(user: UserResponseDto): string {
  const payload: TokenPayloadDto = {
    userName: user.userName,
    email: user.email,
    name: user.name,
    role: user.role,
    userId: user.userId,
  };

  const accessToken = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
  return accessToken;
}

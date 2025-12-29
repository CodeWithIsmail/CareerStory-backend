import { User } from '../entities/User.ts';
import { Story } from '../entities/Story.ts';
import { Auth } from '../entities/Auth.ts';
import { ENV } from '../config/environment.ts';
import { Category } from '../entities/Category.ts';

export type UserOrNull = User | null;
export type StoryOrNull = Story | null;
export type AuthOrNull = Auth | null;
export type CategoryOrNull = Category | null;
export type DateOrNull = Date | null;
export type StringOrNull = string | null;

export enum TOKEN_TYPE {
  AUTH = 'AUTH',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

export enum REQ_SOURCE {
  BODY = 'body',
  PARAM = 'param',
  QUERY = 'query',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum VoteType {
  UP = 'UP',
  DOWN = 'DOWN',
}

export const tokenExpiryMap: Record<TOKEN_TYPE, number> = {
  [TOKEN_TYPE.AUTH]: ENV.AUTH_JWT_EXPIRES_IN,
  [TOKEN_TYPE.EMAIL_VERIFICATION]: ENV.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
};

export interface PaginationMetadata {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMetadata;
}

export interface PaginationConfig {
  searchableFields: string[];
  entityAlias: string;
}

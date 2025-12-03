import { User } from '../entities/User.ts';
import { Story } from '../entities/Story.ts';
import { Auth } from '../entities/Auth.ts';

export type UserOrNull = User | null;
export type StoryOrNull = Story | null;
export type AuthOrNull = Auth | null;
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

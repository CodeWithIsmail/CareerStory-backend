import { StoryResponseDto } from '../dto/storyDto.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import { Story } from '../entities/Story.ts';
import { User } from '../entities/User.ts';
import { PaginatedResponse, PaginationConfig } from '../types/customTypes.ts';
import { mapStoriesToDtoList } from './storyMapper.ts';
import { mapUsersToDtoList } from './userMapper.ts';

export const mapPaginationConfig = (entityAlias: string, searchableFields: string[]): PaginationConfig => {
  return {
    entityAlias,
    searchableFields,
  };
};

export const mapPaginatedResponse = <Entity, Dto>(
  paginated: PaginatedResponse<Entity>,
  mapperFn: (items: Entity[]) => Dto[],
): PaginatedResponse<Dto> => {
  return {
    data: mapperFn(paginated.data),
    pagination: paginated.pagination,
  };
};


// export const mapPaginatedUsersToDto = (
//   paginatedUsers: PaginatedResponse<User>,
// ): PaginatedResponse<UserResponseDto> => {
//   return {
//     data: mapUsersToDtoList(paginatedUsers.data),
//     pagination: paginatedUsers.pagination,
//   };
// };

// export const mapPaginatedStoriesToDto = (
//   paginatedStories: PaginatedResponse<Story>,
// ): PaginatedResponse<StoryResponseDto> => {
//   return {
//     data: mapStoriesToDtoList(paginatedStories.data),
//     pagination: paginatedStories.pagination,
//   };
// };

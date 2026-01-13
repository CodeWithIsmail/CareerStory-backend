import { PaginatedResponse, PaginationConfig } from '../types/customTypes.ts';

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

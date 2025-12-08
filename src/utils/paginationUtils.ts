import { SelectQueryBuilder } from 'typeorm';
import { StoryPaginationQuery, UserPaginationQuery } from '../validators/paginationValidator.ts';
import { PaginatedResponse, PaginationConfig } from '../types/customTypes.ts';
import { NotFoundError } from '../errors/CustomErrors.ts';

export class PaginationHelper {
  static async paginate<T>(
    query: SelectQueryBuilder<T>,
    params: UserPaginationQuery | StoryPaginationQuery,
    config: PaginationConfig,
  ): Promise<PaginatedResponse<T>> {
    const { page, itemsPerPage, sortDirection, orderBy, find } = params;
    const { searchableFields, entityAlias } = config;

    const skip = (page - 1) * itemsPerPage;

    if (find?.trim()) {
      const searchConditions = searchableFields.map((field) => `${String(field)} ILIKE :find `).join(' OR ');

      query.andWhere(`(${searchConditions})`, { find: `%${find}%` });
    }

    const [data, totalItems] = await query
      .skip(skip)
      .take(itemsPerPage)
      .orderBy(`${entityAlias}.${orderBy}`, sortDirection)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalItems > 0 && page > totalPages) {
      throw new NotFoundError(
        `Page ${page} does not exist. Total pages: ${totalPages}.`,
        `fetching ${entityAlias}s`,
      );
    }

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;

    return {
      data,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      },
    };
  }
}

import { Category } from '../entities/Category.ts';
import { CategoryResponseDto } from '../dto/categoryDto.ts';
import { categoryResponseSchema } from '../validators/categoryValidator.ts';

export const mapCategoryToDto = (category: Category): CategoryResponseDto =>
  categoryResponseSchema.parse(category);

export const mapCategoriesToDtoList = (categories: Category[]): CategoryResponseDto[] =>
  categories.map((category) => mapCategoryToDto(category));

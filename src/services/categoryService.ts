import { CategoryRepository } from '../repositories/categoryRepository.ts';
import { CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto } from '../dto/categoryDto.ts';
import { mapCategoriesToDtoList, mapCategoryToDto } from '../mappers/categoryMapper.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { CONTEXT } from '../constants/context.ts';
import { Category } from '../entities/Category.ts';
import { ConflictError, DatabaseError, NotFoundError } from '../errors/CustomErrors.ts';
export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async createCategory(categoryData: CreateCategoryDto): Promise<CategoryResponseDto> {
    const isExistingCategory = await this.categoryRepository.getCategoryByName(categoryData.name);
    if (isExistingCategory) {
      throw new ConflictError(ERROR_MESSAGES.CATEGORY.DUPLICATE_NAME, CONTEXT.CATEGORY.CREATE);
    }
    const newCategory = await this.categoryRepository.createCategory(categoryData);
    if (!newCategory) {
      throw new DatabaseError(ERROR_MESSAGES.CATEGORY.CREATE, CONTEXT.CATEGORY.CREATE);
    }
    return mapCategoryToDto(newCategory);
  }

  async getAllCategories(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.getAllCategories();
    return mapCategoriesToDtoList(categories);
  }

  async getCategoryById(categoryId: number): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundError(ERROR_MESSAGES.CATEGORY.FETCH, CONTEXT.CATEGORY.FETCH);
    }
    return mapCategoryToDto(category);
  }

  async getCategoriesByIds(categoryIds: number[]): Promise<Category[]> {
    const categories = await this.categoryRepository.getCategoriesByIds(categoryIds);
    return categories;
  }

  async getCategoryByName(name: string): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.getCategoryByName(name);
    if (!category) {
      throw new NotFoundError(ERROR_MESSAGES.CATEGORY.FETCH, CONTEXT.CATEGORY.FETCH);
    }
    return mapCategoryToDto(category);
  }

  async updateCategory(categoryId: number, updateData: UpdateCategoryDto): Promise<CategoryResponseDto> {
    const updatedCategory = await this.categoryRepository.updateCategory(categoryId, updateData);
    if (!updatedCategory) {
      throw new NotFoundError(ERROR_MESSAGES.CATEGORY.UPDATE, CONTEXT.CATEGORY.UPDATE);
    }
    return mapCategoryToDto(updatedCategory);
  }

  async deleteCategory(categoryId: number): Promise<void> {
    const result = await this.categoryRepository.deleteCategory(categoryId);
    if (result.affected === 0) {
      throw new NotFoundError(ERROR_MESSAGES.CATEGORY.DELETE, CONTEXT.CATEGORY.DELETE);
    }
  }
}

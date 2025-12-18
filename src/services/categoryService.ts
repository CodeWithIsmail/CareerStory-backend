import { CategoryRepository } from '../repositories/categoryRepository.ts';
import { CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto } from '../dto/categoryDto.ts';
import { mapCategoriesToDtoList, mapCategoryToDto } from '../mappers/categoryMapper.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';
import { CONTEXT } from '../constants/context.ts';
import { Category } from '../entities/Category.ts';
export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async createCategory(categoryData: CreateCategoryDto): Promise<CategoryResponseDto> {
    const isExistingCategory = await this.categoryRepository.getCategoryByName(categoryData.name);
    if (isExistingCategory) {
      throw ErrorFactory.createConflictError(ERROR_MESSAGES.CATEGORY.DUPLICATE_NAME, CONTEXT.CATEGORY.CREATE);
    }
    const newCategory = await this.categoryRepository.createCategory(categoryData);
    if (!newCategory) {
      throw ErrorFactory.createDatabaseError(ERROR_MESSAGES.CATEGORY.CREATE, CONTEXT.CATEGORY.CREATE);
    }
    return mapCategoryToDto(newCategory);
  }

  async getAllCategories(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.getAllCategories();
    return mapCategoriesToDtoList(categories);
  }

  async getCategoryById(categoryId: string): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.getCategoryById(categoryId);
    if (!category) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.CATEGORY.FETCH, CONTEXT.CATEGORY.FETCH);
    }
    return mapCategoryToDto(category);
  }

  async getCategoriesByIds(categoryIds: string[]): Promise<Category[]> {
    const categories = await this.categoryRepository.getCategoriesByIds(categoryIds);
    return categories;
  }

  async getCategoryByName(name: string): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.getCategoryByName(name);
    if (!category) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.CATEGORY.FETCH, CONTEXT.CATEGORY.FETCH);
    }
    return mapCategoryToDto(category);
  }

  async updateCategory(categoryId: string, updateData: UpdateCategoryDto): Promise<CategoryResponseDto> {
    const updatedCategory = await this.categoryRepository.updateCategory(categoryId, updateData);
    if (!updatedCategory) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.CATEGORY.UPDATE, CONTEXT.CATEGORY.UPDATE);
    }
    return mapCategoryToDto(updatedCategory);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const result = await this.categoryRepository.deleteCategory(categoryId);
    if (result.affected === 0) {
      throw ErrorFactory.createNotFoundError(ERROR_MESSAGES.CATEGORY.DELETE, CONTEXT.CATEGORY.DELETE);
    }
  }
}

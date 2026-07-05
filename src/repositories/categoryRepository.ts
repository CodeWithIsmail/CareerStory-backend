import { DeleteResult, In, IsNull } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/categoryDto.ts';
import { Category } from '../entities/Category.ts';
import { CategoryOrNull } from '../types/customTypes.ts';

export class CategoryRepository {
  private categoryRepository = AppDataSource.getRepository(Category);

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(categoryId: number, updateData: UpdateCategoryDto): Promise<CategoryOrNull> {
    await this.categoryRepository.update(categoryId, updateData);
    return this.getCategoryById(categoryId);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ where: { deletedAt: IsNull() }, order: { name: 'ASC' } });
  }

  async getCategoryById(categoryId: number): Promise<CategoryOrNull> {
    return this.categoryRepository.findOneBy({ categoryId, deletedAt: IsNull() });
  }

  async getCategoriesByIds(categoryIds: number[]): Promise<Category[]> {
    return this.categoryRepository.findBy({ categoryId: In(categoryIds), deletedAt: IsNull() });
  }

  async getCategoryByName(name: string): Promise<CategoryOrNull> {
    return this.categoryRepository.findOne({ where: { name }, withDeleted: true });
  }

  async deleteCategory(categoryId: number): Promise<DeleteResult> {
    return this.categoryRepository.softDelete({ categoryId, deletedAt: IsNull() });
  }
}

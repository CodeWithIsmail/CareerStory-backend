import { DeleteResult, IsNull } from 'typeorm';
import { AppDataSource } from '../dataSource.ts';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/categoryDto.ts';
import { Category } from '../entities/Category.ts';

export class CategoryRepository {
  private categoryRepository = AppDataSource.getRepository(Category);

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(categoryId: string, updateData: UpdateCategoryDto): Promise<Category | null> {
    await this.categoryRepository.update(categoryId, updateData);
    return this.getCategoryById(categoryId);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ where: { deletedAt: IsNull() }, order: { name: 'ASC' } });
  }

  async getCategoryById(categoryId: string): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ categoryId, deletedAt: IsNull() });
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ name, deletedAt: IsNull() });
  }

  async deleteCategory(categoryId: string): Promise<DeleteResult> {
    return this.categoryRepository.softDelete({ categoryId, deletedAt: IsNull() });
  }
}

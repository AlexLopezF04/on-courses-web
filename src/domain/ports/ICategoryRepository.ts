import { Category } from '@domain/entities/Category';
import { PaginatedResult } from '@domain/entities/PaginatedResult';

export interface ICategoryRepository {
  getCategories(filters?: any): Promise<PaginatedResult<Category>>;
  getCategoryById(id: number): Promise<Category>;
  createCategory(category: Partial<Category>): Promise<Category>;
  updateCategory(id: number, category: Partial<Category>): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
}

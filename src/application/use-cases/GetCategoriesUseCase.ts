import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
import { Category } from '@domain/entities/Category';
import { PaginatedResult } from '@domain/entities/PaginatedResult';

export class GetCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(filters?: any): Promise<PaginatedResult<Category>> {
    return this.categoryRepository.getCategories(filters);
  }
}

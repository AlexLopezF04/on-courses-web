import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
import { Category } from '@domain/entities/Category';

export class GetCategoryByIdUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: number): Promise<Category> {
    return this.categoryRepository.getCategoryById(id);
  }
}

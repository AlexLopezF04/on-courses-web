import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
import { Category } from '@domain/entities/Category';
import { UpdateCategoryDto } from '../dtos/CategoryDto';

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: number, dto: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepository.updateCategory(id, dto);
  }
}

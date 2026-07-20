import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
import { Category } from '@domain/entities/Category';
import { CreateCategoryDto } from '../dtos/CategoryDto';

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(dto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(dto);
  }
}

import { ICategoryRepository } from '@domain/ports/ICategoryRepository';

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: number): Promise<void> {
    return this.categoryRepository.deleteCategory(id);
  }
}

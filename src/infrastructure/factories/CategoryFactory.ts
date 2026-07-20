import { AxiosCategoryRepository } from '../adapters/AxiosCategoryRepository';
import { GetCategoriesUseCase } from '@application/use-cases/GetCategoriesUseCase';
import { GetCategoryByIdUseCase } from '@application/use-cases/GetCategoryByIdUseCase';
import { CreateCategoryUseCase } from '@application/use-cases/CreateCategoryUseCase';
import { UpdateCategoryUseCase } from '@application/use-cases/UpdateCategoryUseCase';
import { DeleteCategoryUseCase } from '@application/use-cases/DeleteCategoryUseCase';

export const categoryRepositoryInstance = new AxiosCategoryRepository();

export const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepositoryInstance);
export const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepositoryInstance);
export const createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInstance);
export const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepositoryInstance);
export const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepositoryInstance);

import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
import { Category } from '@domain/entities/Category';
import { axiosClient } from '../http/axios-client';
import { parseApiError } from '../http/parse-api-error';

export class AxiosCategoryRepository implements ICategoryRepository {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await axiosClient.get('/categories/');
      if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async getCategoryById(id: number): Promise<Category> {
    try {
      const response = await axiosClient.get(`/categories/${id}/`);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }
}

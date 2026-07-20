import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
import { Category } from '@domain/entities/Category';
import { PaginatedResult } from '@domain/entities/PaginatedResult';
import { axiosClient } from '../http/axios-client';
import { parseApiError } from '../http/parse-api-error';

export class AxiosCategoryRepository implements ICategoryRepository {
  async getCategories(filters?: any): Promise<PaginatedResult<Category>> {
    try {
      const response = await axiosClient.get('/categories/', { params: filters });
      if (response.data && Array.isArray(response.data.results)) {
        return {
          results: response.data.results,
          count: response.data.count || response.data.results.length,
          next: response.data.next || null,
          previous: response.data.previous || null,
        };
      }
      if (Array.isArray(response.data)) {
        return {
          results: response.data,
          count: response.data.length,
          next: null,
          previous: null,
        };
      }
      return { results: [], count: 0, next: null, previous: null };
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

  async createCategory(category: Partial<Category>): Promise<Category> {
    try {
      const response = await axiosClient.post('/categories/', category);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
    try {
      const response = await axiosClient.put(`/categories/${id}/`, category);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async deleteCategory(id: number): Promise<void> {
    try {
      await axiosClient.delete(`/categories/${id}/`);
    } catch (error) {
      throw parseApiError(error);
    }
  }
}

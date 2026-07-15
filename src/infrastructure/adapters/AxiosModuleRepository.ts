import { IModuleRepository } from '@domain/ports/IModuleRepository';
import { Module } from '@domain/entities/Module';
import { axiosClient } from '../http/axios-client';
import { parseApiError } from '../http/parse-api-error';

export class AxiosModuleRepository implements IModuleRepository {
  async getModules(courseId?: number): Promise<Module[]> {
    try {
      const response = await axiosClient.get('/modules/', {
        params: courseId ? { course: courseId } : {},
      });
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

  async getModuleById(id: number): Promise<Module> {
    try {
      const response = await axiosClient.get(`/modules/${id}/`);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async createModule(module: any): Promise<Module> {
    try {
      const response = await axiosClient.post('/modules/', module);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async updateModule(id: number, module: any): Promise<Module> {
    try {
      const response = await axiosClient.patch(`/modules/${id}/`, module);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async deleteModule(id: number): Promise<void> {
    try {
      await axiosClient.delete(`/modules/${id}/`);
    } catch (error) {
      throw parseApiError(error);
    }
  }
}

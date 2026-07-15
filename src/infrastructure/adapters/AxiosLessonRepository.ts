import { ILessonRepository } from '@domain/ports/ILessonRepository';
import { Lesson } from '@domain/entities/Lesson';
import { axiosClient } from '../http/axios-client';
import { parseApiError } from '../http/parse-api-error';

export class AxiosLessonRepository implements ILessonRepository {
  async getLessons(moduleId?: number): Promise<Lesson[]> {
    try {
      const response = await axiosClient.get('/lessons/', {
        params: moduleId ? { module: moduleId } : {},
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

  async getLessonById(id: number): Promise<Lesson> {
    try {
      const response = await axiosClient.get(`/lessons/${id}/`);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async createLesson(lesson: any): Promise<Lesson> {
    try {
      const response = await axiosClient.post('/lessons/', lesson);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async updateLesson(id: number, lesson: any): Promise<Lesson> {
    try {
      const response = await axiosClient.patch(`/lessons/${id}/`, lesson);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async deleteLesson(id: number): Promise<void> {
    try {
      await axiosClient.delete(`/lessons/${id}/`);
    } catch (error) {
      throw parseApiError(error);
    }
  }
}

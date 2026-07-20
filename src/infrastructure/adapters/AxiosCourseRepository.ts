import { ICourseRepository } from '@domain/ports/ICourseRepository';
import { Course } from '@domain/entities/Course';
import { PaginatedResult } from '@domain/entities/PaginatedResult';
import { axiosClient } from '../http/axios-client';
import { parseApiError } from '../http/parse-api-error';

export class AxiosCourseRepository implements ICourseRepository {
  async getCourses(filters?: any): Promise<PaginatedResult<Course>> {
    try {
      const response = await axiosClient.get('/courses/', { params: filters });
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

  async getCourseById(id: number): Promise<Course> {
    try {
      const response = await axiosClient.get(`/courses/${id}/`);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async createCourse(course: any): Promise<Course> {
    try {
      const headers: Record<string, string> = {};
      if (course instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
      }
      const response = await axiosClient.post('/courses/', course, { headers });
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async updateCourse(id: number, course: any): Promise<Course> {
    try {
      const headers: Record<string, string> = {};
      if (course instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
      }
      const response = await axiosClient.patch(`/courses/${id}/`, course, { headers });
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async deleteCourse(id: number): Promise<void> {
    try {
      await axiosClient.delete(`/courses/${id}/`);
    } catch (error) {
      throw parseApiError(error);
    }
  }
}

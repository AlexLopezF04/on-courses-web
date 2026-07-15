import { IEnrollmentRepository } from '@domain/ports/IEnrollmentRepository';
import { Enrollment } from '@domain/entities/Enrollment';
import { axiosClient } from '../http/axios-client';
import { parseApiError } from '../http/parse-api-error';

export class AxiosEnrollmentRepository implements IEnrollmentRepository {
  async getEnrollments(filters?: any): Promise<{ results: Enrollment[]; count: number }> {
    try {
      const response = await axiosClient.get('/enrollments/', { params: filters });
      if (response.data && Array.isArray(response.data.results)) {
        return {
          results: response.data.results,
          count: response.data.count || response.data.results.length,
        };
      }
      if (Array.isArray(response.data)) {
        return {
          results: response.data,
          count: response.data.length,
        };
      }
      return { results: [], count: 0 };
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async enrollInCourse(courseId: number): Promise<Enrollment> {
    try {
      const response = await axiosClient.post('/enrollments/', { course: courseId });
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async getEnrollmentById(id: number): Promise<Enrollment> {
    try {
      const response = await axiosClient.get(`/enrollments/${id}/`);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }
}

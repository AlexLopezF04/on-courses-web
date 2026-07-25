import { ICourseRepository } from '@domain/ports/ICourseRepository';
import { Course } from '@domain/entities/Course';
import { PaginatedResult } from '@domain/entities/PaginatedResult';
import { axiosClient } from '../http/axios-client';
import { parseApiError } from '../http/parse-api-error';
import { enrichCourseData, getFallbackCourse } from '../data/CourseSeedData';

export class AxiosCourseRepository implements ICourseRepository {
  async getCourses(filters?: any): Promise<PaginatedResult<Course>> {
    // Master list of seed course IDs representing all unique topics
    const seedCatalogIds = [1, 2, 5, 6, 7, 8, 103, 104, 109, 110];

    try {
      const response = await axiosClient.get('/courses/', { params: filters });
      let rawResults: Course[] = [];
      if (response.data && Array.isArray(response.data.results)) {
        rawResults = response.data.results;
      } else if (Array.isArray(response.data)) {
        rawResults = response.data;
      }

      const enrichedBackend = rawResults.map(enrichCourseData);

      // Build master catalog map
      const masterCoursesMap = new Map<number, Course>();

      // 1. Populate all seed topics
      for (const id of seedCatalogIds) {
        masterCoursesMap.set(id, getFallbackCourse(id));
      }

      // 2. Insert/Enrich backend courses
      for (const bCourse of enrichedBackend) {
        const fallback = getFallbackCourse(bCourse.id);
        const fallbackModLen = fallback.modules?.length || 0;
        const bModLen = bCourse.modules?.length || 0;
        const merged: Course = {
          ...bCourse,
          modules: bModLen >= fallbackModLen ? bCourse.modules : fallback.modules,
        };
        masterCoursesMap.set(bCourse.id, merged);
      }

      let allCourses = Array.from(masterCoursesMap.values());

      // Filter by search query if provided
      if (filters?.search) {
        const query = String(filters.search).toLowerCase();
        allCourses = allCourses.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            (c.description || '').toLowerCase().includes(query) ||
            (c.slug || '').toLowerCase().includes(query) ||
            (c.category_name || '').toLowerCase().includes(query)
        );
      }

      return {
        results: allCourses,
        count: allCourses.length,
        next: null,
        previous: null,
      };
    } catch (error) {
      console.warn('Backend getCourses failed, returning master seed catalog', error);
      let fallbackCourses = seedCatalogIds.map((id) => getFallbackCourse(id));
      if (filters?.search) {
        const query = String(filters.search).toLowerCase();
        fallbackCourses = fallbackCourses.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            (c.description || '').toLowerCase().includes(query) ||
            (c.slug || '').toLowerCase().includes(query)
        );
      }
      return {
        results: fallbackCourses,
        count: fallbackCourses.length,
        next: null,
        previous: null,
      };
    }
  }

  async getCourseById(id: number): Promise<Course> {
    try {
      const response = await axiosClient.get(`/courses/${id}/`);
      const enriched = enrichCourseData(response.data);
      const fallback = getFallbackCourse(id);
      const enrichedModLen = enriched.modules?.length || 0;
      const fallbackModLen = fallback.modules?.length || 0;

      if (enrichedModLen >= fallbackModLen) {
        return enriched;
      }
      return {
        ...enriched,
        modules: fallback.modules,
      };
    } catch (error) {
      console.warn(`Backend failed for course ${id}, using fallback seed data`, error);
      return getFallbackCourse(id);
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

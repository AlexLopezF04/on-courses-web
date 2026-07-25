import { ICourseRepository } from '@domain/ports/ICourseRepository';
import { Course } from '@domain/entities/Course';
import { PaginatedResult } from '@domain/entities/PaginatedResult';
import { axiosClient } from '../http/axios-client';
import { parseApiError } from '../http/parse-api-error';
import { enrichCourseData, getFallbackCourse, getCanonicalCourseId } from '../data/CourseSeedData';

export class AxiosCourseRepository implements ICourseRepository {
  async getCourses(filters?: any): Promise<PaginatedResult<Course>> {
    // Strictly IDs 1 through 10
    const seedCatalogIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    try {
      const response = await axiosClient.get('/courses/', { params: filters });
      let rawResults: Course[] = [];
      if (response.data && Array.isArray(response.data.results)) {
        rawResults = response.data.results;
      } else if (Array.isArray(response.data)) {
        rawResults = response.data;
      }

      const enrichedBackend = rawResults.map(enrichCourseData);

      // Master catalog map keyed by canonical IDs 1..10
      const masterCoursesMap = new Map<number, Course>();

      // 1. Populate all seed topics 1..10
      for (const id of seedCatalogIds) {
        masterCoursesMap.set(id, getFallbackCourse(id));
      }

      // 2. Insert/Enrich backend courses mapped to canonical ID 1..10
      for (const bCourse of enrichedBackend) {
        const canonicalId = getCanonicalCourseId(bCourse);
        const fallback = getFallbackCourse(canonicalId);
        const fallbackModLen = fallback.modules?.length || 0;
        const bModLen = bCourse.modules?.length || 0;

        const merged: Course = {
          ...bCourse,
          id: canonicalId,
          title: fallback.title,
          modules: bModLen >= fallbackModLen ? bCourse.modules : fallback.modules,
        };
        masterCoursesMap.set(canonicalId, merged);
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
      console.warn('Backend getCourses failed, returning master seed catalog 1..10', error);
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
    const canonicalId = getCanonicalCourseId({ id, title: '' });
    const targetId = canonicalId > 0 && canonicalId <= 10 ? canonicalId : id;
    try {
      const response = await axiosClient.get(`/courses/${targetId}/`);
      const enriched = enrichCourseData(response.data);
      const fallback = getFallbackCourse(targetId);
      const enrichedModLen = enriched.modules?.length || 0;
      const fallbackModLen = fallback.modules?.length || 0;

      if (enrichedModLen >= fallbackModLen) {
        return { ...enriched, id: targetId };
      }
      return {
        ...enriched,
        id: targetId,
        modules: fallback.modules,
      };
    } catch (error) {
      console.warn(`Backend failed for course ${targetId}, using fallback seed data`, error);
      return getFallbackCourse(targetId);
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

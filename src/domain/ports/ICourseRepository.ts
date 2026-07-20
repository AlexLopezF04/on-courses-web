import { Course } from '@domain/entities/Course';
import { PaginatedResult } from '@domain/entities/PaginatedResult';

export interface ICourseRepository {
  getCourses(filters?: any): Promise<PaginatedResult<Course>>;
  getCourseById(id: number): Promise<Course>;
  createCourse(course: any): Promise<Course>;
  updateCourse(id: number, course: any): Promise<Course>;
  deleteCourse(id: number): Promise<void>;
}

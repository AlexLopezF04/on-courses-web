import { Course } from '@domain/entities/Course';

export interface ICourseRepository {
  getCourses(filters?: any): Promise<{ results: Course[]; count: number }>;
  getCourseById(id: number): Promise<Course>;
  createCourse(course: any): Promise<Course>;
  updateCourse(id: number, course: any): Promise<Course>;
  deleteCourse(id: number): Promise<void>;
}

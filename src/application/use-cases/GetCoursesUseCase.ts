import { ICourseRepository } from '@domain/ports/ICourseRepository';
import { Course } from '@domain/entities/Course';
import { PaginatedResult } from '@domain/entities/PaginatedResult';

export class GetCoursesUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(filters?: any): Promise<PaginatedResult<Course>> {
    return this.courseRepository.getCourses(filters);
  }
}

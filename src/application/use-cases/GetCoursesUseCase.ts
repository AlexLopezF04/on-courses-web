import { ICourseRepository } from '@domain/ports/ICourseRepository';
import { Course } from '@domain/entities/Course';

export class GetCoursesUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(filters?: any): Promise<{ results: Course[]; count: number }> {
    return this.courseRepository.getCourses(filters);
  }
}

import { ICourseRepository } from '@domain/ports/ICourseRepository';
import { Course } from '@domain/entities/Course';

export class GetCourseByIdUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(id: number): Promise<Course> {
    return this.courseRepository.getCourseById(id);
  }
}

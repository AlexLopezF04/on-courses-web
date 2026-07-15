import { ICourseRepository } from '@domain/ports/ICourseRepository';
import { Course } from '@domain/entities/Course';

export class UpdateCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(id: number, courseData: any): Promise<Course> {
    return this.courseRepository.updateCourse(id, courseData);
  }
}

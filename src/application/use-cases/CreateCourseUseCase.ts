import { ICourseRepository } from '@domain/ports/ICourseRepository';
import { Course } from '@domain/entities/Course';

export class CreateCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(courseData: any): Promise<Course> {
    return this.courseRepository.createCourse(courseData);
  }
}

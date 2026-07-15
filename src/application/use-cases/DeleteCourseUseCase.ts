import { ICourseRepository } from '@domain/ports/ICourseRepository';

export class DeleteCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(id: number): Promise<void> {
    return this.courseRepository.deleteCourse(id);
  }
}

import { IEnrollmentRepository } from '@domain/ports/IEnrollmentRepository';

export class EnrollInCourseUseCase {
  constructor(private enrollmentRepository: IEnrollmentRepository) {}

  async execute(courseId: number): Promise<any> {
    return this.enrollmentRepository.enrollInCourse(courseId);
  }
}

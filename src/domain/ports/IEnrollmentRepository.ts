import { Enrollment } from '@domain/entities/Enrollment';

export interface IEnrollmentRepository {
  getEnrollments(filters?: any): Promise<{ results: Enrollment[]; count: number }>;
  enrollInCourse(courseId: number): Promise<Enrollment>;
  getEnrollmentById(id: number): Promise<Enrollment>;
}

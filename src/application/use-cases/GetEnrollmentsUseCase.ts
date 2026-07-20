import { IEnrollmentRepository } from '@domain/ports/IEnrollmentRepository';

export class GetEnrollmentsUseCase {
  constructor(private enrollmentRepository: IEnrollmentRepository) {}

  async execute(filters?: any): Promise<any> {
    return this.enrollmentRepository.getEnrollments(filters);
  }
}

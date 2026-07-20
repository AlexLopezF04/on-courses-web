import { IEnrollmentRepository } from '@domain/ports/IEnrollmentRepository';

export class GetEnrollmentByIdUseCase {
  constructor(private enrollmentRepository: IEnrollmentRepository) {}

  async execute(id: number): Promise<any> {
    return this.enrollmentRepository.getEnrollmentById(id);
  }
}

import { AxiosEnrollmentRepository } from '../adapters/AxiosEnrollmentRepository';
import { GetEnrollmentsUseCase } from '@application/use-cases/GetEnrollmentsUseCase';
import { EnrollInCourseUseCase } from '@application/use-cases/EnrollInCourseUseCase';
import { GetEnrollmentByIdUseCase } from '@application/use-cases/GetEnrollmentByIdUseCase';

export const enrollmentRepositoryInstance = new AxiosEnrollmentRepository();

export const getEnrollmentsUseCase = new GetEnrollmentsUseCase(enrollmentRepositoryInstance);
export const enrollInCourseUseCase = new EnrollInCourseUseCase(enrollmentRepositoryInstance);
export const getEnrollmentByIdUseCase = new GetEnrollmentByIdUseCase(enrollmentRepositoryInstance);

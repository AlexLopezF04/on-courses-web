import { AxiosCourseRepository } from '../adapters/AxiosCourseRepository';
import { GetCoursesUseCase } from '@application/use-cases/GetCoursesUseCase';
import { GetCourseByIdUseCase } from '@application/use-cases/GetCourseByIdUseCase';
import { CreateCourseUseCase } from '@application/use-cases/CreateCourseUseCase';
import { UpdateCourseUseCase } from '@application/use-cases/UpdateCourseUseCase';
import { DeleteCourseUseCase } from '@application/use-cases/DeleteCourseUseCase';

export const courseRepositoryInstance = new AxiosCourseRepository();

export const getCoursesUseCase = new GetCoursesUseCase(courseRepositoryInstance);
export const getCourseByIdUseCase = new GetCourseByIdUseCase(courseRepositoryInstance);
export const createCourseUseCase = new CreateCourseUseCase(courseRepositoryInstance);
export const updateCourseUseCase = new UpdateCourseUseCase(courseRepositoryInstance);
export const deleteCourseUseCase = new DeleteCourseUseCase(courseRepositoryInstance);

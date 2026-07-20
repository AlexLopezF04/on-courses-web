import { AxiosLessonRepository } from '../adapters/AxiosLessonRepository';
import { GetLessonsUseCase } from '@application/use-cases/GetLessonsUseCase';
import { GetLessonByIdUseCase } from '@application/use-cases/GetLessonByIdUseCase';
import { CreateLessonUseCase } from '@application/use-cases/CreateLessonUseCase';
import { UpdateLessonUseCase } from '@application/use-cases/UpdateLessonUseCase';
import { DeleteLessonUseCase } from '@application/use-cases/DeleteLessonUseCase';

export const lessonRepositoryInstance = new AxiosLessonRepository();

export const getLessonsUseCase = new GetLessonsUseCase(lessonRepositoryInstance);
export const getLessonByIdUseCase = new GetLessonByIdUseCase(lessonRepositoryInstance);
export const createLessonUseCase = new CreateLessonUseCase(lessonRepositoryInstance);
export const updateLessonUseCase = new UpdateLessonUseCase(lessonRepositoryInstance);
export const deleteLessonUseCase = new DeleteLessonUseCase(lessonRepositoryInstance);

import { AxiosLessonProgressRepository } from '../adapters/AxiosLessonProgressRepository';
import { GetLessonProgressUseCase } from '@application/use-cases/GetLessonProgressUseCase';
import { MarkLessonAsCompletedUseCase } from '@application/use-cases/MarkLessonAsCompletedUseCase';

export const lessonProgressRepositoryInstance = new AxiosLessonProgressRepository();

export const getLessonProgressUseCase = new GetLessonProgressUseCase(lessonProgressRepositoryInstance);
export const markLessonAsCompletedUseCase = new MarkLessonAsCompletedUseCase(lessonProgressRepositoryInstance);

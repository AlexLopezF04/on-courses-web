import { Lesson } from '@domain/entities/Lesson';

export interface ILessonRepository {
  getLessons(moduleId?: number): Promise<Lesson[]>;
  getLessonById(id: number): Promise<Lesson>;
  createLesson(lesson: any): Promise<Lesson>;
  updateLesson(id: number, lesson: any): Promise<Lesson>;
  deleteLesson(id: number): Promise<void>;
}

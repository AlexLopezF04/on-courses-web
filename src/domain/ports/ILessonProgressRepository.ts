import { LessonProgress } from '../entities/LessonProgress';

export interface ILessonProgressRepository {
  getProgress(courseId: number): Promise<LessonProgress[]>;
  markAsCompleted(lessonId: number): Promise<LessonProgress>;
}

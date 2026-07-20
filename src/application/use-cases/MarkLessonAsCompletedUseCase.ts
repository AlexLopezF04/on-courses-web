import { ILessonProgressRepository } from '@domain/ports/ILessonProgressRepository';
import { LessonProgress } from '@domain/entities/LessonProgress';

export class MarkLessonAsCompletedUseCase {
  constructor(private progressRepository: ILessonProgressRepository) {}

  async execute(lessonId: number): Promise<LessonProgress> {
    return this.progressRepository.markAsCompleted(lessonId);
  }
}

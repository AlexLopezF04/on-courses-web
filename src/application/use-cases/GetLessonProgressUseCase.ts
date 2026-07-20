import { ILessonProgressRepository } from '@domain/ports/ILessonProgressRepository';
import { LessonProgress } from '@domain/entities/LessonProgress';

export class GetLessonProgressUseCase {
  constructor(private progressRepository: ILessonProgressRepository) {}

  async execute(courseId: number): Promise<LessonProgress[]> {
    return this.progressRepository.getProgress(courseId);
  }
}

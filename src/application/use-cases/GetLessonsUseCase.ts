import { ILessonRepository } from '@domain/ports/ILessonRepository';
import { Lesson } from '@domain/entities/Lesson';

export class GetLessonsUseCase {
  constructor(private lessonRepository: ILessonRepository) {}

  async execute(moduleId?: number): Promise<Lesson[]> {
    return this.lessonRepository.getLessons(moduleId);
  }
}

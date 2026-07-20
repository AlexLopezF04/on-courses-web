import { ILessonRepository } from '@domain/ports/ILessonRepository';
import { Lesson } from '@domain/entities/Lesson';

export class UpdateLessonUseCase {
  constructor(private lessonRepository: ILessonRepository) {}

  async execute(id: number, lesson: any): Promise<Lesson> {
    return this.lessonRepository.updateLesson(id, lesson);
  }
}

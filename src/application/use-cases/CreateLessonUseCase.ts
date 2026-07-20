import { ILessonRepository } from '@domain/ports/ILessonRepository';
import { Lesson } from '@domain/entities/Lesson';

export class CreateLessonUseCase {
  constructor(private lessonRepository: ILessonRepository) {}

  async execute(lesson: any): Promise<Lesson> {
    return this.lessonRepository.createLesson(lesson);
  }
}

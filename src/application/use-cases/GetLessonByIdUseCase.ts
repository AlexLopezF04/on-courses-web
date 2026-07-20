import { ILessonRepository } from '@domain/ports/ILessonRepository';
import { Lesson } from '@domain/entities/Lesson';

export class GetLessonByIdUseCase {
  constructor(private lessonRepository: ILessonRepository) {}

  async execute(id: number): Promise<Lesson> {
    return this.lessonRepository.getLessonById(id);
  }
}

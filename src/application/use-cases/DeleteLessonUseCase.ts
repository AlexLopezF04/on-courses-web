import { ILessonRepository } from '@domain/ports/ILessonRepository';

export class DeleteLessonUseCase {
  constructor(private lessonRepository: ILessonRepository) {}

  async execute(id: number): Promise<void> {
    return this.lessonRepository.deleteLesson(id);
  }
}

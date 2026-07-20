import { ILessonProgressRepository } from '@domain/ports/ILessonProgressRepository';
import { LessonProgress } from '@domain/entities/LessonProgress';
import { axiosClient } from '../http/axios-client';

export class AxiosLessonProgressRepository implements ILessonProgressRepository {
  async getProgress(courseId: number): Promise<LessonProgress[]> {
    const response = await axiosClient.get('/lesson-progress/', {
      params: { course: courseId },
    });
    return response.data?.results || response.data || [];
  }

  async markAsCompleted(lessonId: number): Promise<LessonProgress> {
    const response = await axiosClient.post('/lesson-progress/', {
      lesson: lessonId,
      percentage: 100,
      is_completed: true,
    });
    return response.data;
  }
}

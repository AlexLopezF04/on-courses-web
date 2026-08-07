import { Course } from '@domain/entities/Course';

export interface CourseStats {
  modulesCount: number;
  totalLessons: number;
  totalDurationText: string;
}

export const calculateCourseStats = (course: Course): CourseStats => {
  const modulesCount = course.modules_count || course.modules?.length || 0;
  let totalLessons = 0;
  let totalSeconds = 0;

  if (course.modules && course.modules.length > 0) {
    course.modules.forEach((mod) => {
      if (mod.lessons) {
        totalLessons += mod.lessons.length;
        mod.lessons.forEach((les) => {
          if (les.duration_seconds) {
            totalSeconds += les.duration_seconds;
          }
        });
      }
    });
  }

  // Fallback calculations if detailed lesson objects are not nested in course list
  if (totalLessons === 0) {
    totalLessons = (course as any).lessons_count || (modulesCount > 0 ? modulesCount * 7 : 0);
  }

  if (totalSeconds === 0 && totalLessons > 0) {
    // Standard estimation: 15 minutes per lesson
    totalSeconds = totalLessons * 15 * 60;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);

  let totalDurationText = '';
  if (hours > 0) {
    totalDurationText = minutes > 0 ? `${hours}h ${minutes}m` : `${hours} horas`;
  } else {
    totalDurationText = `${Math.max(10, minutes)} min`;
  }

  return {
    modulesCount,
    totalLessons,
    totalDurationText,
  };
};

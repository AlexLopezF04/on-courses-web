export interface Enrollment {
  id: number;
  user: number;
  user_name: string;
  course: number;
  course_title: string;
  enrolled_at: string;
  is_active: boolean;
  total_progress: string;
}

import { Lesson } from './Lesson';

export interface Module {
  id: number;
  title: string;
  description?: string;
  order: number;
  course: number; // course ID
  lessons?: Lesson[]; // nested optional lessons when returning CourseDetail
}

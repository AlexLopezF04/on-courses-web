export interface Lesson {
  id: number;
  title: string;
  content_text?: string;
  video_url?: string;
  duration_seconds?: number;
  order: number;
  completion_percentage?: number;
  module: number; // module ID
  resources?: string[];
}

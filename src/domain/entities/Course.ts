import { Category } from './Category';
import { Module } from './Module';

export interface Course {
  id: number;
  title: string;
  slug: string;
  price: string;
  cover_image: string | null;
  category: number | Category;
  category_name?: string;
  professor_name: string;
  professor?: number;
  is_active: boolean;
  modules_count?: number;
  created_at: string;
  description?: string;
  modules?: Module[];
}

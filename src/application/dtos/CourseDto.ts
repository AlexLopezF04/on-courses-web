export interface CreateCourseDto {
  category: number;
  title: string;
  description: string;
  price: string;
  cover_image?: string | null;
  slug: string;
  is_active: boolean;
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {}

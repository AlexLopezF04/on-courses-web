export interface CreateCategoryDto {
  name: string;
  description?: string;
  slug?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  slug?: string;
}

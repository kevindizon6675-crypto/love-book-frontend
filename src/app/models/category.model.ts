export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  display_order: number;
  total_questions?: number;
  answered_questions?: number;
  progress_percentage?: number;
}

export interface CategoryResponse {
  categories: Category[];
}

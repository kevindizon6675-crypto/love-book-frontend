export interface Question {
  id: number;
  category_id: number;
  question_text: string;
  display_order: number;
  category_name?: string;
  category_icon?: string;
  answer_text?: string;
  answer_updated_at?: string;
}

export interface QuestionResponse {
  questions: Question[];
}

export interface SaveAnswerRequest {
  question_id: number;
  answer_text: string;
}

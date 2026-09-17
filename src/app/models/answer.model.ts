export interface Answer {
  id: number;
  user_id: number;
  question_id: number;
  answer_text: string;
  created_at: string;
  updated_at: string;
}

export interface Progress {
  total_questions: number;
  answered_questions: number;
  progress_percentage: number;
}

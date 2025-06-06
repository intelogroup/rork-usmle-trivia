export interface Question {
  id: string;
  question_text: string;
  options: Array<{ id: string; text: string }> | string[];
  correct_answer?: number;
  correct_option_id?: string;
  explanation: string;
  category_id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at?: string;
  updated_at?: string;
}

export type QuizMode = 'standard' | 'timed' | 'practice';

export interface QuizSession {
  id: string;
  user_id: string;
  category_id: string;
  questions: UsmleQuestion[]; // Updated to use UsmleQuestion instead of Question
  answers: number[];
  currentQuestionIndex: number;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_taken: number;
  mode: QuizMode;
  difficulty: string;
  isCompleted: boolean;
  isAnswerSubmitted: boolean;
  selectedAnswer?: number;
  started_at: string;
  completed_at: string | null;
}

export interface QuizResult {
  id: string;
  user_id: string;
  quiz_session_id: string;
  score: number;
  percentage: number;
  time_taken: number;
  completed_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color: string;
  question_count: number;
  created_at: string;
  updated_at: string;
}
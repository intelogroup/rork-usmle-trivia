export interface Question {
  id: string;
  category: string;
  category_id?: string;
  question: string;
  question_text?: string;
  options: string[];
  correct: number;
  correct_answer?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  created_at?: string;
  updated_at?: string;
}

export type QuizMode = 'standard' | 'timed' | 'practice';

export interface QuizSession {
  id: string;
  user_id: string;
  category_id: string;
  questions: Question[];
  answers: number[]; // Array of selected answer indices
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
  questionCount: number;
  created_at: string;
  updated_at: string;
}
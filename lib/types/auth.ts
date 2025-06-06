export interface UserProfile {
  id: string;
  username: string;
  level: number;
  experience_points: number;
  total_quizzes: number;
  correct_answers: number;
  current_streak: number;
  best_streak: number;
  total_study_time: number;
  created_at: string;
  updated_at: string;
}
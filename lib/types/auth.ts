export interface LocalUser {
  id: string;
  email: string;
  username: string;
  created_at: string;
  user_metadata?: {
    username?: string;
    avatar_url?: string;
  };
}

export interface LocalSession {
  user: LocalUser;
  access_token: string;
  expires_at: number;
}

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
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon_name: string;
          question_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon_name?: string;
          question_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon_name?: string;
          question_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      questions: {
        Row: {
          id: string;
          question_text: string;
          options: string[];
          correct_answer: number;
          category_id: string;
          difficulty: 'easy' | 'medium' | 'hard';
          explanation: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question_text: string;
          options: string[];
          correct_answer: number;
          category_id: string;
          difficulty: 'easy' | 'medium' | 'hard';
          explanation: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question_text?: string;
          options?: string[];
          correct_answer?: number;
          category_id?: string;
          difficulty?: 'easy' | 'medium' | 'hard';
          explanation?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
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
        };
        Insert: {
          id: string;
          username?: string;
          level?: number;
          experience_points?: number;
          total_quizzes?: number;
          correct_answers?: number;
          current_streak?: number;
          best_streak?: number;
          total_study_time?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          level?: number;
          experience_points?: number;
          total_quizzes?: number;
          correct_answers?: number;
          current_streak?: number;
          best_streak?: number;
          total_study_time?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          category: string;
          requirement_type: string;
          requirement_value: number;
          points: number;
          rarity: 'common' | 'rare' | 'epic' | 'legendary';
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon: string;
          category: string;
          requirement_type: string;
          requirement_value: number;
          points?: number;
          rarity?: 'common' | 'rare' | 'epic' | 'legendary';
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          icon?: string;
          category?: string;
          requirement_type?: string;
          requirement_value?: number;
          points?: number;
          rarity?: 'common' | 'rare' | 'epic' | 'legendary';
          created_at?: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
          progress: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          unlocked_at?: string;
          progress?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_id?: string;
          unlocked_at?: string;
          progress?: number;
        };
      };
      quiz_sessions: {
        Row: {
          id: string;
          user_id: string;
          category_id: string;
          difficulty: 'easy' | 'medium' | 'hard';
          total_questions: number;
          correct_answers: number;
          time_taken: number;
          score: number;
          experience_gained: number;
          completed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id: string;
          difficulty: 'easy' | 'medium' | 'hard';
          total_questions: number;
          correct_answers: number;
          time_taken: number;
          score: number;
          experience_gained?: number;
          completed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string;
          difficulty?: 'easy' | 'medium' | 'hard';
          total_questions?: number;
          correct_answers?: number;
          time_taken?: number;
          score?: number;
          experience_gained?: number;
          completed_at?: string;
          created_at?: string;
        };
      };
    };
  };
};
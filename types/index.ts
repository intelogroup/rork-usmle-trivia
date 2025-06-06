export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  estimatedTime: number;
}

export interface Question {
  id: string;
  categoryId: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export type QuizMode = 'standard' | 'timed' | 'practice';

export interface QuizSession {
  id: string;
  categoryId: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: (number | null)[];
  score: number;
  timeRemaining: number;
  isCompleted: boolean;
  startTime: Date;
  endTime?: Date;
  mode?: QuizMode;
  timeLimit?: number;
}

export interface QuizResult {
  sessionId: string;
  categoryId: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  accuracy: number;
  completedAt: Date;
  mode: QuizMode;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'performance' | 'streak' | 'special';
  requirement_type: 'quiz_count' | 'perfect_score' | 'streak_days' | 'category_complete';
  requirement_value: number;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlocked_at?: string;
  progress?: number;
  total?: number;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar?: string;
  totalScore: number;
  level: number;
  rank: number;
  weeklyScore: number;
  accuracy: number;
  totalQuizzes: number;
}

export interface StudyTip {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  tags: string[];
}

export interface AnalyticsData {
  period: 'week' | 'month' | 'year';
  totalQuizzes: number;
  averageScore: number;
  timeSpent: number;
  streakData: { date: string; completed: boolean }[];
  categoryPerformance: {
    categoryId: string;
    name: string;
    accuracy: number;
    totalQuizzes: number;
  }[];
  weeklyProgress: {
    week: string;
    quizzes: number;
    score: number;
  }[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  experiencePoints: number;
  totalQuizzes: number;
  correctAnswers: number;
  currentStreak: number;
  bestStreak: number;
  totalStudyTime: number;
  createdAt: string;
  updatedAt: string;
}
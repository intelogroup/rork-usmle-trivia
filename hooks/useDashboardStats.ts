import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DashboardStats {
  totalQuizzes: number;
  averageScore: number;
  currentStreak: number;
  totalTimeSpent: number;
  weeklyProgress: number;
  recentAchievements: number;
}

interface DashboardStatsReturn extends DashboardStats {
  isLoading: boolean;
  loadStats: () => Promise<void>;
  getStreakEmoji: () => string;
}

export function useDashboardStats(): DashboardStatsReturn {
  const { user, profile, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats>({
    totalQuizzes: 0,
    averageScore: 0,
    currentStreak: 0,
    totalTimeSpent: 0,
    weeklyProgress: 0,
    recentAchievements: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      
      if (!user || !profile || !isAuthenticated) {
        const defaultStats: DashboardStats = {
          totalQuizzes: 0,
          averageScore: 0,
          currentStreak: 0,
          totalTimeSpent: 0,
          weeklyProgress: 0,
          recentAchievements: 0,
        };
        setStats(defaultStats);
        return;
      }

      // Load quiz sessions from local storage
      const sessionsData = await AsyncStorage.getItem('quiz-sessions');
      const sessions = sessionsData ? JSON.parse(sessionsData) : [];

      let calculatedStats: DashboardStats;

      if (sessions.length > 0) {
        // Use real session data
        const totalQuizzes = sessions.length;
        const totalCorrect = sessions.reduce((sum: number, s: any) => sum + (s.correct_answers || s.score || 0), 0);
        const totalQuestions = sessions.reduce((sum: number, s: any) => sum + (s.total_questions || 0), 0);
        const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

        calculatedStats = {
          totalQuizzes,
          averageScore,
          currentStreak: Number(profile.current_streak) || 0,
          totalTimeSpent: Number(profile.total_study_time) || 0,
          weeklyProgress: Math.min(100, Math.round((totalQuizzes / 7) * 100)), // Assume 7 quizzes per week goal
          recentAchievements: Math.floor(totalQuizzes / 5), // 1 achievement per 5 quizzes
        };
      } else {
        // Use profile data from auth store with defensive programming
        const totalQuizzes = Number(profile.total_quizzes) || 0;
        const correctAnswers = Number(profile.correct_answers) || 0;
        const currentStreak = Number(profile.current_streak) || 0;
        const totalStudyTime = Number(profile.total_study_time) || 0;

        calculatedStats = {
          totalQuizzes: Math.max(0, totalQuizzes),
          averageScore: totalQuizzes > 0 ? Math.round((correctAnswers / totalQuizzes) * 100) : 0,
          currentStreak: Math.max(0, currentStreak),
          totalTimeSpent: Math.max(0, totalStudyTime),
          weeklyProgress: 0, // Calculate based on recent activity
          recentAchievements: 0, // Load from achievements table
        };
      }

      setStats(calculatedStats);
    } catch (error) {
      console.error('Error loading dashboard stats (silently bypassed):', error);
      // Set fallback stats to prevent UI crashes
      const fallbackStats: DashboardStats = {
        totalQuizzes: 0,
        averageScore: 0,
        currentStreak: 0,
        totalTimeSpent: 0,
        weeklyProgress: 0,
        recentAchievements: 0,
      };
      setStats(fallbackStats);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && profile) {
      loadStats();
    } else {
      setIsLoading(false);
      setStats({
        totalQuizzes: 0,
        averageScore: 0,
        currentStreak: 0,
        totalTimeSpent: 0,
        weeklyProgress: 0,
        recentAchievements: 0,
      });
    }
  }, [user, profile, isAuthenticated]);

  const getStreakEmoji = () => {
    try {
      const streak = Number(stats.currentStreak) || 0;
      if (streak >= 30) return '🔥';
      if (streak >= 14) return '⚡';
      if (streak >= 7) return '🌟';
      return '💫';
    } catch (error) {
      console.error('Error getting streak emoji (silently bypassed):', error);
      return '💫';
    }
  };

  return {
    ...stats,
    isLoading,
    loadStats,
    getStreakEmoji,
  };
}
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import { Achievement } from '@/types';

interface ProfileStatsData {
  questionsAnswered: number;
  perfectScores: number;
  categoriesCompleted: number;
  achievements: Achievement[];
}

export function useProfileStats() {
  const { user, profile } = useAuthStore();
  const [stats, setStats] = useState<ProfileStatsData>({
    questionsAnswered: 0,
    perfectScores: 0,
    categoriesCompleted: 0,
    achievements: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      
      if (!user || !profile) {
        const defaultStats: ProfileStatsData = {
          questionsAnswered: 0,
          perfectScores: 0,
          categoriesCompleted: 0,
          achievements: [],
        };
        setStats(defaultStats);
        return;
      }

      // Use profile data and mock additional stats
      const calculatedStats: ProfileStatsData = {
        questionsAnswered: profile.correct_answers + Math.floor((profile.total_quizzes - profile.correct_answers) * 0.7),
        perfectScores: Math.floor(profile.total_quizzes * 0.3),
        categoriesCompleted: Math.min(6, Math.floor(profile.total_quizzes / 5)),
        achievements: [
          {
            id: '1',
            title: 'First Steps',
            description: 'Complete your first quiz',
            icon: '🎯',
            category: 'milestone',
            requirement_type: 'quiz_count',
            requirement_value: 1,
            points: 10,
            rarity: 'common',
            unlocked: profile.total_quizzes > 0,
            unlocked_at: profile.total_quizzes > 0 ? '2024-01-15T10:30:00Z' : undefined,
          },
          {
            id: '2',
            title: 'Perfect Score',
            description: 'Get 100% on a quiz',
            icon: '⭐',
            category: 'performance',
            requirement_type: 'perfect_score',
            requirement_value: 1,
            points: 25,
            rarity: 'rare',
            unlocked: profile.total_quizzes > 2,
            unlocked_at: profile.total_quizzes > 2 ? '2024-01-20T14:15:00Z' : undefined,
          },
          {
            id: '3',
            title: 'Week Warrior',
            description: 'Maintain a 7-day streak',
            icon: '🔥',
            category: 'streak',
            requirement_type: 'streak_days',
            requirement_value: 7,
            points: 50,
            rarity: 'epic',
            unlocked: profile.current_streak >= 7,
            unlocked_at: profile.current_streak >= 7 ? '2024-01-25T09:45:00Z' : undefined,
          },
          {
            id: '4',
            title: 'Quiz Master',
            description: 'Complete 100 quizzes',
            icon: '👑',
            category: 'milestone',
            requirement_type: 'quiz_count',
            requirement_value: 100,
            points: 100,
            rarity: 'legendary',
            unlocked: profile.total_quizzes >= 100,
            progress: profile.total_quizzes,
            total: 100,
          },
        ],
      };

      setStats(calculatedStats);
    } catch (error) {
      console.error('Error loading profile stats (silently bypassed):', error);
      const fallbackStats: ProfileStatsData = {
        questionsAnswered: 0,
        perfectScores: 0,
        categoriesCompleted: 0,
        achievements: [],
      };
      setStats(fallbackStats);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [user, profile]);

  return {
    ...stats,
    isLoading,
    loadStats,
  };
}
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserStats {
  totalScore: number;
  totalQuizzes: number;
  averageAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  lastQuizDate: string | null;
  categoryStats: Record<string, {
    totalQuizzes: number;
    totalScore: number;
    averageAccuracy: number;
  }>;
}

interface StatsState {
  stats: UserStats;
  isLoading: boolean;
  
  // Actions
  loadStats: () => void;
  updateStats: (quizResult: {
    categoryId: string;
    score: number;
    totalQuestions: number;
  }) => void;
  resetStats: () => void;
}

const initialStats: UserStats = {
  totalScore: 0,
  totalQuizzes: 0,
  averageAccuracy: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastQuizDate: null,
  categoryStats: {},
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      stats: initialStats,
      isLoading: false,

      loadStats: () => {
        // Stats are automatically loaded from persistence
        console.log('Stats loaded');
      },

      updateStats: (quizResult) => {
        const { stats } = get();
        const { categoryId, score, totalQuestions } = quizResult;
        
        const accuracy = (score / totalQuestions) * 100;
        const today = new Date().toDateString();
        const lastQuizDate = stats.lastQuizDate ? new Date(stats.lastQuizDate).toDateString() : null;
        
        // Calculate streak
        let newStreak = stats.currentStreak;
        if (lastQuizDate === today) {
          // Same day, keep streak
          newStreak = stats.currentStreak;
        } else if (lastQuizDate === new Date(Date.now() - 86400000).toDateString()) {
          // Yesterday, increment streak
          newStreak = stats.currentStreak + 1;
        } else if (lastQuizDate !== today) {
          // Different day, reset or start streak
          newStreak = 1;
        }

        // Update category stats
        const categoryStats = { ...stats.categoryStats };
        if (!categoryStats[categoryId]) {
          categoryStats[categoryId] = {
            totalQuizzes: 0,
            totalScore: 0,
            averageAccuracy: 0,
          };
        }
        
        const catStats = categoryStats[categoryId];
        catStats.totalQuizzes += 1;
        catStats.totalScore += score;
        catStats.averageAccuracy = (catStats.totalScore / (catStats.totalQuizzes * totalQuestions)) * 100;

        // Update overall stats
        const newTotalQuizzes = stats.totalQuizzes + 1;
        const newTotalScore = stats.totalScore + score;
        const newAverageAccuracy = (newTotalScore / (newTotalQuizzes * totalQuestions)) * 100;

        set({
          stats: {
            ...stats,
            totalScore: newTotalScore,
            totalQuizzes: newTotalQuizzes,
            averageAccuracy: Math.round(newAverageAccuracy),
            currentStreak: newStreak,
            longestStreak: Math.max(stats.longestStreak, newStreak),
            lastQuizDate: today,
            categoryStats,
          },
        });
      },

      resetStats: () => {
        set({ stats: initialStats });
      },
    }),
    {
      name: 'stats-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        console.log('Stats store rehydrated');
      },
    }
  )
);
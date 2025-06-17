import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createQuizSetupSlice, QuizSetupState } from './quizSetupSlice';
import { createQuizSessionSlice, QuizSessionState } from './quizSessionSlice';

// Combine the state and actions from both slices
export const useQuizStore = create<QuizSetupState & QuizSessionState>()(
  persist(
    (...a) => ({
      ...createQuizSetupSlice(...a),
      ...createQuizSessionSlice(...a),
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist essential data to avoid loading issues
        currentSession: state.currentSession || null,
      }),
      onRehydrateStorage: () => (state) => {
        console.log('Quiz store rehydrated');
      },
    }
  )
);

export type { CategoryWithCount } from './quizSetupSlice';
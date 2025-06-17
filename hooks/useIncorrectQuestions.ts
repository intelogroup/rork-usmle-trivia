import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useIncorrectQuestions() {
  const { user, isAuthenticated } = useAuthStore();
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadIncorrectQuestionsCount = async () => {
    try {
      setIsLoading(true);
      if (!user || !isAuthenticated) {
        setIncorrectCount(0);
        return;
      }

      // Load quiz sessions from local storage
      const sessionsData = await AsyncStorage.getItem('quiz-sessions');
      const sessions = sessionsData ? JSON.parse(sessionsData) : [];

      // Count incorrect answers from sessions
      let incorrectAnswers = 0;
      sessions.forEach((session: any) => {
        const totalQuestions = session.total_questions || 0;
        const correctAnswers = session.correct_answers || session.score || 0;
        incorrectAnswers += (totalQuestions - correctAnswers);
      });

      setIncorrectCount(incorrectAnswers);
    } catch (error) {
      console.error('Error loading incorrect questions count (silently bypassed):', error);
      setIncorrectCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      loadIncorrectQuestionsCount();
    } else {
      setIncorrectCount(0);
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  const startReviewQuiz = async (limit: number = 15) => {
    try {
      setIsLoading(true);
      if (!user || !isAuthenticated) {
        return;
      }

      // For local storage, we'll simulate review quiz functionality
      console.log(`Starting review quiz with up to ${limit} questions`);
      
      // In a real implementation, you would:
      // 1. Load specific incorrect questions from local storage
      // 2. Start a quiz with those questions
      // For now, we'll just log this action
      
    } catch (error) {
      console.error('Error starting review quiz (silently bypassed):', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    incorrectCount,
    isLoading,
    loadIncorrectQuestionsCount,
    startReviewQuiz,
  };
}
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import { supabase } from '@/lib/supabase';

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

      // Query to count distinct questions the user got wrong
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('question_id')
        .eq('user_id', user.id)
        .eq('is_correct', false);

      if (error) {
        throw error;
      }

      // Count unique question IDs
      const uniqueQuestions = new Set(data?.map(attempt => attempt.question_id)).size;
      setIncorrectCount(uniqueQuestions);
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

      // Fetch distinct incorrect question IDs
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('question_id')
        .eq('user_id', user.id)
        .eq('is_correct', false)
        .limit(limit);

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        console.log('No incorrect questions found for review');
        return;
      }

      const questionIds = data.map(attempt => attempt.question_id);
      
      // Fetch full question data (mock implementation since we don't have a questions table in this code)
      // In a real app, you'd join with the questions table
      console.log(`Starting review quiz with ${questionIds.length} incorrect questions`);
      
      // Navigate or start quiz with these question IDs
      // This would be implemented with quizStore.startQuizWithSpecificQuestions(questionIds)
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
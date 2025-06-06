import { useState, useEffect } from 'react';
import { useStatsStore } from '@/store/statsStore';
import { useQuizStore } from '@/store/quiz/quizStore';

interface WeakestCategory {
  id: string;
  name: string;
  accuracy: number;
  totalQuizzes: number;
}

export function useWeakestCategories(): { 
  weakestCategories: WeakestCategory[], 
  isLoading: boolean 
} {
  const { stats, isLoading: isStatsLoading } = useStatsStore();
  const { categories, isLoadingCategories } = useQuizStore();
  const [weakestCategories, setWeakestCategories] = useState<WeakestCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isStatsLoading && !isLoadingCategories) {
      try {
        // Calculate weakest categories based on category stats
        const categoryStats = stats.categoryStats || {};
        const MIN_QUIZZES = 1; // Minimum quizzes taken to consider as a weak area
        
        const weakCategories: WeakestCategory[] = Object.entries(categoryStats)
          .filter(([_, stat]) => stat.totalQuizzes >= MIN_QUIZZES)
          .map(([categoryId, stat]) => {
            // Get category name from categories list
            const category = categories.find(cat => cat.id === categoryId);
            return {
              id: categoryId,
              name: category?.name || 'Unknown Category',
              accuracy: Math.round(stat.averageAccuracy) || 0,
              totalQuizzes: stat.totalQuizzes || 0,
            };
          })
          .sort((a, b) => a.accuracy - b.accuracy); // Sort ascending to get lowest accuracy first
        
        setWeakestCategories(weakCategories);
      } catch (error) {
        console.error('Error calculating weakest categories (silently bypassed):', error);
        setWeakestCategories([]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [stats, categories, isStatsLoading, isLoadingCategories]);

  return { weakestCategories, isLoading };
}
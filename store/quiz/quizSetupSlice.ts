import { StateCreator } from 'zustand';
import { usmle_categories } from '@/mocks/usmle_categories';
import { usmle_questions } from '@/mocks/usmle_questions';
import type { UsmleCategory } from '@/lib/types/usmle';

export interface CategoryWithCount {
  id: string;
  name: string;
  description?: string;
  question_count: number;
  icon?: string;
  color: string;
  created_at: string;
  updated_at: string;
  parent_id: string | null;
  grouping: string;
  questionCount: number;
}

export interface QuizSetupState {
  categories: UsmleCategory[];
  categoriesWithCounts: CategoryWithCount[];
  isLoadingCategories: boolean;
  categoriesError: string | null;
  availableQuestionCount: number;
  isCheckingAvailability: boolean;
  loadCategories: () => Promise<void>;
  loadCategoriesWithQuestionCount: () => Promise<void>;
  checkQuestionAvailability: (categoryIds: string[], difficulty?: 'easy' | 'medium' | 'hard' | 'all') => Promise<number>;
  getCategoryName: (categoryId: string) => string;
}

export const createQuizSetupSlice: StateCreator<QuizSetupState> = (set, get) => ({
  categories: [],
  categoriesWithCounts: [],
  isLoadingCategories: false,
  categoriesError: null,
  availableQuestionCount: 0,
  isCheckingAvailability: false,

  loadCategories: async () => {
    set({ isLoadingCategories: true, categoriesError: null });
    
    try {
      // Use mock data directly (no database calls)
      const validCategories = Array.isArray(usmle_categories) ? usmle_categories : [];
      set({ categories: validCategories, isLoadingCategories: false });
    } catch (error: unknown) {
      console.error('Error loading categories:', error);
      const validCategories = Array.isArray(usmle_categories) ? usmle_categories : [];
      set({ 
        categories: validCategories,
        categoriesError: null,
        isLoadingCategories: false 
      });
    }
  },

  loadCategoriesWithQuestionCount: async () => {
    set({ isLoadingCategories: true, categoriesError: null });
    
    try {
      const validCategories = Array.isArray(usmle_categories) ? usmle_categories : [];
      const validQuestions = Array.isArray(usmle_questions) ? usmle_questions : [];

      // Count questions for each category
      const categoriesWithCounts: CategoryWithCount[] = validCategories.map(category => {
        const questionCount = validQuestions.filter(q => q.category_id === category.id).length;
        return {
          id: category.id,
          name: category.name,
          description: category.description,
          question_count: category.question_count,
          icon: category.icon,
          color: category.color,
          created_at: category.created_at,
          updated_at: category.updated_at,
          parent_id: category.parent_id,
          grouping: category.grouping,
          questionCount
        };
      });

      set({ 
        categoriesWithCounts,
        categories: validCategories,
        isLoadingCategories: false 
      });
    } catch (error: unknown) {
      console.error('Error loading categories with counts:', error);
      set({ 
        categoriesWithCounts: [],
        categories: [],
        categoriesError: 'Failed to load categories',
        isLoadingCategories: false 
      });
    }
  },

  checkQuestionAvailability: async (categoryIds: string[], difficulty?: 'easy' | 'medium' | 'hard' | 'all') => {
    set({ isCheckingAvailability: true });
    
    try {
      // Ensure we have valid arrays to work with
      const validCategoryIds = Array.isArray(categoryIds) ? categoryIds : [];
      const validQuestions = Array.isArray(usmle_questions) ? usmle_questions : [];

      if (validCategoryIds.length === 0) {
        set({ availableQuestionCount: 0, isCheckingAvailability: false });
        return 0;
      }

      // Filter questions by categories and difficulty
      let filteredQuestions = validQuestions.filter(q => 
        validCategoryIds.includes(q.category_id)
      );

      // Fix the difficulty filtering logic - check if difficulty is 'all' OR matches question difficulty
      if (difficulty && difficulty !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
      }

      const count = filteredQuestions.length;
      set({ availableQuestionCount: count, isCheckingAvailability: false });
      return count;
    } catch (error: unknown) {
      console.error('Error checking question availability:', error);
      set({ availableQuestionCount: 0, isCheckingAvailability: false });
      return 0;
    }
  },

  getCategoryName: (categoryId: string) => {
    const { categories: storeCategories } = get();
    const validCategories = Array.isArray(storeCategories) ? storeCategories : [];
    const category = validCategories.find(cat => cat.id === categoryId);
    return category?.name || 'Quiz';
  },
});
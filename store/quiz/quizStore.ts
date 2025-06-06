import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { categories } from '@/mocks/categories';
import { questions } from '@/mocks/questions';
import type { Question } from '@/mocks/questions';
import type { QuizMode } from '@/lib/types/quiz';

interface Category {
  id: string;
  name: string;
  description?: string;
  question_count: number;
  icon?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

interface QuizSession {
  id: string;
  user_id: string;
  category_id: string;
  questions: Question[];
  answers: number[];
  currentQuestionIndex: number;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_taken: number;
  mode: QuizMode;
  difficulty: string;
  isCompleted: boolean;
  isAnswerSubmitted: boolean;
  selectedAnswer?: number;
  started_at: string;
  completed_at: string | null;
}

interface QuizState {
  // Categories
  categories: Category[];
  isLoadingCategories: boolean;
  categoriesError: string | null;
  
  // Quiz Session
  currentSession: QuizSession | null;
  isLoading: boolean;
  error: string | null;
  selectedAnswer: number | null;
  timeRemaining: number | null;
  isTimerActive: boolean;
  
  // Quiz validation
  availableQuestionCount: number;
  isCheckingAvailability: boolean;
  
  // Actions
  loadCategories: () => Promise<void>;
  checkQuestionAvailability: (categoryIds: string[], difficulty?: 'easy' | 'medium' | 'hard' | 'all') => Promise<number>;
  startQuiz: (categoryIds: string[], questionCount: number, difficulty?: 'easy' | 'medium' | 'hard' | 'all', mode?: QuizMode) => Promise<void>;
  startTimedChallenge: () => Promise<void>;
  selectAnswer: (answerIndex: number) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetQuiz: () => void;
  saveSession: () => Promise<void>;
  setTimeRemaining: (time: number) => void;
  setTimerActive: (active: boolean) => void;
  handleTimeUp: () => void;
  getCategoryName: (categoryId: string) => string;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      // Categories state
      categories: [],
      isLoadingCategories: false,
      categoriesError: null,
      
      // Quiz session state
      currentSession: null,
      isLoading: false,
      error: null,
      selectedAnswer: null,
      timeRemaining: null,
      isTimerActive: false,
      
      // Quiz validation state
      availableQuestionCount: 0,
      isCheckingAvailability: false,

      loadCategories: async () => {
        set({ isLoadingCategories: true, categoriesError: null });
        
        try {
          // Try to load from Supabase first
          const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

          if (error) {
            throw error;
          }

          if (data && Array.isArray(data) && data.length > 0) {
            // Map Supabase data to our Category interface
            const mappedCategories = data.map(cat => ({
              id: cat.id,
              name: cat.name,
              description: cat.description,
              question_count: cat.question_count || 0,
              icon: cat.icon,
              color: cat.color,
              created_at: cat.created_at,
              updated_at: cat.updated_at,
            }));
            set({ categories: mappedCategories, isLoadingCategories: false });
          } else {
            // Fallback to mock data if no data in Supabase
            const validCategories = Array.isArray(categories) ? categories : [];
            set({ categories: validCategories, isLoadingCategories: false });
          }
        } catch (error: unknown) {
          console.error('Error loading categories, using mock data:', error);
          // Use mock data as fallback
          const validCategories = Array.isArray(categories) ? categories : [];
          set({ 
            categories: validCategories,
            categoriesError: null, // Don't show error to user, just use mock data
            isLoadingCategories: false 
          });
        }
      },

      checkQuestionAvailability: async (categoryIds: string[], difficulty?: 'easy' | 'medium' | 'hard' | 'all') => {
        set({ isCheckingAvailability: true });
        
        try {
          // Ensure we have valid arrays to work with
          const validCategoryIds = Array.isArray(categoryIds) ? categoryIds : [];
          const validQuestions = Array.isArray(questions) ? questions : [];

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

      setTimeRemaining: (time: number) => {
        set({ timeRemaining: time });
      },

      setTimerActive: (active: boolean) => {
        set({ isTimerActive: active });
      },

      handleTimeUp: () => {
        const { currentSession } = get();
        if (currentSession && !currentSession.isAnswerSubmitted) {
          // Auto-submit with no answer selected
          set({
            isTimerActive: false,
            currentSession: {
              ...currentSession,
              isAnswerSubmitted: true,
              selectedAnswer: undefined,
            }
          });
        }
      },

      startQuiz: async (categoryIds: string[], questionCount: number, difficulty?: 'easy' | 'medium' | 'hard' | 'all', mode: QuizMode = 'standard') => {
        try {
          set({ isLoading: true, error: null });

          // Ensure we have valid arrays to work with
          const validCategoryIds = Array.isArray(categoryIds) ? categoryIds : [];
          const validQuestions = Array.isArray(questions) ? questions : [];

          if (validCategoryIds.length === 0) {
            throw new Error('Please select at least one category to start the quiz.');
          }

          if (validQuestions.length === 0) {
            throw new Error('No questions are available at the moment. Please try again later.');
          }

          // Filter questions by categories and difficulty
          let filteredQuestions = validQuestions.filter(q => 
            validCategoryIds.includes(q.category_id)
          );

          // Fix the difficulty filtering logic - check if difficulty is 'all' OR matches question difficulty
          if (difficulty && difficulty !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
          }

          if (filteredQuestions.length === 0) {
            const difficultyText = difficulty && difficulty !== 'all' ? ` with ${difficulty} difficulty` : '';
            const categoryNames = get().categories
              .filter(cat => validCategoryIds.includes(cat.id))
              .map(cat => cat.name)
              .join(', ');
            
            throw new Error(`No questions found for ${categoryNames}${difficultyText}. Please try different categories or difficulty settings.`);
          }

          if (filteredQuestions.length < questionCount) {
            const categoryNames = get().categories
              .filter(cat => validCategoryIds.includes(cat.id))
              .map(cat => cat.name)
              .join(', ');
            
            throw new Error(`Only ${filteredQuestions.length} questions available for ${categoryNames}. Please reduce the number of questions or select more categories.`);
          }

          // Shuffle and limit questions
          const shuffledQuestions = filteredQuestions
            .sort(() => Math.random() - 0.5)
            .slice(0, questionCount);

          const session: QuizSession = {
            id: Date.now().toString(),
            user_id: 'temp-user',
            category_id: validCategoryIds[0],
            questions: shuffledQuestions,
            answers: [], // Initialize empty answers array
            currentQuestionIndex: 0,
            score: 0,
            total_questions: shuffledQuestions.length,
            correct_answers: 0,
            time_taken: 0,
            mode,
            difficulty: difficulty || 'all',
            isCompleted: false,
            isAnswerSubmitted: false,
            selectedAnswer: undefined,
            started_at: new Date().toISOString(),
            completed_at: null,
          };

          // Set timer for timed mode
          const timePerQuestion = mode === 'timed' ? 30 : null;
          
          set({ 
            currentSession: session, 
            isLoading: false,
            selectedAnswer: null,
            timeRemaining: timePerQuestion,
            isTimerActive: mode === 'timed'
          });

        } catch (error: unknown) {
          console.error('Error starting quiz:', error);
          let errorMessage = 'Failed to start quiz';
          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (typeof error === 'string') {
            errorMessage = error;
          }
          set({ 
            isLoading: false, 
            error: errorMessage
          });
        }
      },

      startTimedChallenge: async () => {
        try {
          set({ isLoading: true, error: null });
          const validQuestions = Array.isArray(questions) ? questions : [];
          
          if (validQuestions.length === 0) {
            throw new Error('No questions are available at the moment. Please try again later.');
          }

          // Get all category IDs
          const categoryIds = get().categories.map(cat => cat.id);
          
          if (categoryIds.length === 0) {
            throw new Error('No categories available for timed challenge.');
          }

          // Use all questions for timed challenge
          const questionCount = Math.min(10, validQuestions.length);
          
          // Shuffle and limit questions
          const shuffledQuestions = validQuestions
            .sort(() => Math.random() - 0.5)
            .slice(0, questionCount);

          const session: QuizSession = {
            id: Date.now().toString(),
            user_id: 'temp-user',
            category_id: categoryIds[0],
            questions: shuffledQuestions,
            answers: [], // Initialize empty answers array
            currentQuestionIndex: 0,
            score: 0,
            total_questions: shuffledQuestions.length,
            correct_answers: 0,
            time_taken: 0,
            mode: 'timed',
            difficulty: 'all',
            isCompleted: false,
            isAnswerSubmitted: false,
            selectedAnswer: undefined,
            started_at: new Date().toISOString(),
            completed_at: null,
          };

          // Set timer for timed mode
          const timePerQuestion = 30;
          
          set({ 
            currentSession: session, 
            isLoading: false,
            selectedAnswer: null,
            timeRemaining: timePerQuestion,
            isTimerActive: true
          });

        } catch (error: unknown) {
          console.error('Error starting timed challenge:', error);
          let errorMessage = 'Failed to start timed challenge';
          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (typeof error === 'string') {
            errorMessage = error;
          }
          set({ 
            isLoading: false, 
            error: errorMessage
          });
        }
      },

      selectAnswer: (answerIndex: number) => {
        const { currentSession } = get();
        if (!currentSession || currentSession.isAnswerSubmitted) return;

        set({
          selectedAnswer: answerIndex,
          currentSession: {
            ...currentSession,
            selectedAnswer: answerIndex,
          }
        });
      },

      submitAnswer: () => {
        const { currentSession, selectedAnswer } = get();
        if (!currentSession || currentSession.isAnswerSubmitted) return;

        const validQuestions = Array.isArray(currentSession.questions) ? currentSession.questions : [];
        const currentQuestion = validQuestions[currentSession.currentQuestionIndex];
        
        if (!currentQuestion) return;
        
        const isCorrect = selectedAnswer === currentQuestion.correct_answer;

        // Update answers array
        const newAnswers = [...(Array.isArray(currentSession.answers) ? currentSession.answers : [])];
        newAnswers[currentSession.currentQuestionIndex] = selectedAnswer || -1;

        set({
          isTimerActive: false,
          currentSession: {
            ...currentSession,
            isAnswerSubmitted: true,
            answers: newAnswers,
            score: isCorrect ? currentSession.score + 1 : currentSession.score,
            correct_answers: isCorrect ? currentSession.correct_answers + 1 : currentSession.correct_answers,
          }
        });
      },

      nextQuestion: () => {
        const { currentSession } = get();
        if (!currentSession) return;

        const validQuestions = Array.isArray(currentSession.questions) ? currentSession.questions : [];
        const nextIndex = currentSession.currentQuestionIndex + 1;
        const isLastQuestion = nextIndex >= validQuestions.length;

        if (isLastQuestion) {
          // Complete the quiz
          set({
            currentSession: {
              ...currentSession,
              isCompleted: true,
              completed_at: new Date().toISOString(),
            },
            selectedAnswer: null,
            timeRemaining: null,
            isTimerActive: false,
          });
          
          // Save session
          get().saveSession();
        } else {
          // Move to next question
          const timePerQuestion = currentSession.mode === 'timed' ? 30 : null;
          
          set({
            currentSession: {
              ...currentSession,
              currentQuestionIndex: nextIndex,
              isAnswerSubmitted: false,
              selectedAnswer: undefined,
            },
            selectedAnswer: null,
            timeRemaining: timePerQuestion,
            isTimerActive: currentSession.mode === 'timed',
          });
        }
      },

      previousQuestion: () => {
        const { currentSession } = get();
        if (!currentSession || currentSession.currentQuestionIndex === 0) return;

        set({
          currentSession: {
            ...currentSession,
            currentQuestionIndex: currentSession.currentQuestionIndex - 1,
            isAnswerSubmitted: false,
            selectedAnswer: undefined,
          },
          selectedAnswer: null,
          isTimerActive: false,
        });
      },

      resetQuiz: () => {
        set({
          currentSession: null,
          isLoading: false,
          error: null,
          selectedAnswer: null,
          timeRemaining: null,
          isTimerActive: false,
          availableQuestionCount: 0,
        });
      },

      saveSession: async () => {
        const { currentSession } = get();
        if (!currentSession || !currentSession.isCompleted) return;

        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          const sessionData = {
            user_id: user.id,
            category_id: currentSession.category_id,
            score: currentSession.score,
            total_questions: currentSession.total_questions,
            correct_answers: currentSession.correct_answers,
            time_taken: currentSession.time_taken,
            mode: currentSession.mode,
            difficulty: currentSession.difficulty,
            started_at: currentSession.started_at,
            completed_at: currentSession.completed_at,
          };

          const { error } = await supabase
            .from('quiz_sessions')
            .insert([sessionData]);

          if (error) {
            console.error('Error saving quiz session:', error);
          }
        } catch (error: unknown) {
          let errorMessage = 'Unknown error saving quiz session';
          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (typeof error === 'string') {
            errorMessage = error;
          }
          console.error('Error saving quiz session (silently bypassed):', errorMessage);
        }
      },
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentSession: state.currentSession,
      }),
    }
  )
);
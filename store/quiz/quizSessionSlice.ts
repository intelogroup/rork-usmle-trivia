import { StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usmle_questions } from '@/mocks/usmle_questions';
import type { QuizMode, QuizSession } from '@/lib/types/quiz';
import type { UsmleQuestion } from '@/lib/types/usmle';

export interface QuizSessionState {
  currentSession: QuizSession | null;
  isLoading: boolean;
  error: string | null;
  selectedAnswer: number;
  timeRemaining: number | null;
  isTimerActive: boolean;
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
}

export const createQuizSessionSlice: StateCreator<QuizSessionState> = (set, get) => ({
  currentSession: null,
  isLoading: false,
  error: null,
  selectedAnswer: -1,
  timeRemaining: null,
  isTimerActive: false,

  startQuiz: async (categoryIds: string[], questionCount: number, difficulty?: 'easy' | 'medium' | 'hard' | 'all', mode: QuizMode = 'standard') => {
    try {
      set({ isLoading: true, error: null });

      // Ensure we have valid arrays to work with
      const validCategoryIds = Array.isArray(categoryIds) ? categoryIds : [];
      const validQuestions = Array.isArray(usmle_questions) ? usmle_questions : [];

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
        throw new Error(`No questions found${difficultyText}. Please try different categories or difficulty settings.`);
      }

      if (filteredQuestions.length < questionCount) {
        throw new Error(`Only ${filteredQuestions.length} questions available. Please reduce the number of questions or select more categories.`);
      }

      // Shuffle and limit questions
      const shuffledQuestions = filteredQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, questionCount);

      const session: QuizSession = {
        id: Date.now().toString(),
        user_id: 'local-user',
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
        selectedAnswer: -1,
        started_at: new Date().toISOString(),
        completed_at: null,
      };

      // Set timer for timed mode
      const timePerQuestion = mode === 'timed' ? 30 : null;
      
      set({ 
        currentSession: session, 
        isLoading: false,
        selectedAnswer: -1,
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
      const validQuestions = Array.isArray(usmle_questions) ? usmle_questions : [];
      
      if (validQuestions.length === 0) {
        throw new Error('No questions are available at the moment. Please try again later.');
      }

      // Use all questions for timed challenge
      const questionCount = Math.min(10, validQuestions.length);
      
      // Shuffle and limit questions
      const shuffledQuestions = validQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, questionCount);

      const session: QuizSession = {
        id: Date.now().toString(),
        user_id: 'local-user',
        category_id: 'general',
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
        selectedAnswer: -1,
        started_at: new Date().toISOString(),
        completed_at: null,
      };

      // Set timer for timed mode
      const timePerQuestion = 30;
      
      set({ 
        currentSession: session, 
        isLoading: false,
        selectedAnswer: -1,
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
    if (!currentSession || currentSession.isAnswerSubmitted || selectedAnswer === -1) return;

    const validQuestions = Array.isArray(currentSession.questions) ? currentSession.questions : [];
    const currentQuestion = validQuestions[currentSession.currentQuestionIndex] as UsmleQuestion;
    
    if (!currentQuestion) return;
    
    // Handle UsmleQuestion type - check if selected option ID matches correct option ID
    const isCorrect = selectedAnswer >= 0 && 
      selectedAnswer < currentQuestion.options.length &&
      currentQuestion.options[selectedAnswer]?.id === currentQuestion.correct_option_id;

    // Update answers array
    const newAnswers = [...(Array.isArray(currentSession.answers) ? currentSession.answers : [])];
    newAnswers[currentSession.currentQuestionIndex] = selectedAnswer;

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
        selectedAnswer: -1,
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
          selectedAnswer: -1,
        },
        selectedAnswer: -1,
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
        selectedAnswer: -1,
      },
      selectedAnswer: -1,
      isTimerActive: false,
    });
  },

  resetQuiz: () => {
    set({
      currentSession: null,
      isLoading: false,
      error: null,
      selectedAnswer: -1,
      timeRemaining: null,
      isTimerActive: false,
    });
  },

  saveSession: async () => {
    const { currentSession } = get();
    if (!currentSession || !currentSession.isCompleted) return;

    try {
      // Save to local storage instead of Supabase
      const sessionData = {
        id: currentSession.id,
        user_id: 'local-user',
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

      // Get existing sessions
      const existingSessionsData = await AsyncStorage.getItem('quiz-sessions');
      const existingSessions = existingSessionsData ? JSON.parse(existingSessionsData) : [];
      
      // Add new session
      existingSessions.push(sessionData);
      
      // Save back to storage
      await AsyncStorage.setItem('quiz-sessions', JSON.stringify(existingSessions));
      
      console.log('Quiz session saved to local storage');
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
          selectedAnswer: -1,
        },
        selectedAnswer: -1
      });
    }
  },
});
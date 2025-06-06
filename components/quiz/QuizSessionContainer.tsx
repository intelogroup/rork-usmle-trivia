import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import Colors from '@/theme/colors';
import QuizSessionHeader from '@/components/quiz/QuizSessionHeader';
import QuizSessionContent from '@/components/quiz/QuizSessionContent';
import QuizSessionFooter from '@/components/quiz/QuizSessionFooter';
import { useQuizStore } from '@/store/quiz/quizStore';
import { useQuizTimer } from '@/hooks/useQuizTimer';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { UsmleQuestion } from '@/lib/types/usmle';
import Typography from '@/theme/typography';
import { Spacing } from '@/theme/spacing';

interface QuizSessionContainerProps {
  categoryId?: string;
  categories?: string[];
  count?: number;
  mode?: string;
  difficulty?: string;
}

export default function QuizSessionContainer({
  categoryId,
  categories,
  count = 10,
  mode = 'standard',
  difficulty = 'all',
}: QuizSessionContainerProps) {
  const router = useRouter();
  const { 
    currentSession, 
    isLoading, 
    error, 
    startQuiz, 
    selectAnswer, 
    submitAnswer, 
    nextQuestion, 
    resetQuiz,
    timeRemaining,
    isTimerActive,
    setTimeRemaining,
    setTimerActive,
    handleTimeUp,
    getCategoryName
  } = useQuizStore();

  // Initialize timer for timed mode
  const timer = useQuizTimer(30, false);

  useEffect(() => {
    if (!currentSession) {
      // Start quiz with provided parameters
      const validCategories = Array.isArray(categories) ? categories : [];
      const categoryIds = validCategories.length > 0 ? validCategories : (categoryId ? [categoryId] : ['general']);
      const validCount = Math.max(1, Math.min(50, Number(count) || 10));
      
      startQuiz(
        categoryIds, 
        validCount, 
        difficulty === 'all' ? undefined : difficulty as 'easy' | 'medium' | 'hard', 
        mode as any
      );
    }
  }, [currentSession, categoryId, categories, count, difficulty, mode, startQuiz]);

  // Handle timer for timed mode
  useEffect(() => {
    if (currentSession && currentSession.mode === 'timed' && !currentSession.isAnswerSubmitted) {
      timer.resetTimer(30);
      timer.resumeTimer();
      setTimerActive(true);
    } else {
      timer.pauseTimer();
      setTimerActive(false);
    }
  }, [currentSession?.currentQuestionIndex, currentSession?.isAnswerSubmitted, currentSession?.mode]);

  // Set up timer callback
  useEffect(() => {
    timer.setOnTimeUp(() => {
      handleTimeUp();
    });
  }, [timer, handleTimeUp]);

  // Update store with timer state
  useEffect(() => {
    setTimeRemaining(timer.timeRemaining);
  }, [timer.timeRemaining]);

  // Navigate to results when quiz is completed
  useEffect(() => {
    if (currentSession && currentSession.isCompleted) {
      const validQuestions = Array.isArray(currentSession.questions) ? currentSession.questions : [];
      router.push({
        pathname: '/quiz-results',
        params: {
          score: currentSession.score.toString(),
          total: validQuestions.length.toString(),
          mode: mode,
        },
      });
    }
  }, [currentSession, router, mode]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!currentSession || currentSession.isAnswerSubmitted) return;
    selectAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (currentSession && !currentSession.isAnswerSubmitted && currentSession.selectedAnswer !== undefined && currentSession.selectedAnswer !== -1) {
      timer.pauseTimer();
      submitAnswer();
    }
  };

  const handleNextQuestion = () => {
    if (currentSession && currentSession.isAnswerSubmitted) {
      nextQuestion();
    }
  };

  const handlePreviousQuestion = () => {
    // Previous question functionality could be added here
    console.log('Previous question not implemented yet');
  };

  const handleRetry = () => {
    timer.pauseTimer();
    resetQuiz();
    const validCategories = Array.isArray(categories) ? categories : [];
    const categoryIds = validCategories.length > 0 ? validCategories : (categoryId ? [categoryId] : ['general']);
    const validCount = Math.max(1, Math.min(50, Number(count) || 10));
    
    startQuiz(
      categoryIds, 
      validCount, 
      difficulty === 'all' ? undefined : difficulty as 'easy' | 'medium' | 'hard', 
      mode as any
    );
  };

  const handleGoBack = () => {
    timer.pauseTimer();
    resetQuiz();
    router.back();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading quiz...</Text>
          <Text style={styles.loadingSubtext}>Preparing your questions</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Unable to start quiz</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Try Again"
              onPress={handleRetry}
              style={styles.retryButton}
            />
            <Button
              title="Go Back"
              onPress={handleGoBack}
              variant="outline"
              style={styles.backButton}
            />
          </View>
        </View>
      );
    }

    if (!currentSession) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>No quiz session found</Text>
          <Text style={styles.errorSubtext}>Please start a new quiz session.</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Start Quiz"
              onPress={handleRetry}
              style={styles.retryButton}
            />
            <Button
              title="Go Back"
              onPress={handleGoBack}
              variant="outline"
              style={styles.backButton}
            />
          </View>
        </View>
      );
    }

    if (currentSession.isCompleted) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.completedText}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>
            Score: {currentSession.score}/{(Array.isArray(currentSession.questions) ? currentSession.questions : []).length}
          </Text>
          <Text style={styles.redirectText}>Redirecting to results...</Text>
        </View>
      );
    }

    const validQuestions = Array.isArray(currentSession.questions) ? currentSession.questions : [];
    const currentQuestion = validQuestions[currentSession.currentQuestionIndex] as UsmleQuestion;
    
    if (!currentQuestion) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Question not found</Text>
          <Text style={styles.errorSubtext}>An error occurred while loading the question.</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Retry"
              onPress={handleRetry}
              style={styles.retryButton}
            />
            <Button
              title="Go Back"
              onPress={handleGoBack}
              variant="outline"
              style={styles.backButton}
            />
          </View>
        </View>
      );
    }

    const selectedAnswer = currentSession.selectedAnswer !== undefined && currentSession.selectedAnswer !== -1 ? currentSession.selectedAnswer : null;
    const isAnswerSubmitted = currentSession.isAnswerSubmitted || false;

    return (
      <QuizSessionContent
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        isAnswerSubmitted={isAnswerSubmitted}
        onOptionPress={handleAnswerSelect}
      />
    );
  };

  const validQuestions = currentSession && Array.isArray(currentSession.questions) ? currentSession.questions : [];
  const progress = currentSession 
    ? (currentSession.currentQuestionIndex + 1) / validQuestions.length 
    : 0;

  const footerSelectedAnswer = currentSession && currentSession.selectedAnswer !== undefined && currentSession.selectedAnswer !== -1
    ? currentSession.selectedAnswer 
    : null;

  // Get category name for header
  const categoryName = currentSession ? getCategoryName(currentSession.category_id) : 'Quiz';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {currentSession && !currentSession.isCompleted && (
          <QuizSessionHeader
            currentQuestion={currentSession.currentQuestionIndex + 1}
            totalQuestions={validQuestions.length}
            progress={progress}
            timeRemaining={currentSession.mode === 'timed' ? timer.timeRemaining : undefined}
            mode={mode}
            categoryName={categoryName}
          />
        )}
        
        <View style={styles.mainContent}>
          {renderContent()}
        </View>
        
        {currentSession && !currentSession.isCompleted && (
          <QuizSessionFooter
            selectedAnswer={footerSelectedAnswer}
            isAnswerSubmitted={currentSession.isAnswerSubmitted || false}
            canGoNext={currentSession.currentQuestionIndex < validQuestions.length - 1}
            canGoPrevious={currentSession.currentQuestionIndex > 0}
            onSubmit={handleSubmitAnswer}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    ...Typography.styles.h4,
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  loadingSubtext: {
    ...Typography.styles.body,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    ...Typography.styles.h4,
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  errorSubtext: {
    ...Typography.styles.body,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  completedText: {
    ...Typography.styles.h2,
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  scoreText: {
    ...Typography.styles.bodyLarge,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  redirectText: {
    ...Typography.styles.body,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  retryButton: {
    minWidth: 100,
  },
  backButton: {
    minWidth: 100,
  },
});
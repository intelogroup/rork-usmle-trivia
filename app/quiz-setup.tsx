import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';
import { useQuizStore } from '@/store/quiz/quizStore';
import { useAuthStore } from '@/store/auth/authStore';
import QuizSettings from '@/components/quiz/QuizSettings';
import AuthPrompt from '@/components/quiz/AuthPrompt';
import Button from '@/components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, AlertTriangle, Rocket, Target, Zap } from 'lucide-react-native';
import type { QuizMode } from '@/lib/types/quiz';

export default function QuizSetupScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { 
    categoriesWithCounts,
    startQuiz,
    isLoading,
    error,
    checkQuestionAvailability,
    availableQuestionCount,
    isCheckingAvailability
  } = useQuizStore();
  const { isAuthenticated } = useAuthStore();

  const [questionCount, setQuestionCount] = useState<number>(10);
  const [quizMode, setQuizMode] = useState<QuizMode>('standard');
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Find the selected category
  const selectedCategory = categoriesWithCounts.find(cat => cat.id === categoryId);

  useEffect(() => {
    const checkAvailability = async () => {
      if (categoryId) {
        const count = await checkQuestionAvailability(
          [categoryId], 
          difficulty === 'all' ? undefined : difficulty
        );
        
        if (count === 0) {
          setValidationError('No questions available for the selected criteria. Please adjust your selections.');
        } else if (count < questionCount) {
          setValidationError(`Only ${count} questions available. Please reduce the number of questions.`);
        } else {
          setValidationError(null);
        }
      }
    };

    const timeoutId = setTimeout(checkAvailability, 300);
    return () => clearTimeout(timeoutId);
  }, [categoryId, difficulty, questionCount, checkQuestionAvailability]);

  const handleStartQuiz = async () => {
    if (!categoryId) return;

    setValidationError(null);
    
    const validQuestionCount = Number(questionCount) || 10;
    const finalQuestionCount = Math.max(1, Math.min(50, validQuestionCount));

    if (availableQuestionCount > 0 && availableQuestionCount < finalQuestionCount) {
      setValidationError(`Only ${availableQuestionCount} questions available. Please reduce the number of questions.`);
      return;
    }

    try {
      await startQuiz(
        [categoryId],
        finalQuestionCount,
        difficulty === 'all' ? undefined : difficulty,
        quizMode
      );

      // Navigate to countdown screen before quiz session
      router.push('/quiz-countdown');
    } catch (err) {
      console.error('Error starting quiz:', err);
    }
  };

  const isStartDisabled = isLoading || 
                         isCheckingAvailability || 
                         validationError !== null ||
                         !categoryId;

  if (!selectedCategory) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Quiz Setup',
            headerTintColor: Colors.dark.text,
            headerStyle: {
              backgroundColor: Colors.dark.background,
            },
          }} 
        />
        <View style={styles.errorContainer}>
          <AlertTriangle size={48} color={Colors.dark.textSecondary} />
          <Text style={styles.errorText}>Category not found 😔</Text>
          <Text style={styles.errorSubtext}>Please select a valid category to continue! 🎯</Text>
          <Button
            title="Go Back 🔙"
            onPress={() => router.back()}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Quiz Setup',
          headerTintColor: Colors.dark.text,
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
        }} 
      />
      
      <LinearGradient
        colors={[Colors.dark.background, `${Colors.dark.primary}10`]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: selectedCategory.color }]}>
              <Target size={32} color={Colors.dark.background} />
            </View>
            <Text style={styles.title}>{selectedCategory.name} 🎯</Text>
            <Text style={styles.subtitle}>
              {selectedCategory.questionCount} questions available 📚
            </Text>
            <View style={styles.readyBadge}>
              <Zap size={16} color={Colors.dark.primary} />
              <Text style={styles.readyText}>Let's customize your challenge! ⚡</Text>
            </View>
          </View>

          <AuthPrompt isAuthenticated={isAuthenticated} />
          
          <QuizSettings
            questionCount={questionCount}
            onQuestionCountChange={setQuestionCount}
            quizMode={quizMode}
            onQuizModeChange={setQuizMode}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
          />

          {!isCheckingAvailability && availableQuestionCount > 0 && (
            <View style={styles.availabilityInfo}>
              <Text style={styles.availabilityText}>
                ✅ {availableQuestionCount} questions ready for your challenge! 🚀
              </Text>
            </View>
          )}

          {validationError && (
            <View style={styles.errorContainer}>
              <AlertTriangle size={16} color={Colors.dark.error} />
              <Text style={styles.errorText}>{validationError}</Text>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <AlertTriangle size={16} color={Colors.dark.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title={isLoading ? "Preparing Quiz... ⏳" : "Start Quiz 🚀"}
            onPress={handleStartQuiz}
            disabled={isStartDisabled}
            style={styles.startButton}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    elevation: 4,
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.dark.primary}15`,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${Colors.dark.primary}30`,
  },
  readyText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.primary,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.xs,
  },
  availabilityInfo: {
    backgroundColor: `${Colors.dark.success}15`,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.dark.success,
  },
  availabilityText: {
    color: Colors.dark.success,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: `${Colors.dark.error}15`,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.error,
  },
  errorText: {
    color: Colors.dark.error,
    fontSize: Typography.fontSize.sm,
    marginLeft: Spacing.sm,
    flex: 1,
    lineHeight: 20,
  },
  errorSubtext: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    backgroundColor: Colors.dark.background,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    elevation: 8,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  startButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  backButton: {
    marginTop: Spacing.lg,
    width: 200,
  },
});
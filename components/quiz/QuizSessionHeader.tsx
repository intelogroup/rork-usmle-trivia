import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Spacing } from '@/theme/spacing';
import QuestionProgressDots from './QuestionProgressDots';

interface QuizSessionHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  timeRemaining?: number;
  mode: string;
  categoryName?: string;
}

export default function QuizSessionHeader({
  currentQuestion,
  totalQuestions,
  progress,
  timeRemaining,
  mode,
  categoryName,
}: QuizSessionHeaderProps) {
  // Mock correct answers for now - in real implementation this would come from quiz state
  const correctAnswers: number[] = [];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Text style={styles.questionNumber}>
            Question {currentQuestion} of {totalQuestions}
          </Text>
          {categoryName && (
            <Text style={styles.category}>{categoryName}</Text>
          )}
        </View>
        
        <View style={styles.rightSection}>
          {mode === 'timed' && timeRemaining !== undefined && (
            <View style={styles.timerContainer}>
              <Text style={[
                styles.timer,
                timeRemaining <= 10 && styles.timerWarning
              ]}>
                {formatTime(timeRemaining)}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <QuestionProgressDots
        totalQuestions={totalQuestions}
        currentIndex={currentQuestion - 1}
        correctAnswers={correctAnswers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  questionNumber: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.textSecondary,
    marginBottom: 2,
  },
  category: {
    ...Typography.styles.bodySmall,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.dark.primary,
  },
  timerContainer: {
    backgroundColor: Colors.dark.background,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  timer: {
    ...Typography.styles.bodySmall,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  timerWarning: {
    color: Colors.dark.error,
  },
});
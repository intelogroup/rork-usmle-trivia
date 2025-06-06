import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Spacing } from '@/theme/spacing';
import QuestionProgressDots from './QuestionProgressDots';

interface QuizSessionHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  correctAnswers: number[];
  categoryName: string;
}

export default function QuizSessionHeader({
  currentQuestion,
  totalQuestions,
  correctAnswers,
  categoryName,
}: QuizSessionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1} of {totalQuestions}
        </Text>
        <Text style={styles.category}>{categoryName}</Text>
      </View>
      <QuestionProgressDots
        totalQuestions={totalQuestions}
        currentIndex={currentQuestion}
        correctAnswers={correctAnswers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  questionNumber: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.textSecondary,
  },
  category: {
    ...Typography.styles.bodySmall,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.dark.primary,
  },
});
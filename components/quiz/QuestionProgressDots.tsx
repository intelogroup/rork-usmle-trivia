import React from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import Colors from '@/theme/colors';
import { Spacing } from '@/theme/spacing';

interface QuestionProgressDotsProps {
  totalQuestions: number;
  currentIndex: number;
  correctAnswers: number[];
}

export default function QuestionProgressDots({ totalQuestions, currentIndex, correctAnswers }: QuestionProgressDotsProps) {
  const dots = Array.from({ length: totalQuestions }).map((_, index) => {
    const isAnswered = index < currentIndex;
    const isCorrect = correctAnswers.includes(index);
    const animatedValue = new Animated.Value(isAnswered ? 1 : 0);

    if (Platform.OS !== 'web' && isAnswered) {
      Animated.spring(animatedValue, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }

    return (
      <Animated.View
        key={index}
        style={[
          styles.dot,
          isAnswered && isCorrect && styles.correctDot,
          isAnswered && !isCorrect && styles.incorrectDot,
          index === currentIndex && styles.currentDot,
          Platform.OS !== 'web' && { transform: [{ scale: animatedValue }] },
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      {dots}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.border,
  },
  currentDot: {
    backgroundColor: Colors.dark.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  correctDot: {
    backgroundColor: Colors.dark.success,
  },
  incorrectDot: {
    backgroundColor: Colors.dark.error,
  },
});
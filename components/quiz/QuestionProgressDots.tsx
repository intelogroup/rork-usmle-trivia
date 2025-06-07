import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/theme/colors';
import { Spacing } from '@/theme/spacing';

interface QuestionProgressDotsProps {
  totalQuestions: number;
  currentIndex: number;
  correctAnswers: number[];
  style?: ViewStyle;
}

export default function QuestionProgressDots({
  totalQuestions,
  currentIndex,
  correctAnswers,
  style,
}: QuestionProgressDotsProps) {
  const renderDot = (index: number) => {
    const isCurrent = index === currentIndex;
    const isAnswered = index < currentIndex;
    const isCorrect = correctAnswers.includes(index);

    let dotStyle = [styles.dot];
    
    if (isCurrent) {
      dotStyle = [styles.dot, styles.currentDot];
    } else if (isAnswered) {
      dotStyle = [styles.dot, isCorrect ? styles.correctDot : styles.incorrectDot];
    } else {
      dotStyle = [styles.dot, styles.futureDot];
    }

    return <View key={index} style={dotStyle} />;
  };

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalQuestions }, (_, index) => renderDot(index))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.border,
  },
  currentDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.dark.primary,
  },
  correctDot: {
    backgroundColor: Colors.dark.success,
  },
  incorrectDot: {
    backgroundColor: Colors.dark.error,
  },
  futureDot: {
    backgroundColor: Colors.dark.border,
  },
});
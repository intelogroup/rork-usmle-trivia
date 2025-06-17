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

    let dotStyle: ViewStyle[] = [styles.dot];
    
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
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.dark.border,
    shadowColor: Colors.dark.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  currentDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.dark.primary,
    shadowColor: Colors.dark.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  correctDot: {
    backgroundColor: Colors.dark.success,
    shadowColor: Colors.dark.success,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  incorrectDot: {
    backgroundColor: Colors.dark.error,
    shadowColor: Colors.dark.error,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  futureDot: {
    backgroundColor: Colors.dark.border,
    opacity: 0.6,
  },
});
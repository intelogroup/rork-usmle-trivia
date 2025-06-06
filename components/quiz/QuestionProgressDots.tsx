import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import Colors from '@/theme/colors';
import { Spacing } from '@/theme/spacing';

interface QuestionProgressDotsProps {
  totalQuestions: number;
  currentIndex: number;
  correctAnswers: number[];
}

export default function QuestionProgressDots({ 
  totalQuestions, 
  currentIndex, 
  correctAnswers 
}: QuestionProgressDotsProps) {
  const animatedValues = useRef(
    Array.from({ length: totalQuestions }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Animate dots as questions are answered
    animatedValues.forEach((animValue, index) => {
      if (index < currentIndex) {
        if (Platform.OS !== 'web') {
          Animated.spring(animValue, {
            toValue: 1,
            tension: 80,
            friction: 8,
            useNativeDriver: true,
          }).start();
        } else {
          animValue.setValue(1);
        }
      } else if (index === currentIndex) {
        if (Platform.OS !== 'web') {
          Animated.loop(
            Animated.sequence([
              Animated.timing(animValue, {
                toValue: 1.2,
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(animValue, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }),
            ])
          ).start();
        } else {
          animValue.setValue(1);
        }
      } else {
        animValue.setValue(0.3);
      }
    });
  }, [currentIndex, totalQuestions]);

  const dots = Array.from({ length: totalQuestions }).map((_, index) => {
    const isAnswered = index < currentIndex;
    const isCorrect = correctAnswers.includes(index);
    const isCurrent = index === currentIndex;

    let dotColor = Colors.dark.border;
    if (isAnswered) {
      dotColor = isCorrect ? Colors.dark.success : Colors.dark.error;
    } else if (isCurrent) {
      dotColor = Colors.dark.primary;
    }

    return (
      <Animated.View
        key={index}
        style={[
          styles.dot,
          { 
            backgroundColor: dotColor,
            transform: Platform.OS !== 'web' ? [{ scale: animatedValues[index] }] : [],
          },
          isCurrent && styles.currentDot,
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
    paddingHorizontal: Spacing.md,
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
  },
});
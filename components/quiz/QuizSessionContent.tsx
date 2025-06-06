import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import Colors from '@/theme/colors';
import OptionButton from '@/components/OptionButton';
import type { Question } from '@/lib/types/quiz';
import { LinearGradient } from 'expo-linear-gradient';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';

interface QuizSessionContentProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  onOptionPress: (index: number) => void;
}

const FEEDBACK_EMOJIS = {
  correct: ['✅', '🎉', '👍', '🌟', '💯'],
  incorrect: ['❌', '🤔', '💭', '🔄', '📚'],
};

export default function QuizSessionContent({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onOptionPress,
}: QuizSessionContentProps) {
  const feedbackOpacity = useRef(new Animated.Value(0)).current;
  const feedbackScale = useRef(new Animated.Value(0.5)).current;
  const optionsOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isAnswerSubmitted && selectedAnswer !== null) {
      // Fade out options slightly
      Animated.timing(optionsOpacity, {
        toValue: 0.6,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Show feedback animation
      Animated.parallel([
        Animated.timing(feedbackOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(feedbackScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // Hide feedback after 2 seconds
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(feedbackOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(feedbackScale, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }, 2000);
    } else {
      // Reset animations
      feedbackOpacity.setValue(0);
      feedbackScale.setValue(0.5);
      optionsOpacity.setValue(1);
    }
  }, [isAnswerSubmitted, selectedAnswer]);

  const getFeedbackEmoji = () => {
    if (selectedAnswer === null) return '';
    const correctAnswer = question.correct_answer !== undefined ? question.correct_answer : question.correct;
    const isCorrect = selectedAnswer === correctAnswer;
    const emojis = isCorrect ? FEEDBACK_EMOJIS.correct : FEEDBACK_EMOJIS.incorrect;
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const questionText = question.question_text || question.question;
  const correctAnswer = question.correct_answer !== undefined ? question.correct_answer : question.correct;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.card, Colors.dark.background]}
        style={styles.questionContainer}
      >
        <Text style={styles.questionText}>{questionText}</Text>
      </LinearGradient>
      
      <Animated.View 
        style={[
          styles.optionsContainer,
          { opacity: optionsOpacity }
        ]}
      >
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            label={option}
            index={index}
            selected={selectedAnswer === index}
            onPress={() => onOptionPress(index)}
            disabled={isAnswerSubmitted}
            isCorrect={isAnswerSubmitted ? index === correctAnswer : null}
            showResult={isAnswerSubmitted}
          />
        ))}
      </Animated.View>

      {/* Feedback Animation */}
      {Platform.OS !== 'web' && isAnswerSubmitted && selectedAnswer !== null && (
        <Animated.View
          style={[
            styles.feedbackContainer,
            {
              opacity: feedbackOpacity,
              transform: [{ scale: feedbackScale }],
            },
          ]}
        >
          <Text style={styles.feedbackEmoji}>{getFeedbackEmoji()}</Text>
          <Text style={styles.feedbackText}>
            {selectedAnswer === correctAnswer ? 'Correct!' : 'Try again!'}
          </Text>
        </Animated.View>
      )}

      {/* Show explanation after answer is submitted */}
      {isAnswerSubmitted && question.explanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Explanation:</Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
  },
  questionContainer: {
    borderRadius: 16,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    elevation: 2,
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  questionText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.dark.text,
    lineHeight: 28,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    gap: Spacing.md,
  },
  feedbackContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -50 }],
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.primary,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    width: 150,
  },
  feedbackEmoji: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  feedbackText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    textAlign: 'center',
  },
  explanationContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  explanationTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
  },
  explanationText: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    lineHeight: 24,
  },
});
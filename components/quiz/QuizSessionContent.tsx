import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform, ScrollView } from 'react-native';
import Colors from '@/theme/colors';
import OptionButton from '@/components/OptionButton';
import type { UsmleQuestion } from '@/lib/types/usmle';
import { LinearGradient } from 'expo-linear-gradient';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';
import { ThumbsUp, ThumbsDown, Lightbulb, CheckCircle, XCircle } from 'lucide-react-native';

interface QuizSessionContentProps {
  question: UsmleQuestion;
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  onOptionPress: (index: number) => void;
}

const CELEBRATION_EMOJIS = {
  correct: ['🎉', '✨', '🌟', '💫', '🎊', '🏆', '👏', '🔥'],
  incorrect: ['💭', '🤔', '📚', '💡', '🎯', '🔄', '📖', '⚡'],
};

export default function QuizSessionContent({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onOptionPress,
}: QuizSessionContentProps) {
  const feedbackOpacity = useRef(new Animated.Value(0)).current;
  const feedbackScale = useRef(new Animated.Value(0.3)).current;
  const feedbackTranslateY = useRef(new Animated.Value(-50)).current;
  const optionsOpacity = useRef(new Animated.Value(1)).current;
  const celebrationOpacity = useRef(new Animated.Value(0)).current;
  const celebrationScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (isAnswerSubmitted && selectedAnswer !== null) {
      const correctAnswerIndex = question.options.findIndex(opt => opt.id === question.correct_option_id);
      const isCorrect = selectedAnswer === correctAnswerIndex;

      // Dim options slightly
      Animated.timing(optionsOpacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Show main feedback animation
      Animated.parallel([
        Animated.timing(feedbackOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(feedbackScale, {
          toValue: 1,
          tension: 80,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.spring(feedbackTranslateY, {
          toValue: 0,
          tension: 80,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();

      // Show celebration animation for correct answers
      if (isCorrect) {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(celebrationOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.spring(celebrationScale, {
              toValue: 1,
              tension: 100,
              friction: 8,
              useNativeDriver: true,
            }),
          ]).start();

          // Hide celebration after 2 seconds
          setTimeout(() => {
            Animated.parallel([
              Animated.timing(celebrationOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(celebrationScale, {
                toValue: 0.5,
                duration: 300,
                useNativeDriver: true,
              }),
            ]).start();
          }, 2000);
        }, 500);
      }

      // Hide main feedback after 3 seconds
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(feedbackOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(feedbackScale, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(feedbackTranslateY, {
            toValue: -50,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, 3000);
    } else {
      // Reset animations
      feedbackOpacity.setValue(0);
      feedbackScale.setValue(0.3);
      feedbackTranslateY.setValue(-50);
      optionsOpacity.setValue(1);
      celebrationOpacity.setValue(0);
      celebrationScale.setValue(0.5);
    }
  }, [isAnswerSubmitted, selectedAnswer]);

  const getRandomEmoji = (type: 'correct' | 'incorrect') => {
    const emojis = CELEBRATION_EMOJIS[type];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const correctAnswerIndex = question.options.findIndex(opt => opt.id === question.correct_option_id);
  const isCorrect = selectedAnswer !== null && selectedAnswer === correctAnswerIndex;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[Colors.dark.card, Colors.dark.background]}
        style={styles.questionContainer}
      >
        <Text style={styles.questionText}>{question.question_text}</Text>
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
            label={option.text}
            index={index}
            selected={selectedAnswer === index}
            onPress={() => onOptionPress(index)}
            disabled={isAnswerSubmitted}
            isCorrect={isAnswerSubmitted ? index === correctAnswerIndex : null}
            showResult={isAnswerSubmitted}
          />
        ))}
      </Animated.View>

      {/* Main Feedback Animation */}
      {Platform.OS !== 'web' && isAnswerSubmitted && selectedAnswer !== null && (
        <Animated.View
          style={[
            styles.feedbackContainer,
            {
              opacity: feedbackOpacity,
              transform: [
                { scale: feedbackScale },
                { translateY: feedbackTranslateY }
              ],
            },
          ]}
        >
          <LinearGradient
            colors={isCorrect ? 
              [Colors.dark.success, `${Colors.dark.success}90`] : 
              [Colors.dark.error, `${Colors.dark.error}90`]}
            style={styles.feedbackGradient}
          >
            <View style={styles.feedbackIcon}>
              {isCorrect ? 
                <CheckCircle size={28} color={Colors.dark.background} /> : 
                <XCircle size={28} color={Colors.dark.background} />
              }
            </View>
            <Text style={styles.feedbackEmoji}>{getRandomEmoji(isCorrect ? 'correct' : 'incorrect')}</Text>
            <Text style={styles.feedbackText}>
              {isCorrect ? 'Excellent!' : 'Not quite!'}
            </Text>
            <Text style={styles.feedbackSubtext}>
              {isCorrect ? 'You nailed it!' : 'Keep learning!'}
            </Text>
          </LinearGradient>
        </Animated.View>
      )}

      {/* Celebration Animation for Correct Answers */}
      {Platform.OS !== 'web' && isAnswerSubmitted && isCorrect && (
        <Animated.View
          style={[
            styles.celebrationContainer,
            {
              opacity: celebrationOpacity,
              transform: [{ scale: celebrationScale }],
            },
          ]}
        >
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <Text style={styles.celebrationText}>Amazing!</Text>
        </Animated.View>
      )}

      {/* Explanation Section - Now at the bottom */}
      {isAnswerSubmitted && question.explanation && (
        <View style={styles.explanationSection}>
          <View style={styles.explanationHeader}>
            <Lightbulb size={20} color={Colors.dark.primary} />
            <Text style={styles.explanationTitle}>💡 Explanation</Text>
          </View>
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
          
          {/* Additional learning tip */}
          <View style={styles.learningTip}>
            <Text style={styles.learningTipText}>
              💭 Remember this concept for future questions!
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
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
    elevation: 3,
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  questionText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.dark.text,
    lineHeight: 28,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  feedbackContainer: {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: [{ translateX: -120 }],
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    width: 240,
    zIndex: 1000,
  },
  feedbackGradient: {
    flex: 1,
    width: '100%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  feedbackIcon: {
    marginBottom: Spacing.sm,
  },
  feedbackEmoji: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  feedbackText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.background,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  feedbackSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.background,
    textAlign: 'center',
    opacity: 0.9,
  },
  celebrationContainer: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: [{ translateX: -60 }],
    alignItems: 'center',
    zIndex: 1001,
  },
  celebrationEmoji: {
    fontSize: 48,
    marginBottom: Spacing.xs,
  },
  celebrationText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.primary,
    textAlign: 'center',
  },
  explanationSection: {
    marginTop: Spacing.xl,
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  explanationTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginLeft: Spacing.sm,
  },
  explanationContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.dark.primary,
  },
  explanationText: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.text,
    lineHeight: 24,
  },
  learningTip: {
    backgroundColor: `${Colors.dark.primary}15`,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: `${Colors.dark.primary}30`,
  },
  learningTipText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
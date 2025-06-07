import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform, ScrollView } from 'react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Dimensions, Spacing } from '@/theme/spacing';
import OptionButton from '@/components/OptionButton';
import type { UsmleQuestion } from '@/lib/types/usmle';
import { LinearGradient } from 'expo-linear-gradient';
import { Lightbulb, CheckCircle, XCircle } from 'lucide-react-native';

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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const feedbackScale = useRef(new Animated.Value(0.3)).current;
  const feedbackTranslateY = useRef(new Animated.Value(-50)).current;
  const feedbackOpacity = useRef(new Animated.Value(0)).current;
  const celebrationOpacity = useRef(new Animated.Value(0)).current;
  const celebrationScale = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const explanationOpacity = useRef(new Animated.Value(0)).current;
  const explanationTranslateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Reset slide animation for new question
    slideAnim.setValue(Platform.OS !== 'web' ? 100 : 0);
    explanationOpacity.setValue(0);
    explanationTranslateY.setValue(30);
    fadeAnim.setValue(0);
    
    if (Platform.OS !== 'web') {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(1);
    }
  }, [question]);

  useEffect(() => {
    if (isAnswerSubmitted && selectedAnswer !== null) {
      const correctAnswerIndex = question.options.findIndex(opt => opt.id === question.correct_option_id);
      const isCorrect = selectedAnswer === correctAnswerIndex;

      // Show main feedback animation
      if (Platform.OS !== 'web') {
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

        // Show explanation after feedback
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(explanationOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.spring(explanationTranslateY, {
              toValue: 0,
              tension: 80,
              friction: 8,
              useNativeDriver: true,
            }),
          ]).start();
        }, 1000);

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
        feedbackOpacity.setValue(1);
        feedbackScale.setValue(1);
        feedbackTranslateY.setValue(0);
        explanationOpacity.setValue(1);
        explanationTranslateY.setValue(0);
        if (isCorrect) {
          celebrationOpacity.setValue(1);
          celebrationScale.setValue(1);
          setTimeout(() => {
            celebrationOpacity.setValue(0);
            celebrationScale.setValue(0.5);
          }, 2000);
        }
        setTimeout(() => {
          feedbackOpacity.setValue(0);
          feedbackScale.setValue(0.3);
          feedbackTranslateY.setValue(-50);
        }, 3000);
      }
    } else {
      // Reset animations
      feedbackOpacity.setValue(0);
      feedbackScale.setValue(0.3);
      feedbackTranslateY.setValue(-50);
      celebrationOpacity.setValue(0);
      celebrationScale.setValue(0.5);
      explanationOpacity.setValue(0);
      explanationTranslateY.setValue(30);
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
      <Animated.View
        style={[
          styles.contentWrapper,
          { 
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }] 
          },
        ]}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question_text}</Text>
        </View>
        
        <View style={styles.optionsContainer}>
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
        </View>

        {/* Main Feedback Animation */}
        {isAnswerSubmitted && selectedAnswer !== null && (
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
                  <CheckCircle size={Dimensions.icon.lg} color={Colors.dark.background} /> : 
                  <XCircle size={Dimensions.icon.lg} color={Colors.dark.background} />
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
        {isAnswerSubmitted && isCorrect && (
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

        {/* Explanation Section */}
        {isAnswerSubmitted && question.explanation && (
          <Animated.View 
            style={[
              styles.explanationSection,
              {
                opacity: explanationOpacity,
                transform: [{ translateY: explanationTranslateY }],
              },
            ]}
          >
            <View style={styles.explanationHeader}>
              <Lightbulb size={Dimensions.icon.sm} color={Colors.dark.primary} />
              <Text style={styles.explanationTitle}>Explanation</Text>
            </View>
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
            
            <View style={styles.learningTip}>
              <Text style={styles.learningTipText}>
                Remember this concept for future questions!
              </Text>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  contentWrapper: {
    flex: 1,
    padding: Spacing.xl,
  },
  questionContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    elevation: 2,
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionText: {
    ...Typography.styles.h4,
    color: Colors.dark.text,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.xl,
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
    borderRadius: Dimensions.borderRadius.xl,
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
    borderRadius: Dimensions.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  feedbackIcon: {
    marginBottom: Spacing.sm,
  },
  feedbackEmoji: {
    fontSize: Typography.fontSize['4xl'],
    marginBottom: Spacing.sm,
  },
  feedbackText: {
    ...Typography.styles.h4,
    color: Colors.dark.background,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  feedbackSubtext: {
    ...Typography.styles.bodySmall,
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
    fontSize: Typography.fontSize['5xl'],
    marginBottom: Spacing.xs,
  },
  celebrationText: {
    ...Typography.styles.h3,
    color: Colors.dark.primary,
    textAlign: 'center',
  },
  explanationSection: {
    marginTop: Spacing['3xl'],
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
    ...Typography.styles.h4,
    color: Colors.dark.text,
    marginLeft: Spacing.sm,
  },
  explanationContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.dark.primary,
  },
  explanationText: {
    ...Typography.styles.body,
    color: Colors.dark.text,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  learningTip: {
    backgroundColor: `${Colors.dark.primary}15`,
    borderRadius: Dimensions.borderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: `${Colors.dark.primary}30`,
  },
  learningTipText: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Spacing, Dimensions } from '@/theme/spacing';
import { ArrowLeft, Share2, Home, ChevronDown, ChevronUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ResultsSummary from '@/components/quiz/ResultsSummary';
import { useQuizStore } from '@/store/quiz/quizStore';

export default function QuizResults() {
  const router = useRouter();
  const { currentSession } = useQuizStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const celebrationScale = useRef(new Animated.Value(0.5)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const score = currentSession?.score || 0;
  const totalQuestions = currentSession?.total_questions || 1;
  const percentage = (score / totalQuestions) * 100;
  const isHighScore = percentage > 80;

  useEffect(() => {
    if (Platform.OS !== 'web') {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(celebrationScale, {
          toValue: 1,
          tension: 80,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();

      if (isHighScore) {
        // Confetti animation for high scores
        setTimeout(() => {
          Animated.timing(confettiAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }).start(() => {
            Animated.timing(confettiAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start();
          });
        }, 1000);
      }
    } else {
      fadeAnim.setValue(1);
      celebrationScale.setValue(1);
      if (isHighScore) {
        setTimeout(() => {
          confettiAnim.setValue(1);
          setTimeout(() => {
            confettiAnim.setValue(0);
          }, 2000);
        }, 1000);
      }
    }
  }, [fadeAnim, celebrationScale, confettiAnim, isHighScore]);

  const handleBackPress = () => {
    router.push('/(tabs)/quiz');
  };

  const handleShare = () => {
    // Placeholder for share functionality
    console.log("Share results");
  };

  const handleHomePress = () => {
    router.push('/(tabs)/index');
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Mock category data for performance breakdown
  const categories = [
    { 
      id: 'cat1', 
      name: 'Anatomy', 
      correct: Math.floor(score * 0.6), 
      total: Math.floor(totalQuestions * 0.5), 
      questions: Array.from({ length: Math.floor(totalQuestions * 0.5) }, (_, i) => ({
        id: `q${i + 1}`,
        text: `Question ${i + 1} about anatomy concepts`,
        correct: Math.random() > 0.4,
      }))
    },
    { 
      id: 'cat2', 
      name: 'Physiology', 
      correct: Math.floor(score * 0.4), 
      total: Math.floor(totalQuestions * 0.5), 
      questions: Array.from({ length: Math.floor(totalQuestions * 0.5) }, (_, i) => ({
        id: `q${i + Math.floor(totalQuestions * 0.5) + 1}`,
        text: `Question ${i + Math.floor(totalQuestions * 0.5) + 1} about physiology concepts`,
        correct: Math.random() > 0.4,
      }))
    },
  ];

  const getMotivationalMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a true expert! 🏆";
    if (percentage >= 80) return "Excellent work! You're mastering this! 🌟";
    if (percentage >= 70) return "Great job! You're on the right track! 👏";
    if (percentage >= 60) return "Good effort! Keep practicing! 📚";
    return "Don't give up! Every expert was once a beginner! 💪";
  };

  // Confetti particles for celebration
  const confettiParticles = Array.from({ length: 20 }, (_, i) => (
    <Animated.View
      key={i}
      style={[
        styles.confettiParticle,
        {
          left: `${Math.random() * 100}%`,
          opacity: confettiAnim,
          transform: [
            {
              translateY: confettiAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 600],
              }),
            },
            {
              rotate: confettiAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '720deg'],
              }),
            },
          ],
        },
      ]}
    />
  ));

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.background, `${Colors.dark.primary}15`]}
        style={styles.gradientBackground}
      >
        {/* Confetti Animation */}
        {isHighScore && (
          <View style={styles.confettiContainer}>
            {confettiParticles}
          </View>
        )}

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <ArrowLeft size={Dimensions.icon.md} color={Colors.dark.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Quiz Results</Text>
            <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
              <Share2 size={Dimensions.icon.md} color={Colors.dark.text} />
            </TouchableOpacity>
          </View>

          {isHighScore && (
            <Animated.View
              style={[
                styles.celebrationContainer,
                { transform: [{ scale: celebrationScale }] },
              ]}
            >
              <Text style={styles.celebrationEmoji}>🎉</Text>
              <Text style={styles.celebrationText}>Outstanding Performance!</Text>
            </Animated.View>
          )}

          <ResultsSummary
            score={score}
            totalQuestions={totalQuestions}
            percentage={percentage}
          />

          <View style={styles.messageContainer}>
            <Text style={styles.resultMessage}>
              {getMotivationalMessage()}
            </Text>
          </View>

          <View style={styles.breakdownContainer}>
            <Text style={styles.sectionTitle}>Performance Breakdown</Text>
            {categories.map(category => (
              <View key={category.id} style={styles.categoryContainer}>
                <TouchableOpacity
                  style={styles.categoryHeader}
                  onPress={() => toggleCategoryExpansion(category.id)}
                >
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryScore}>
                      {category.correct} / {category.total} Correct ({Math.round((category.correct / category.total) * 100)}%)
                    </Text>
                  </View>
                  <View style={styles.expandIcon}>
                    {expandedCategory === category.id ? (
                      <ChevronUp size={Dimensions.icon.sm} color={Colors.dark.textSecondary} />
                    ) : (
                      <ChevronDown size={Dimensions.icon.sm} color={Colors.dark.textSecondary} />
                    )}
                  </View>
                </TouchableOpacity>
                
                {expandedCategory === category.id && (
                  <Animated.View style={styles.questionList}>
                    {category.questions.map((question, index) => (
                      <View key={question.id} style={styles.questionItem}>
                        <Text style={styles.questionNumber}>Q{index + 1}</Text>
                        <Text style={styles.questionText} numberOfLines={2}>
                          {question.text}
                        </Text>
                        <View style={[
                          styles.resultBadge,
                          question.correct ? styles.correctBadge : styles.incorrectBadge
                        ]}>
                          <Text style={[
                            styles.resultText,
                            question.correct ? styles.correctText : styles.incorrectText
                          ]}>
                            {question.correct ? '✓' : '✗'}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </Animated.View>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleHomePress}
          >
            <Home size={Dimensions.icon.sm} color={Colors.dark.background} />
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  gradientBackground: {
    flex: 1,
    padding: Spacing.xl,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: 'none',
  },
  confettiParticle: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: Colors.dark.primary,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.xl,
  },
  backButton: {
    padding: Spacing.sm,
    borderRadius: Dimensions.borderRadius.full,
    backgroundColor: Colors.dark.card,
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.dark.text,
    textAlign: 'center',
  },
  shareButton: {
    padding: Spacing.sm,
    borderRadius: Dimensions.borderRadius.full,
    backgroundColor: Colors.dark.card,
  },
  celebrationContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  celebrationEmoji: {
    fontSize: Typography.fontSize['6xl'],
    marginBottom: Spacing.sm,
  },
  celebrationText: {
    ...Typography.styles.h3,
    color: Colors.dark.primary,
    textAlign: 'center',
  },
  messageContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing['2xl'],
    width: '100%',
  },
  resultMessage: {
    ...Typography.styles.bodyLarge,
    color: Colors.dark.text,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
  },
  breakdownContainer: {
    width: '100%',
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    ...Typography.styles.h4,
    color: Colors.dark.text,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    paddingBottom: Spacing.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    ...Typography.styles.body,
    color: Colors.dark.text,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 2,
  },
  categoryScore: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.textSecondary,
  },
  expandIcon: {
    padding: Spacing.xs,
  },
  questionList: {
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    borderRadius: Dimensions.borderRadius.sm,
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  questionNumber: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.textSecondary,
    fontWeight: Typography.fontWeight.bold,
    minWidth: 24,
  },
  questionText: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.text,
    flex: 1,
  },
  resultBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctBadge: {
    backgroundColor: Colors.dark.success,
  },
  incorrectBadge: {
    backgroundColor: Colors.dark.error,
  },
  resultText: {
    fontSize: 12,
    fontWeight: Typography.fontWeight.bold,
  },
  correctText: {
    color: Colors.dark.background,
  },
  incorrectText: {
    color: Colors.dark.background,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Dimensions.borderRadius.md,
    marginTop: Spacing.xl,
    width: '100%',
  },
  homeButtonText: {
    ...Typography.styles.button,
    color: Colors.dark.background,
    marginLeft: Spacing.sm,
  },
});
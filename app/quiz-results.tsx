import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Spacing, Dimensions } from '@/theme/spacing';
import { ArrowLeft, Share2, Home } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ResultsSummary from '@/components/quiz/ResultsSummary';
import { useQuizStore } from '@/store/quiz/quizStore';

export default function QuizResults() {
  const router = useRouter();
  const { currentSession } = useQuizStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const celebrationScale = useRef(new Animated.Value(0.5)).current;
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
        setTimeout(() => {
          Animated.timing(celebrationScale, {
            toValue: 0.5,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 2000);
      }
    } else {
      fadeAnim.setValue(1);
      celebrationScale.setValue(1);
      if (isHighScore) {
        setTimeout(() => {
          celebrationScale.setValue(0.5);
        }, 2000);
      }
    }
  }, [fadeAnim, celebrationScale, isHighScore]);

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
    { id: 'cat1', name: 'Anatomy', correct: 3, total: 5, questions: [
      { id: 'q1', text: 'Question 1 text', correct: true },
      { id: 'q2', text: 'Question 2 text', correct: false },
      { id: 'q3', text: 'Question 3 text', correct: true },
      { id: 'q4', text: 'Question 4 text', correct: false },
      { id: 'q5', text: 'Question 5 text', correct: true },
    ]},
    { id: 'cat2', name: 'Physiology', correct: 2, total: 4, questions: [
      { id: 'q6', text: 'Question 6 text', correct: true },
      { id: 'q7', text: 'Question 7 text', correct: false },
      { id: 'q8', text: 'Question 8 text', correct: true },
      { id: 'q9', text: 'Question 9 text', correct: false },
    ]},
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.background, `${Colors.dark.primary}15`]}
        style={styles.gradientBackground}
      >
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

          <Text style={styles.resultMessage}>
            {percentage > 80 ? "Excellent work! You're mastering this!" : 
             percentage > 50 ? "Good job! Keep learning and improving!" : 
             "Don't give up! Review and try again!"}
          </Text>

          <View style={styles.breakdownContainer}>
            <Text style={styles.sectionTitle}>Performance Breakdown</Text>
            {categories.map(category => (
              <View key={category.id} style={styles.categoryContainer}>
                <TouchableOpacity
                  style={styles.categoryHeader}
                  onPress={() => toggleCategoryExpansion(category.id)}
                >
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryScore}>
                    {category.correct} / {category.total} Correct
                  </Text>
                </TouchableOpacity>
                {expandedCategory === category.id && (
                  <View style={styles.questionList}>
                    {category.questions.map(question => (
                      <View key={question.id} style={styles.questionItem}>
                        <Text style={styles.questionText}>{question.text}</Text>
                        <Text style={question.correct ? styles.correctText : styles.incorrectText}>
                          {question.correct ? 'Correct' : 'Incorrect'}
                        </Text>
                      </View>
                    ))}
                  </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
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
    fontSize: Typography.fontSize['5xl'],
    marginBottom: Spacing.sm,
  },
  celebrationText: {
    ...Typography.styles.h3,
    color: Colors.dark.primary,
    textAlign: 'center',
  },
  resultMessage: {
    ...Typography.styles.bodyLarge,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.lg,
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
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  categoryName: {
    ...Typography.styles.body,
    color: Colors.dark.text,
    fontWeight: Typography.fontWeight.semibold,
  },
  categoryScore: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.textSecondary,
  },
  questionList: {
    paddingBottom: Spacing.md,
  },
  questionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: `${Colors.dark.border}50`,
  },
  questionText: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  correctText: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.success,
    fontWeight: Typography.fontWeight.semibold,
  },
  incorrectText: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.error,
    fontWeight: Typography.fontWeight.semibold,
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
  },
  homeButtonText: {
    ...Typography.styles.button,
    color: Colors.dark.background,
    marginLeft: Spacing.sm,
  },
});
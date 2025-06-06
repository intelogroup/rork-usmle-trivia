import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';
import { useQuizStore } from '@/store/quiz/quizStore';
import { useRouter } from 'expo-router';
import CategoryList from '@/components/quiz/CategoryList';
import FullScreenLoader from '@/components/FullScreenLoader';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen } from 'lucide-react-native';

export default function QuizScreen() {
  const router = useRouter();
  const { 
    categoriesWithCounts,
    isLoadingCategories,
    categoriesError,
    loadCategoriesWithQuestionCount
  } = useQuizStore();

  useEffect(() => {
    loadCategoriesWithQuestionCount();
  }, [loadCategoriesWithQuestionCount]);

  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: '/quiz-setup',
      params: { categoryId }
    });
  };

  if (isLoadingCategories) {
    return <FullScreenLoader message="Loading categories..." />;
  }

  if (categoriesError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load categories</Text>
        <Text style={styles.errorSubtext}>{categoriesError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.background, `${Colors.dark.primary}10`]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <BookOpen size={32} color={Colors.dark.primary} />
          </View>
          <Text style={styles.title}>Choose a Category</Text>
          <Text style={styles.subtitle}>
            Select a topic to start your quiz
          </Text>
        </View>

        <CategoryList
          categories={categoriesWithCounts}
          onCategoryPress={handleCategoryPress}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.dark.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    padding: Spacing.xl,
  },
  errorText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
});
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
import { BookOpen, Sparkles, Target } from 'lucide-react-native';

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
    return <FullScreenLoader message="Loading categories... ✨" />;
  }

  if (categoriesError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load categories 😔</Text>
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
            <Target size={32} color={Colors.dark.primary} />
          </View>
          <Text style={styles.title}>Choose Your Challenge 🎯</Text>
          <Text style={styles.subtitle}>
            Pick a topic and test your knowledge! 🧠✨
          </Text>
          <View style={styles.motivationBadge}>
            <Sparkles size={16} color={Colors.dark.primary} />
            <Text style={styles.motivationText}>Ready to level up? 🚀</Text>
          </View>
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
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${Colors.dark.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: `${Colors.dark.primary}30`,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 24,
  },
  motivationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.dark.primary}15`,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${Colors.dark.primary}30`,
  },
  motivationText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.primary,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.xs,
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
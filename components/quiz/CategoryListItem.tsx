import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, BookOpen, Zap, Star } from 'lucide-react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';
import type { CategoryWithCount } from '@/store/quiz/quizStore';

interface CategoryListItemProps {
  category: CategoryWithCount;
  onPress: (categoryId: string) => void;
}

export default function CategoryListItem({ category, onPress }: CategoryListItemProps) {
  const getQuestionCountEmoji = () => {
    if (category.questionCount >= 100) return '🔥';
    if (category.questionCount >= 50) return '⚡';
    if (category.questionCount >= 20) return '✨';
    return '📝';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(category.id)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
          <BookOpen size={24} color={Colors.dark.background} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <View style={styles.questionBadge}>
            <Text style={styles.questionCount}>
              {category.questionCount} Questions {getQuestionCountEmoji()}
            </Text>
          </View>
          <Text style={styles.challengeText}>Ready for the challenge? 🎯</Text>
        </View>
        
        <View style={styles.actionContainer}>
          <View style={styles.difficultyIndicator}>
            <Star size={12} color={Colors.dark.primary} fill={Colors.dark.primary} />
            <Star size={12} color={Colors.dark.primary} fill={Colors.dark.primary} />
            <Star size={12} color={Colors.dark.primary} fill={Colors.dark.primary} />
          </View>
          <ChevronRight size={20} color={Colors.dark.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    elevation: 2,
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    elevation: 2,
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  questionBadge: {
    backgroundColor: `${Colors.dark.primary}20`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: Spacing.xs,
  },
  questionCount: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.primary,
    fontWeight: Typography.fontWeight.bold,
  },
  challengeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.dark.textSecondary,
    fontStyle: 'italic',
  },
  actionContainer: {
    alignItems: 'center',
  },
  difficultyIndicator: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
    gap: 2,
  },
});
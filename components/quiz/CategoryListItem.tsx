import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, BookOpen } from 'lucide-react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';
import type { CategoryWithCount } from '@/store/quiz/quizStore';

interface CategoryListItemProps {
  category: CategoryWithCount;
  onPress: (categoryId: string) => void;
}

export default function CategoryListItem({ category, onPress }: CategoryListItemProps) {
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
              {category.questionCount} Questions 📝
            </Text>
          </View>
        </View>
        
        <ChevronRight size={20} color={Colors.dark.textSecondary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  iconText: {
    color: Colors.dark.background,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  questionBadge: {
    backgroundColor: `${Colors.dark.primary}20`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  questionCount: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.primary,
    fontWeight: Typography.fontWeight.medium,
  },
});
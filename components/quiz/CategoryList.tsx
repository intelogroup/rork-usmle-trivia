import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import CategoryListItem from './CategoryListItem';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';
import type { CategoryWithCount } from '@/store/quiz/quizStore';

interface CategoryListProps {
  categories: CategoryWithCount[];
  onCategoryPress: (categoryId: string) => void;
}

export default function CategoryList({ categories, onCategoryPress }: CategoryListProps) {
  // Group categories by their grouping
  const groupedCategories = categories.reduce((acc, category) => {
    const group = category.grouping || 'Other';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(category);
    return acc;
  }, {} as Record<string, CategoryWithCount[]>);

  const renderGroupSection = (groupName: string, groupCategories: CategoryWithCount[]) => (
    <View key={groupName} style={styles.groupSection}>
      <Text style={styles.groupHeader}>{groupName}</Text>
      {groupCategories.map((category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          onPress={onCategoryPress}
        />
      ))}
    </View>
  );

  if (categories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No categories available</Text>
        <Text style={styles.emptySubtext}>Please check back later</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={Object.entries(groupedCategories)}
      renderItem={({ item: [groupName, groupCategories] }) => 
        renderGroupSection(groupName, groupCategories)
      }
      keyExtractor={([groupName]) => groupName}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  groupSection: {
    marginBottom: Spacing['2xl'],
  },
  groupHeader: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: Spacing.lg,
    paddingLeft: Spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['2xl'],
  },
  emptyText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
});
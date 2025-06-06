import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '@/theme/colors';
import { Folder, Check } from 'lucide-react-native';

interface Category {
  id: string;
  name: string;
  description?: string;
  questionCount: number;
  icon?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

interface CategorySelectionProps {
  categories: Category[];
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
  isLoading: boolean;
}

export default function CategorySelection({
  categories,
  selectedCategories,
  onToggleCategory,
  isLoading,
}: CategorySelectionProps) {
  // Ensure categories is always an array
  const validCategories = Array.isArray(categories) ? categories : [];
  const validSelectedCategories = Array.isArray(selectedCategories) ? selectedCategories : [];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Folder size={20} color={Colors.dark.text} />
          <Text style={styles.title}>Select Categories</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      </View>
    );
  }

  if (validCategories.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Folder size={20} color={Colors.dark.text} />
          <Text style={styles.title}>Select Categories</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No categories available</Text>
          <Text style={styles.loadingSubtext}>Please check your connection and try again</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Folder size={20} color={Colors.dark.text} />
        <Text style={styles.title}>Select Categories</Text>
        <Text style={styles.subtitle}>
          {validSelectedCategories.length === 0 ? 'All categories' : `${validSelectedCategories.length} selected`}
        </Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {validCategories.map((category) => {
          const isSelected = validSelectedCategories.includes(category.id);
          const questionCount = category.questionCount || 0;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                isSelected ? styles.selectedCategoryCard : null
              ]}
              onPress={() => onToggleCategory(category.id)}
            >
              <View style={styles.categoryHeader}>
                <Text style={[
                  styles.categoryName,
                  isSelected ? styles.selectedCategoryName : null
                ]}>
                  {category.name}
                </Text>
                {isSelected && (
                  <Check size={16} color={Colors.dark.text} />
                )}
              </View>
              
              {category.description && (
                <Text style={styles.categoryDescription}>
                  {category.description}
                </Text>
              )}
              
              <Text style={styles.questionCount}>
                {questionCount} {questionCount === 1 ? 'question' : 'questions'}
              </Text>
              
              {questionCount === 0 && (
                <Text style={styles.noQuestionsWarning}>
                  No questions available
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginLeft: 8,
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  loadingContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
  },
  loadingText: {
    color: Colors.dark.textSecondary,
    fontSize: 16,
    marginBottom: 4,
  },
  loadingSubtext: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
    opacity: 0.7,
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  categoryCard: {
    width: 160,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: Colors.dark.border,
  },
  selectedCategoryCard: {
    borderColor: Colors.dark.primary,
    backgroundColor: `${Colors.dark.primary}10`,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    flex: 1,
  },
  selectedCategoryName: {
    color: Colors.dark.text,
  },
  categoryDescription: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    marginBottom: 8,
    lineHeight: 16,
  },
  questionCount: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    fontWeight: '500',
  },
  noQuestionsWarning: {
    fontSize: 11,
    color: Colors.dark.error || '#ff6b6b',
    fontWeight: '500',
    marginTop: 4,
  },
});
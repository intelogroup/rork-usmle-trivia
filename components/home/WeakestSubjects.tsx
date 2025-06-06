import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/theme/colors';
import { AlertTriangle } from 'lucide-react-native';

interface WeakestCategory {
  id: string;
  name: string;
  accuracy: number;
  totalQuizzes: number;
}

interface WeakestSubjectsProps {
  weakestCategories: WeakestCategory[];
}

export default function WeakestSubjects({ weakestCategories }: WeakestSubjectsProps) {
  const handlePractice = (categoryId: string) => {
    try {
      router.push({
        pathname: '/(tabs)/quiz',
        params: { selectedCategory: categoryId },
      });
    } catch (error) {
      console.error('Navigation error for category practice (silently bypassed):', error);
    }
  };

  if (!weakestCategories || weakestCategories.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Weakest Subjects</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Not enough data yet. Take more quizzes to identify weak areas.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weakest Subjects</Text>
      <View style={styles.card}>
        <View style={styles.header}>
          <AlertTriangle size={18} color={Colors.dark.warning} style={styles.headerIcon} />
          <Text style={styles.subtitle}>Focus on these areas to improve</Text>
        </View>
        
        {weakestCategories.slice(0, 3).map((category, index) => (
          <View key={category.id} style={[styles.categoryItem, index === weakestCategories.length - 1 || index === 2 ? { borderBottomWidth: 0 } : {}]}>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryAccuracy}>{category.accuracy}% Accuracy • {category.totalQuizzes} Quiz{category.totalQuizzes !== 1 ? 'zes' : ''}</Text>
            </View>
            <TouchableOpacity 
              style={styles.practiceButton} 
              onPress={() => handlePractice(category.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.practiceButtonText}>Practice</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    marginRight: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  categoryAccuracy: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  practiceButton: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  practiceButtonText: {
    color: Colors.dark.background,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    minHeight: 100,
  },
  emptyText: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
});
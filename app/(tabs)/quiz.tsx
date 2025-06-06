import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/theme/colors';
import { useQuizStore } from '@/store/quiz/quizStore';
import { useAuthStore } from '@/store/auth/authStore';
import HierarchicalCategorySelector from '@/components/quiz/HierarchicalCategorySelector';
import QuizSettings from '@/components/quiz/QuizSettings';
import AuthPrompt from '@/components/quiz/AuthPrompt';
import QuizStartButton from '@/components/quiz/QuizStartButton';
import type { QuizMode } from '@/lib/types/quiz';
import { AlertTriangle, Brain } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function QuizScreen() {
  const router = useRouter();
  const { 
    categories, 
    isLoadingCategories, 
    loadCategories,
    checkQuestionAvailability,
    availableQuestionCount,
    isCheckingAvailability
  } = useQuizStore();
  const { isAuthenticated } = useAuthStore();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [quizMode, setQuizMode] = useState<QuizMode>('standard');
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [validationError, setValidationError] = useState<string | null>(null);
  
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    const checkAvailability = async () => {
      if (selectedCategories.length > 0) {
        const count = await checkQuestionAvailability(
          selectedCategories, 
          difficulty === 'all' ? undefined : difficulty
        );
        
        if (count === 0) {
          setValidationError('No questions available for the selected criteria. Please adjust your selections.');
        } else if (count < questionCount) {
          setValidationError(`Only ${count} questions available. Please reduce the number of questions or select more categories.`);
        } else {
          setValidationError(null);
        }
      } else {
        setValidationError(null);
      }
    };

    const timeoutId = setTimeout(checkAvailability, 300);
    return () => clearTimeout(timeoutId);
  }, [selectedCategories, difficulty, questionCount, checkQuestionAvailability]);
  
  const toggleCategory = (categoryId: string) => {
    const validSelectedCategories = Array.isArray(selectedCategories) ? selectedCategories : [];
    
    if (validSelectedCategories.includes(categoryId)) {
      setSelectedCategories(validSelectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...validSelectedCategories, categoryId]);
    }
  };
  
  const startQuiz = () => {
    setValidationError(null);
    
    const validQuestionCount = Number(questionCount) || 10;
    const finalQuestionCount = Math.max(1, Math.min(50, validQuestionCount));
    
    let categoriesToUse = Array.isArray(selectedCategories) ? selectedCategories : [];
    const validCategories = Array.isArray(categories) ? categories : [];
    
    if (categoriesToUse.length === 0 && validCategories.length > 0) {
      categoriesToUse = [validCategories[0].id];
      setSelectedCategories(categoriesToUse);
    }

    if (categoriesToUse.length === 0) {
      setValidationError('Please select at least one category to start the quiz.');
      return;
    }

    if (availableQuestionCount > 0 && availableQuestionCount < finalQuestionCount) {
      setValidationError(`Only ${availableQuestionCount} questions available. Please reduce the number of questions.`);
      return;
    }
    
    router.push({
      pathname: '/quiz-session',
      params: { 
        categories: categoriesToUse.join(','),
        count: finalQuestionCount.toString(),
        mode: quizMode,
        difficulty: difficulty === 'all' ? undefined : difficulty
      }
    });
  };
  
  const validCategories = Array.isArray(categories) ? categories : [];
  const validSelectedCategories = Array.isArray(selectedCategories) ? selectedCategories : [];
  
  const isStartDisabled = isLoadingCategories || 
                         isCheckingAvailability || 
                         validationError !== null ||
                         (validSelectedCategories.length === 0 && validCategories.length === 0);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.background, `${Colors.dark.primary}10`]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Brain size={32} color={Colors.dark.primary} />
            </View>
            <Text style={styles.title}>Start a Quiz</Text>
            <Text style={styles.subtitle}>
              Customize your quiz experience
            </Text>
          </View>

          <AuthPrompt isAuthenticated={isAuthenticated} />
          
          <HierarchicalCategorySelector
            categories={validCategories}
            selectedCategories={validSelectedCategories}
            onToggleCategory={toggleCategory}
            isLoading={isLoadingCategories}
          />
          
          <QuizSettings
            questionCount={questionCount}
            onQuestionCountChange={setQuestionCount}
            quizMode={quizMode}
            onQuizModeChange={setQuizMode}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
          />

          {validSelectedCategories.length > 0 && !isCheckingAvailability && availableQuestionCount > 0 && (
            <View style={styles.availabilityInfo}>
              <Text style={styles.availabilityText}>
                {availableQuestionCount} questions available
              </Text>
            </View>
          )}

          {validationError && (
            <View style={styles.errorContainer}>
              <AlertTriangle size={16} color={Colors.dark.error} />
              <Text style={styles.errorText}>{validationError}</Text>
            </View>
          )}
        </ScrollView>
        
        <QuizStartButton
          onPress={startQuiz}
          disabled={isStartDisabled}
          selectedCategoriesCount={validSelectedCategories.length}
          questionCount={questionCount}
          availableQuestionCount={availableQuestionCount}
          isCheckingAvailability={isCheckingAvailability}
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
  contentContainer: {
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.dark.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  availabilityInfo: {
    backgroundColor: `${Colors.dark.primary}15`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.primary,
  },
  availabilityText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: `${Colors.dark.error}15`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.error,
  },
  errorText: {
    color: Colors.dark.error,
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});
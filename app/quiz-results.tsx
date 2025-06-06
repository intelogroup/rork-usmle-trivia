import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/theme/colors';
import Button from '@/components/Button';
import { Award, Home, RotateCcw, Share2, Clock, BarChart2 } from 'lucide-react-native';
import { achievements } from '@/mocks/achievements';
import AchievementCard from '@/components/AchievementCard';
import { useQuizStore } from '@/store/quiz/quizStore';
import ProgressBar from '@/components/ProgressBar';
import type { Question } from '@/lib/types/quiz';
import { useAuthStore } from '@/store/auth/authStore';
import { categories } from '@/mocks/categories';

export default function QuizResultsScreen() {
  const router = useRouter();
  const { currentSession, resetQuiz } = useQuizStore();
  const { isAuthenticated } = useAuthStore();
  
  const [categoryPerformance, setCategoryPerformance] = useState<{
    categoryId: string;
    categoryName: string;
    correct: number;
    total: number;
    percentage: number;
  }[]>([]);
  
  useEffect(() => {
    if (!currentSession || !currentSession.questions || !currentSession.answers) return;
    
    // Calculate performance by category
    const categoryMap = new Map<string, { name: string, correct: number, total: number }>();
    
    currentSession.questions.forEach((question: Question, index: number) => {
      const categoryId = question.category_id || question.category;
      const categoryName = getCategoryName(categoryId);
      const userAnswer = currentSession.answers[index];
      const correctAnswer = question.correct_answer !== undefined ? question.correct_answer : question.correct;
      const isCorrect = userAnswer === correctAnswer;
      
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, { name: categoryName, correct: 0, total: 0 });
      }
      
      const category = categoryMap.get(categoryId)!;
      category.total += 1;
      if (isCorrect) {
        category.correct += 1;
      }
    });
    
    const performance = Array.from(categoryMap.entries()).map(([id, data]) => ({
      categoryId: id,
      categoryName: data.name,
      correct: data.correct,
      total: data.total,
      percentage: Math.round((data.correct / data.total) * 100)
    }));
    
    setCategoryPerformance(performance);
  }, [currentSession]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || `Category ${categoryId}`;
  };

  if (!currentSession || !currentSession.isCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Quiz Results',
            headerBackVisible: false,
            headerTintColor: Colors.dark.text,
            headerStyle: {
              backgroundColor: Colors.dark.background,
            },
          }} 
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No Results Available</Text>
          <Text style={styles.errorSubtext}>Complete a quiz to see your results</Text>
          <Button
            title="Start a Quiz"
            onPress={() => router.push('/(tabs)/quiz')}
            style={styles.loginButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const score = currentSession.score;
  const total = currentSession.questions.length;
  const percentage = Math.round((score / total) * 100);
  const mode = currentSession.mode || 'standard';
  
  // Mock achievement unlocked
  const unlockedAchievement = percentage >= 80 ? achievements[1] : null;
  
  const getResultMessage = () => {
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 70) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };
  
  const getResultDescription = () => {
    if (percentage >= 90) return "You're mastering the material!";
    if (percentage >= 70) return "You're making great progress.";
    if (percentage >= 50) return "You're building a solid foundation.";
    return "Don't worry, knowledge takes time to master.";
  };
  
  const handleRetakeQuiz = () => {
    resetQuiz();
    router.push('/(tabs)/quiz');
  };
  
  const handleGoHome = () => {
    resetQuiz();
    router.push('/(tabs)');
  };
  
  const handleShare = () => {
    // This would be implemented with the Share API in a real app
    console.log('Sharing quiz results');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Quiz Results',
          headerBackVisible: false,
          headerTintColor: Colors.dark.text,
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.resultContainer}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{percentage}%</Text>
            <Text style={styles.scoreDetail}>
              {score}/{total} correct
            </Text>
          </View>
          
          <Text style={styles.resultMessage}>{getResultMessage()}</Text>
          <Text style={styles.resultDescription}>{getResultDescription()}</Text>
          
          {mode === 'timed' && (
            <View style={styles.modeInfoContainer}>
              <Clock size={16} color={Colors.dark.textSecondary} />
              <Text style={styles.modeInfoText}>Timed Quiz</Text>
            </View>
          )}
        </View>
        
        {categoryPerformance.length > 0 && (
          <View style={styles.performanceContainer}>
            <View style={styles.sectionHeader}>
              <BarChart2 size={20} color={Colors.dark.text} />
              <Text style={styles.sectionTitle}>Performance by Category</Text>
            </View>
            
            {categoryPerformance.map((category) => (
              <View key={category.categoryId} style={styles.categoryPerformance}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{category.categoryName}</Text>
                  <Text style={styles.categoryScore}>
                    {category.correct}/{category.total}
                  </Text>
                </View>
                <ProgressBar 
                  progress={category.percentage / 100}
                  height={6}
                  fillColor={
                    category.percentage >= 80 ? Colors.dark.success :
                    category.percentage >= 60 ? Colors.dark.primary :
                    Colors.dark.error
                  }
                />
              </View>
            ))}
          </View>
        )}
        
        {unlockedAchievement && (
          <View style={styles.achievementContainer}>
            <View style={styles.sectionHeader}>
              <Award size={20} color={Colors.dark.text} />
              <Text style={styles.sectionTitle}>Achievement Unlocked!</Text>
            </View>
            <AchievementCard 
              achievement={{
                ...unlockedAchievement,
                unlocked: true
              }} 
            />
          </View>
        )}
        
        {!isAuthenticated && (
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>
              Log in to track your progress and earn achievements!
            </Text>
            <Button
              title="Log In"
              onPress={() => router.push('/login')}
              style={styles.loginPromptButton}
            />
          </View>
        )}
        
        <View style={styles.actionButtons}>
          <Button
            title="Share Results"
            onPress={handleShare}
            variant="outline"
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Retake Quiz"
          onPress={handleRetakeQuiz}
          variant="outline"
          style={styles.footerButton}
        />
        <Button
          title="Go to Home"
          onPress={handleGoHome}
          style={styles.footerButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Extra space for footer
  },
  resultContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    color: Colors.dark.background,
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreDetail: {
    color: Colors.dark.background,
    fontSize: 14,
    opacity: 0.8,
  },
  resultMessage: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultDescription: {
    color: Colors.dark.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  modeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
  },
  modeInfoText: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    marginLeft: 6,
  },
  performanceContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  categoryPerformance: {
    marginBottom: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
  },
  categoryScore: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
  },
  achievementContainer: {
    marginBottom: 24,
  },
  actionButtons: {
    marginBottom: 16,
  },
  actionButton: {
    marginBottom: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: Colors.dark.background,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: Colors.dark.text,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
    width: 200,
  },
  loginPrompt: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    alignItems: 'center',
  },
  loginPromptText: {
    color: Colors.dark.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  loginPromptButton: {
    width: 200,
  },
});
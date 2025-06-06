import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Animated, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/theme/colors';
import Button from '@/components/Button';
import { Award, Home, RotateCcw, Share2, Clock, Target } from 'lucide-react-native';
import { achievements } from '@/mocks/achievements';
import AchievementCard from '@/components/AchievementCard';
import { useQuizStore } from '@/store/quiz/quizStore';
import ProgressBar from '@/components/ProgressBar';
import type { Question } from '@/lib/types/quiz';
import { useAuthStore } from '@/store/auth/authStore';
import { LinearGradient } from 'expo-linear-gradient';
import { UsmleQuestion } from '@/lib/types/usmle';

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

  // Animation values
  const scoreScale = useRef(new Animated.Value(0.5)).current;
  const scoreOpacity = useRef(new Animated.Value(0)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (!currentSession || !currentSession.questions || !currentSession.answers) return;
    
    // Calculate performance by category
    const categoryMap = new Map<string, { name: string, correct: number, total: number }>();
    
    currentSession.questions.forEach((question: UsmleQuestion, index: number) => {
      const categoryId = question.category_id;
      const categoryName = getCategoryName(categoryId);
      const userAnswerIndex = currentSession.answers[index];
      const isCorrect = userAnswerIndex !== -1 && 
        question.options[userAnswerIndex]?.id === question.correct_option_id;
      
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

    // Animate score reveal
    if (Platform.OS !== 'web') {
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scoreScale, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.timing(scoreOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(detailsOpacity, {
          toValue: 1,
          duration: 500,
          delay: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Instant animation for web
      scoreScale.setValue(1);
      scoreOpacity.setValue(1);
      detailsOpacity.setValue(1);
    }
  }, [currentSession]);

  const getCategoryName = (categoryId: string) => {
    const { categories } = useQuizStore.getState();
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
        <LinearGradient
          colors={[Colors.dark.background, `${Colors.dark.primary}10`]}
          style={styles.gradient}
        >
          <View style={styles.errorContainer}>
            <Brain size={48} color={Colors.dark.textSecondary} />
            <Text style={styles.errorText}>No Results Available</Text>
            <Text style={styles.errorSubtext}>Complete a quiz to see your results</Text>
            <Button
              title="Start a Quiz"
              onPress={() => router.push('/(tabs)/quiz')}
              style={styles.loginButton}
            />
          </View>
        </LinearGradient>
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
      
      <LinearGradient
        colors={[Colors.dark.background, `${Colors.dark.primary}10`]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View 
            style={[
              styles.resultContainer,
              {
                opacity: scoreOpacity,
                transform: [{ scale: scoreScale }],
              },
            ]}
          >
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
          </Animated.View>
          
          <Animated.View style={{ opacity: detailsOpacity }}>
            {categoryPerformance.length > 0 && (
              <View style={styles.performanceContainer}>
                <View style={styles.sectionHeader}>
                  <Target size={20} color={Colors.dark.text} />
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
                icon={<Share2 size={16} color={Colors.dark.text} />}
              />
            </View>
          </Animated.View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title="Retake Quiz"
            onPress={handleRetakeQuiz}
            variant="outline"
            style={styles.footerButton}
            icon={<RotateCcw size={16} color={Colors.dark.text} />}
          />
          <Button
            title="Go to Home"
            onPress={handleGoHome}
            style={styles.footerButton}
            icon={<Home size={16} color={Colors.dark.text} />}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  resultContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    elevation: 2,
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: Colors.dark.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
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
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
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
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
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
    borderRadius: 16,
    padding: 20,
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
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Animated, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/theme/colors';
import Button from '@/components/Button';
import { Award, Home, RotateCcw, Share2, Clock, Target, AlertCircle, Trophy, Star, Zap, Crown } from 'lucide-react-native';
import { achievements } from '@/mocks/achievements';
import AchievementCard from '@/components/AchievementCard';
import { useQuizStore } from '@/store/quiz/quizStore';
import ProgressBar from '@/components/ProgressBar';
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
  const scoreScale = useRef(new Animated.Value(0.3)).current;
  const scoreOpacity = useRef(new Animated.Value(0)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;
  const celebrationScale = useRef(new Animated.Value(0)).current;
  const celebrationOpacity = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (!currentSession || !currentSession.questions || !currentSession.answers) return;
    
    // Calculate performance by category
    const categoryMap = new Map<string, { name: string, correct: number, total: number }>();
    
    currentSession.questions.forEach((question: UsmleQuestion, index: number) => {
      const categoryId = question.category_id;
      const categoryName = getCategoryName(categoryId);
      const userAnswerIndex = currentSession.answers[index];
      const isCorrect = userAnswerIndex !== -1 && 
        userAnswerIndex >= 0 &&
        userAnswerIndex < question.options.length &&
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

    const score = currentSession.score;
    const total = currentSession.questions.length;
    const percentage = Math.round((score / total) * 100);

    // Animate score reveal with enhanced animations
    if (Platform.OS !== 'web') {
      Animated.sequence([
        // Initial score animation
        Animated.parallel([
          Animated.spring(scoreScale, {
            toValue: 1.1,
            tension: 60,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(scoreOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        // Settle to normal size
        Animated.spring(scoreScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // Show celebration for high scores
      if (percentage >= 80) {
        setTimeout(() => {
          Animated.parallel([
            Animated.spring(celebrationScale, {
              toValue: 1,
              tension: 80,
              friction: 6,
              useNativeDriver: true,
            }),
            Animated.timing(celebrationOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            // Confetti animation
            Animated.timing(confettiAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]).start();
        }, 800);
      }

      // Show details after score animation
      setTimeout(() => {
        Animated.timing(detailsOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 1000);
    } else {
      // Instant animation for web
      scoreScale.setValue(1);
      scoreOpacity.setValue(1);
      detailsOpacity.setValue(1);
      if (percentage >= 80) {
        celebrationScale.setValue(1);
        celebrationOpacity.setValue(1);
        confettiAnim.setValue(1);
      }
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
            <AlertCircle size={48} color={Colors.dark.textSecondary} />
            <Text style={styles.errorText}>No Results Available 📊</Text>
            <Text style={styles.errorSubtext}>Complete a quiz to see your amazing results! ✨</Text>
            <Button
              title="Start a Quiz 🚀"
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
    if (percentage >= 90) return "Outstanding! 🏆";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 70) return "Great job! 👏";
    if (percentage >= 50) return "Good effort! 💪";
    return "Keep practicing! 📚";
  };
  
  const getResultDescription = () => {
    if (percentage >= 90) return "You're absolutely crushing it! 🔥";
    if (percentage >= 80) return "You're mastering the material! ⚡";
    if (percentage >= 70) return "You're making fantastic progress! 🚀";
    if (percentage >= 50) return "You're building a solid foundation! 🏗️";
    return "Every expert was once a beginner! 🌱";
  };

  const getScoreIcon = () => {
    if (percentage >= 90) return <Crown size={48} color={Colors.dark.background} />;
    if (percentage >= 80) return <Trophy size={48} color={Colors.dark.background} />;
    if (percentage >= 70) return <Star size={48} color={Colors.dark.background} />;
    return <Zap size={48} color={Colors.dark.background} />;
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
        {/* Celebration Confetti Animation */}
        {Platform.OS !== 'web' && percentage >= 80 && (
          <Animated.View
            style={[
              styles.confettiContainer,
              {
                opacity: celebrationOpacity,
                transform: [{ scale: confettiAnim }],
              },
            ]}
          >
            <Text style={styles.confettiEmoji}>🎉</Text>
            <Text style={styles.confettiEmoji}>✨</Text>
            <Text style={styles.confettiEmoji}>🎊</Text>
            <Text style={styles.confettiEmoji}>🌟</Text>
            <Text style={styles.confettiEmoji}>💫</Text>
          </Animated.View>
        )}

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
            <LinearGradient
              colors={percentage >= 80 ? 
                [Colors.dark.primary, Colors.dark.secondary] :
                percentage >= 60 ?
                [Colors.dark.success, `${Colors.dark.success}80`] :
                [Colors.dark.error, `${Colors.dark.error}80`]
              }
              style={styles.scoreCircle}
            >
              {getScoreIcon()}
              <Text style={styles.scoreText}>{percentage}%</Text>
              <Text style={styles.scoreDetail}>
                {score}/{total} correct ✅
              </Text>
            </LinearGradient>
            
            <Text style={styles.resultMessage}>{getResultMessage()}</Text>
            <Text style={styles.resultDescription}>{getResultDescription()}</Text>
            
            {mode === 'timed' && (
              <View style={styles.modeInfoContainer}>
                <Clock size={16} color={Colors.dark.textSecondary} />
                <Text style={styles.modeInfoText}>Timed Challenge Completed! ⏱️</Text>
              </View>
            )}
          </Animated.View>

          {/* Celebration Message for High Scores */}
          {Platform.OS !== 'web' && percentage >= 80 && (
            <Animated.View
              style={[
                styles.celebrationMessage,
                {
                  opacity: celebrationOpacity,
                  transform: [{ scale: celebrationScale }],
                },
              ]}
            >
              <Text style={styles.celebrationText}>
                {percentage >= 90 ? "Perfect Score! 🎯" : "Fantastic Work! 🔥"}
              </Text>
            </Animated.View>
          )}
          
          <Animated.View style={{ opacity: detailsOpacity }}>
            {categoryPerformance.length > 0 && (
              <View style={styles.performanceContainer}>
                <View style={styles.sectionHeader}>
                  <Target size={20} color={Colors.dark.text} />
                  <Text style={styles.sectionTitle}>Performance Breakdown 📊</Text>
                </View>
                
                {categoryPerformance.map((category) => (
                  <View key={category.categoryId} style={styles.categoryPerformance}>
                    <View style={styles.categoryHeader}>
                      <Text style={styles.categoryName}>{category.categoryName}</Text>
                      <Text style={styles.categoryScore}>
                        {category.correct}/{category.total} ({category.percentage}%) 
                        {category.percentage >= 80 ? ' 🌟' : category.percentage >= 60 ? ' 👍' : ' 📚'}
                      </Text>
                    </View>
                    <ProgressBar 
                      progress={category.percentage / 100}
                      height={8}
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
                  <Text style={styles.sectionTitle}>Achievement Unlocked! 🏆</Text>
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
                  🔐 Log in to save your progress and unlock achievements! ✨
                </Text>
                <Button
                  title="Log In 🚀"
                  onPress={() => router.push('/login')}
                  style={styles.loginPromptButton}
                />
              </View>
            )}
            
            <View style={styles.actionButtons}>
              <Button
                title="Share Results 📤"
                onPress={handleShare}
                variant="outline"
                style={styles.actionButton}
              />
            </View>
          </Animated.View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title="Try Again 🔄"
            onPress={handleRetakeQuiz}
            variant="outline"
            style={styles.footerButton}
          />
          <Button
            title="Home 🏠"
            onPress={handleGoHome}
            style={styles.footerButton}
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
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'none',
  },
  confettiEmoji: {
    position: 'absolute',
    fontSize: 32,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  resultContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    elevation: 8,
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8,
    shadowColor: Colors.dark.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  scoreText: {
    color: Colors.dark.background,
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 8,
  },
  scoreDetail: {
    color: Colors.dark.background,
    fontSize: 14,
    opacity: 0.9,
    fontWeight: '600',
  },
  resultMessage: {
    color: Colors.dark.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  resultDescription: {
    color: Colors.dark.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  celebrationMessage: {
    backgroundColor: `${Colors.dark.primary}20`,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  },
  celebrationText: {
    color: Colors.dark.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  modeInfoText: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '600',
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
    fontWeight: '600',
    flex: 1,
  },
  categoryScore: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  errorSubtext: {
    color: Colors.dark.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
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
    lineHeight: 24,
  },
  loginPromptButton: {
    width: 200,
  },
});
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth/authStore';
import Colors from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import LevelProgress from '@/components/home/LevelProgress';
import WeakestSubjects from '@/components/home/WeakestSubjects';
import ReviewCard from '@/components/home/ReviewCard';
import DashboardStats from '@/components/home/DashboardStats';
import QuickActions from '@/components/home/QuickActions';
import WeeklyProgress from '@/components/home/WeeklyProgress';
import { useUserLevel } from '@/hooks/useUserLevel';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useWeakestCategories } from '@/hooks/useWeakestCategories';
import { useIncorrectQuestions } from '@/hooks/useIncorrectQuestions';
import { useQuizStore } from '@/store/quiz/quizStore';
import { Play } from 'lucide-react-native';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';

export default function HomeScreen() {
  const { user, profile, isLoading, isAuthenticated } = useAuthStore();
  
  const levelData = useUserLevel();
  const statsData = useDashboardStats();
  const { weakestCategories } = useWeakestCategories();
  const { incorrectCount, isLoading: isIncorrectLoading, startReviewQuiz } = useIncorrectQuestions();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      const timeoutId = setTimeout(() => {
        try {
          router.replace('/login');
        } catch (error) {
          console.error('Navigation error (silently bypassed):', error);
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated, isLoading]);

  const handleQuickQuiz = () => {
    try {
      console.log('Timed Challenge pressed');
      router.push('/(tabs)/quiz');
    } catch (error) {
      console.error('Quick quiz navigation error (silently bypassed):', error);
    }
  };

  const handleStartQuiz = () => {
    try {
      router.push('/(tabs)/quiz');
    } catch (error) {
      console.error('Start quiz navigation error (silently bypassed):', error);
    }
  };

  const handleReviewPress = async () => {
    try {
      await startReviewQuiz();
      router.push('/(tabs)/quiz');
    } catch (error) {
      console.error('Review quiz navigation error (silently bypassed):', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
        <Text style={styles.loadingSubtext}>Preparing your dashboard</Text>
      </View>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Redirecting...</Text>
        <Text style={styles.loadingSubtext}>Taking you to login</Text>
      </View>
    );
  }

  const getDisplayName = () => {
    try {
      return profile?.username || 
             (user.email ? user.email.split('@')[0] : null) || 
             user.user_metadata?.username || 
             'User';
    } catch (error) {
      console.error('Error getting display name (silently bypassed):', error);
      return 'User';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.username}>{getDisplayName()}</Text>
        <Text style={styles.subtitle}>Ready to challenge yourself today?</Text>
      </View>

      <LevelProgress 
        level={levelData.level} 
        progress={levelData.progress} 
        experienceToNext={levelData.experienceToNext} 
      />

      <TouchableOpacity 
        style={styles.startQuizButtonContainer} 
        onPress={handleStartQuiz}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[Colors.dark.primary, Colors.dark.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.startQuizButton}
        >
          <View style={styles.startQuizContent}>
            <View style={styles.startQuizIcon}>
              <Play size={22} color={Colors.dark.background} fill={Colors.dark.background} />
            </View>
            <Text style={styles.startQuizText}>Start New Quiz</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      
      <WeakestSubjects weakestCategories={weakestCategories} />
      
      <ReviewCard 
        onReviewPress={handleReviewPress} 
        incorrectCount={incorrectCount} 
        isLoading={isIncorrectLoading} 
      />
      
      <DashboardStats
        totalQuizzes={statsData.totalQuizzes}
        averageScore={statsData.averageScore}
        currentStreak={statsData.currentStreak}
        totalTimeSpent={statsData.totalTimeSpent}
        getStreakEmoji={statsData.getStreakEmoji}
      />

      <QuickActions onQuickQuiz={handleQuickQuiz} />
      
      <WeeklyProgress weeklyProgress={statsData.weeklyProgress} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  contentContainer: {
    padding: Spacing.xl,
  },
  welcomeSection: {
    marginBottom: Spacing['2xl'],
  },
  greeting: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.xs,
  },
  username: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
  },
  startQuizButtonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: Spacing['2xl'],
    elevation: 4,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  startQuizButton: {
    borderRadius: 16,
    padding: Spacing.lg,
  },
  startQuizContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startQuizIcon: {
    marginRight: Spacing.md,
  },
  startQuizText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    padding: Spacing.xl,
  },
  loadingText: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.lg,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  loadingSubtext: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
  },
});
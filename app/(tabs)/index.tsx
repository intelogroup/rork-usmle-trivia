import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth/authStore';
import Colors from '@/theme/colors';
import DashboardStats from '@/components/home/DashboardStats';
import LevelProgress from '@/components/home/LevelProgress';
import QuickActions from '@/components/home/QuickActions';
import WeeklyProgress from '@/components/home/WeeklyProgress';
import WeakestSubjects from '@/components/home/WeakestSubjects';
import ReviewCard from '@/components/home/ReviewCard';
import { useUserLevel } from '@/hooks/useUserLevel';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useWeakestCategories } from '@/hooks/useWeakestCategories';
import { useIncorrectQuestions } from '@/hooks/useIncorrectQuestions';
import { useQuizStore } from '@/store/quiz/quizStore';
import { Play } from 'lucide-react-native';

export default function HomeScreen() {
  const { user, profile, isLoading, isAuthenticated } = useAuthStore();
  
  // Use hooks with error handling
  const levelData = useUserLevel();
  const statsData = useDashboardStats();
  const { weakestCategories } = useWeakestCategories();
  const { incorrectCount, isLoading: isIncorrectLoading, startReviewQuiz } = useIncorrectQuestions();

  // Prevent navigation before root layout is mounted
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      // Delay navigation to ensure root layout is mounted
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
      // Implement quick quiz navigation or logic here
      console.log('Timed Challenge pressed');
      // For now, navigate to quiz tab with preset parameters
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

  // Show loading while auth is initializing (but not for too long)
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
        <Text style={styles.loadingSubtext}>Preparing your dashboard</Text>
      </View>
    );
  }

  // Don't render anything if no user (should redirect to login)
  if (!user || !isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Redirecting...</Text>
        <Text style={styles.loadingSubtext}>Taking you to login</Text>
      </View>
    );
  }

  // Safe username extraction with fallbacks
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

      <TouchableOpacity style={styles.startQuizButton} onPress={handleStartQuiz}>
        <View style={styles.startQuizContent}>
          <View style={styles.startQuizIcon}>
            <Play size={20} color={Colors.dark.background} fill={Colors.dark.background} />
          </View>
          <Text style={styles.startQuizText}>Start New Quiz</Text>
        </View>
      </TouchableOpacity>
      
      <WeakestSubjects weakestCategories={weakestCategories} />
      
      <ReviewCard 
        onReviewPress={handleReviewPress} 
        incorrectCount={incorrectCount} 
        isLoading={isIncorrectLoading} 
      />
      
      <QuickActions onQuickQuiz={handleQuickQuiz} />
      
      <DashboardStats 
        totalQuizzes={statsData.totalQuizzes} 
        averageScore={statsData.averageScore} 
        currentStreak={statsData.currentStreak} 
        totalTimeSpent={statsData.totalTimeSpent} 
        getStreakEmoji={statsData.getStreakEmoji} 
      />
      
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
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    marginBottom: 4,
  },
  username: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  startQuizButton: {
    backgroundColor: Colors.dark.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  startQuizContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startQuizIcon: {
    marginRight: 12,
  },
  startQuizText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    padding: 20,
  },
  loadingText: {
    color: Colors.dark.text,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  loadingSubtext: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
});
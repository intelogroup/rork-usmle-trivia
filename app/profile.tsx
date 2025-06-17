import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Share, Platform, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Colors from '@/theme/colors';
import { useAuthStore } from '@/store/auth/authStore';
import { useProfileStats } from '@/hooks/useProfileStats';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import PerformanceOverview from '@/components/profile/PerformanceOverview';
import RecentAchievements from '@/components/profile/RecentAchievements';
import SettingsSection from '@/components/profile/SettingsSection';

export default function ProfileScreen() {
  const { user, profile, isAuthenticated } = useAuthStore();
  const { 
    achievements, 
    questionsAnswered, 
    perfectScores, 
    categoriesCompleted, 
    totalQuizzes,
    averageAccuracy,
    isLoading,
    error 
  } = useProfileStats();
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');

  // Utility functions
  const getStreakEmoji = () => {
    if (!profile) return '💫';
    if (profile.current_streak >= 30) return '🔥';
    if (profile.current_streak >= 14) return '⚡';
    if (profile.current_streak >= 7) return '🌟';
    return '💫';
  };

  const formatActivityTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common': return Colors.dark.textSecondary;
      case 'rare': return Colors.dark.primary;
      case 'epic': return Colors.dark.secondary;
      case 'legendary': return Colors.dark.warning;
      default: return Colors.dark.textSecondary;
    }
  };

  const handleShare = async () => {
    if (!profile) return;
    
    try {
      const message = `Check out my quiz progress! 🎯
` +
        `📊 Total Quizzes: ${totalQuizzes}
` +
        `🎯 Accuracy: ${averageAccuracy}%
` +
        `🔥 Current Streak: ${profile.current_streak} ${getStreakEmoji()}
` +
        `🏆 Level: ${profile.level}`;

      if (Platform.OS === 'web') {
        if (navigator.share) {
          await navigator.share({
            title: 'My Quiz Progress',
            text: message,
          });
        } else {
          await navigator.clipboard.writeText(message);
          Alert.alert('Success', 'Progress copied to clipboard!');
        }
      } else {
        await Share.share({
          message,
          title: 'My Quiz Progress',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share progress. Please try again.');
    }
  };

  const handleTimeFilterChange = (filter: 'week' | 'month' | 'all') => {
    setTimeFilter(filter);
  };

  const handleBack = () => {
    router.back();
  };

  // Calculate performance stats based on time filter
  const getPerformanceStats = () => {
    if (!profile) {
      return {
        totalTimeSpent: 0,
        questionsAnswered: 0,
        perfectScores: 0,
        categoriesCompleted: 0,
      };
    }

    // For now, return the same stats regardless of filter
    // In a real app, you'd filter by date range
    return {
      totalTimeSpent: profile.total_study_time,
      questionsAnswered,
      perfectScores,
      categoriesCompleted,
    };
  };

  if (!isAuthenticated || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Profile',
            headerStyle: { backgroundColor: Colors.dark.background },
            headerTintColor: Colors.dark.text,
          }} 
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Please sign in to view your profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Profile',
            headerStyle: { backgroundColor: Colors.dark.background },
            headerTintColor: Colors.dark.text,
          }} 
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Profile',
            headerStyle: { backgroundColor: Colors.dark.background },
            headerTintColor: Colors.dark.text,
          }} 
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Error loading profile: {error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => window.location.reload()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentStreak = profile?.current_streak || 0;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <ProfileHeader user={user} profile={profile} />
        
        <ProfileStats 
          totalQuizzes={totalQuizzes}
          averageAccuracy={averageAccuracy}
          currentStreak={currentStreak}
          unlockedAchievements={unlockedAchievements}
          getStreakEmoji={getStreakEmoji}
        />
        
        <PerformanceOverview 
          timeFilter={timeFilter}
          onTimeFilterChange={handleTimeFilterChange}
          onShare={handleShare}
          stats={getPerformanceStats()}
        />
        
        <RecentAchievements 
          achievements={achievements}
          formatActivityTime={formatActivityTime}
          getRarityColor={getRarityColor}
        />
        
        <SettingsSection onShare={handleShare} />
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    backgroundColor: Colors.dark.background,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.dark.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 32,
  },
});
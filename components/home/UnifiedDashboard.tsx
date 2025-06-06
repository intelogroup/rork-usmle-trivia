import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import DashboardStats from './DashboardStats';
import QuickActions from './QuickActions';
import WeeklyProgress from './WeeklyProgress';

interface UnifiedDashboardProps {
  totalQuizzes: number;
  averageScore: number;
  currentStreak: number;
  totalTimeSpent: number;
  getStreakEmoji: () => string;
  weeklyProgress: number;
  onQuickQuiz: () => void;
}

export default function UnifiedDashboard({
  totalQuizzes,
  averageScore,
  currentStreak,
  totalTimeSpent,
  getStreakEmoji,
  weeklyProgress,
  onQuickQuiz
}: UnifiedDashboardProps) {
  return (
    <View style={styles.container}>
      <DashboardStats
        totalQuizzes={totalQuizzes}
        averageScore={averageScore}
        currentStreak={currentStreak}
        totalTimeSpent={totalTimeSpent}
        getStreakEmoji={getStreakEmoji}
      />
      
      <View style={styles.divider} />
      
      <QuickActions onQuickQuiz={onQuickQuiz} />
      
      <View style={styles.divider} />
      
      <WeeklyProgress weeklyProgress={weeklyProgress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: 16,
  },
});
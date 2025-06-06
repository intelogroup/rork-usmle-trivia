import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import { Clock, Target, Zap, Trophy } from 'lucide-react-native';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';

interface DashboardStatsProps {
  totalQuizzes: number;
  averageScore: number;
  currentStreak: number;
  totalTimeSpent: number;
  getStreakEmoji: () => string;
}

export default function DashboardStats({ 
  totalQuizzes, 
  averageScore, 
  currentStreak, 
  totalTimeSpent, 
  getStreakEmoji 
}: DashboardStatsProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const stats = [
    {
      icon: Trophy,
      label: 'Quizzes',
      value: totalQuizzes.toString(),
      color: Colors.dark.primary,
      backgroundColor: 'rgba(96, 165, 250, 0.15)',
    },
    {
      icon: Target,
      label: 'Avg Score',
      value: `${averageScore}%`,
      color: Colors.dark.success,
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
    },
    {
      icon: Zap,
      label: 'Streak',
      value: `${currentStreak} ${getStreakEmoji()}`,
      color: Colors.dark.warning,
      backgroundColor: 'rgba(251, 191, 36, 0.15)',
    },
    {
      icon: Clock,
      label: 'Time',
      value: formatTime(totalTimeSpent),
      color: Colors.dark.secondary,
      backgroundColor: 'rgba(147, 197, 253, 0.15)',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: stat.backgroundColor }]}>
              <stat.icon size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    minHeight: 80,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: 2,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.dark.textSecondary,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
});
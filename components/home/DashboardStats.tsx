import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import { Clock, Target, Zap, Trophy } from 'lucide-react-native';

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
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
    },
    {
      icon: Target,
      label: 'Avg Score',
      value: `${averageScore}%`,
      color: Colors.dark.success,
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
    },
    {
      icon: Zap,
      label: 'Streak',
      value: `${currentStreak} ${getStreakEmoji()}`,
      color: Colors.dark.warning,
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
    },
    {
      icon: Clock,
      label: 'Time',
      value: formatTime(totalTimeSpent),
      color: Colors.dark.secondary,
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: stat.backgroundColor }]}>
              <stat.icon size={14} color={Colors.dark.text} />
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
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    minHeight: 70,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 2,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: Colors.dark.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
});
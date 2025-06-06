import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import { Trophy, Target, Zap, Award } from 'lucide-react-native';

interface ProfileStatsProps {
  totalQuizzes: number;
  averageAccuracy: number;
  currentStreak: number;
  unlockedAchievements: number;
  getStreakEmoji: () => string;
}

export default function ProfileStats({ 
  totalQuizzes, 
  averageAccuracy, 
  currentStreak, 
  unlockedAchievements,
  getStreakEmoji 
}: ProfileStatsProps) {
  const stats = [
    {
      icon: Trophy,
      label: 'Total Quizzes',
      value: totalQuizzes.toString(),
      color: Colors.dark.primary,
      backgroundColor: 'rgba(99, 102, 241, 0.15)',
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: `${averageAccuracy}%`,
      color: Colors.dark.success,
      backgroundColor: 'rgba(34, 197, 94, 0.15)',
    },
    {
      icon: Zap,
      label: 'Current Streak',
      value: `${currentStreak} ${getStreakEmoji()}`,
      color: Colors.dark.warning,
      backgroundColor: 'rgba(255, 215, 0, 0.15)',
    },
    {
      icon: Award,
      label: 'Achievements',
      value: unlockedAchievements.toString(),
      color: Colors.dark.secondary,
      backgroundColor: 'rgba(168, 85, 247, 0.15)',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: stat.backgroundColor }]}>
              <stat.icon size={22} color={stat.color} />
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
    marginBottom: 24,
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
});
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import ProgressBar from '@/components/ProgressBar';
import { TrendingUp } from 'lucide-react-native';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';

interface WeeklyProgressProps {
  weeklyProgress: number;
}

export default function WeeklyProgress({ weeklyProgress }: WeeklyProgressProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.title}>Weekly Progress</Text>
          <Text style={styles.subtitle}>
            {Math.round(weeklyProgress)}% of weekly goal
          </Text>
        </View>
        <View style={styles.icon}>
          <TrendingUp size={20} color={Colors.dark.primary} />
        </View>
      </View>
      <ProgressBar 
        progress={weeklyProgress / 100} 
        height={8} 
        fillColor={Colors.dark.success}
        backgroundColor={Colors.dark.cardHighlight}
      />
      <Text style={styles.description}>
        Complete 7 quizzes this week to reach your goal!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(96, 165, 250, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.textSecondary,
    marginTop: Spacing.sm,
    fontWeight: Typography.fontWeight.medium,
  },
});
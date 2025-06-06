import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import ProgressBar from '@/components/ProgressBar';
import { TrendingUp } from 'lucide-react-native';

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
          <TrendingUp size={18} color={Colors.dark.primary} />
        </View>
      </View>
      <ProgressBar 
        progress={weeklyProgress / 100} 
        height={6} 
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
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    fontWeight: '500',
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    marginTop: 8,
    fontWeight: '500',
  },
});
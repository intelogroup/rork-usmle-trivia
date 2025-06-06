import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import { CategoryPerformance } from '@/types';
import ProgressBar from './ProgressBar';

interface PerformanceCardProps {
  performance: CategoryPerformance;
}

export default function PerformanceCard({ performance }: PerformanceCardProps) {
  const getStatusColor = () => {
    if (performance.percentage >= 80) return Colors.dark.success;
    if (performance.percentage >= 60) return Colors.dark.secondary;
    return Colors.dark.error;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryName}>{performance.categoryName}</Text>
        <View style={[styles.percentageBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.percentageText}>{performance.percentage}%</Text>
        </View>
      </View>
      
      <ProgressBar 
        progress={performance.percentage / 100}
        fillColor={getStatusColor()}
        height={6}
      />
      
      <Text style={styles.statsText}>
        {performance.correct} correct out of {performance.attempted} questions
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  statsText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginTop: 8,
  },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/theme/colors';
import { Share2, Clock, HelpCircle, CheckCircle, BookOpen } from 'lucide-react-native';

interface PerformanceOverviewProps {
  timeFilter: 'week' | 'month' | 'all';
  onTimeFilterChange: (filter: 'week' | 'month' | 'all') => void;
  onShare: () => void;
  stats: {
    totalTimeSpent: number;
    questionsAnswered: number;
    perfectScores: number;
    categoriesCompleted: number;
  };
}

export default function PerformanceOverview({ 
  timeFilter, 
  onTimeFilterChange, 
  onShare, 
  stats 
}: PerformanceOverviewProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const performanceStats = [
    {
      icon: Clock,
      label: 'Study Time',
      value: formatTime(stats.totalTimeSpent),
      color: Colors.dark.primary,
      progress: stats.totalTimeSpent / 600, // Assuming 10 hours as max for visual
    },
    {
      icon: HelpCircle,
      label: 'Questions',
      value: stats.questionsAnswered.toString(),
      color: Colors.dark.success,
      progress: stats.questionsAnswered / 500, // Assuming 500 as max for visual
    },
    {
      icon: CheckCircle,
      label: 'Perfect Scores',
      value: stats.perfectScores.toString(),
      color: Colors.dark.warning,
      progress: stats.perfectScores / 50, // Assuming 50 as max for visual
    },
    {
      icon: BookOpen,
      label: 'Categories',
      value: stats.categoriesCompleted.toString(),
      color: Colors.dark.secondary,
      progress: stats.categoriesCompleted / 20, // Assuming 20 as max for visual
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Overview</Text>
        <TouchableOpacity onPress={onShare} style={styles.shareButton}>
          <Share2 size={20} color={Colors.dark.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {(['week', 'month', 'all'] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              timeFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => onTimeFilterChange(filter)}
          >
            <Text
              style={[
                styles.filterText,
                timeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter === 'all' ? 'All Time' : `This ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsGrid}>
        {performanceStats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <View style={styles.statIcon}>
              <stat.icon size={18} color={stat.color} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: stat.color, width: `${Math.min(stat.progress * 100, 100)}%` }
                  ]}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: Colors.dark.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.dark.textSecondary,
  },
  filterTextActive: {
    color: Colors.dark.background,
    fontWeight: '600',
  },
  statsGrid: {
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: Colors.dark.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
});
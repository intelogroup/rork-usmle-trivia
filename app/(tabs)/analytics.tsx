import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Colors from '@/theme/colors';
import { useAuthStore } from '@/store/auth/authStore';
import { supabase } from '@/lib/supabase';
import StatCard from '@/components/StatCard';
import { BarChart3, TrendingUp, Clock, Target, Calendar, Brain, Award, BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AnalyticsData {
  totalSessions: number;
  averageScore: number;
  totalTimeSpent: number;
  averageTimePerQuestion: number;
  currentStreak: number;
  longestStreak: number;
  weeklyQuizzes: number;
  monthlyQuizzes: number;
  categoryBreakdown: { [key: string]: number };
}

export default function AnalyticsScreen() {
  const { user, profile } = useAuthStore();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalSessions: 0,
    averageScore: 0,
    totalTimeSpent: 0,
    averageTimePerQuestion: 30,
    currentStreak: 0,
    longestStreak: 0,
    weeklyQuizzes: 0,
    monthlyQuizzes: 0,
    categoryBreakdown: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (user) {
      loadAnalytics();
    }
  }, [user, timeframe]);

  const loadAnalytics = async () => {
    // ... existing loadAnalytics logic ...
  };
  
  if (!user) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.dark.background, Colors.dark.card]}
          style={styles.gradientBackground}
        >
          <View style={styles.errorContainer}>
            <Brain size={48} color={Colors.dark.textSecondary} />
            <Text style={styles.errorText}>Please log in to view analytics</Text>
            <Text style={styles.errorSubtext}>
              Track your progress and get personalized insights
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading analytics...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadAnalytics}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <BarChart3 size={32} color={Colors.dark.primary} />
          </View>
          <Text style={styles.title}>Learning Analytics</Text>
          <Text style={styles.subtitle}>Track your progress and insights</Text>
        </View>
        
        {/* Timeframe Selector */}
        <View style={styles.timeframeContainer}>
          {(['week', 'month', 'quarter'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.timeframeButton,
                timeframe === period && styles.activeTimeframe
              ]}
              onPress={() => setTimeframe(period)}
            >
              <Text style={[
                styles.timeframeText,
                timeframe === period && styles.activeTimeframeText
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Award size={24} color={Colors.dark.primary} />
            <Text style={styles.metricValue}>{analytics.averageScore}%</Text>
            <Text style={styles.metricLabel}>Average Score</Text>
          </View>
          <View style={styles.metricCard}>
            <Clock size={24} color={Colors.dark.primary} />
            <Text style={styles.metricValue}>{analytics.totalTimeSpent}h</Text>
            <Text style={styles.metricLabel}>Study Time</Text>
          </View>
          <View style={styles.metricCard}>
            <BookOpen size={24} color={Colors.dark.primary} />
            <Text style={styles.metricValue}>{analytics.totalSessions}</Text>
            <Text style={styles.metricLabel}>Sessions</Text>
          </View>
        </View>
        
        {/* Performance Overview */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color={Colors.dark.text} />
            <Text style={styles.sectionTitle}>Performance Overview</Text>
          </View>
          <View style={styles.performanceGrid}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>{analytics.currentStreak}</Text>
              <Text style={styles.performanceLabel}>Current Streak</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>{analytics.longestStreak}</Text>
              <Text style={styles.performanceLabel}>Best Streak</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>{analytics.weeklyQuizzes}</Text>
              <Text style={styles.performanceLabel}>This Week</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>{analytics.monthlyQuizzes}</Text>
              <Text style={styles.performanceLabel}>This Month</Text>
            </View>
          </View>
        </View>
        
        {/* Category Performance */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Target size={20} color={Colors.dark.text} />
            <Text style={styles.sectionTitle}>Category Performance</Text>
          </View>
          {Object.entries(analytics.categoryBreakdown).map(([category, count]) => (
            <View key={category} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryCount}>{count} quizzes</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    { width: `${Math.min(count / analytics.totalSessions * 100, 100)}%` }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
        
        {/* Study Time Analysis */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color={Colors.dark.text} />
            <Text style={styles.sectionTitle}>Study Time Analysis</Text>
          </View>
          <View style={styles.timeAnalysis}>
            <View style={styles.timeAnalysisItem}>
              <Text style={styles.timeAnalysisValue}>
                {analytics.averageTimePerQuestion}s
              </Text>
              <Text style={styles.timeAnalysisLabel}>
                Avg. Time per Question
              </Text>
            </View>
            <View style={styles.timeAnalysisItem}>
              <Text style={styles.timeAnalysisValue}>
                {Math.round(analytics.totalTimeSpent * 60 / analytics.totalSessions)}m
              </Text>
              <Text style={styles.timeAnalysisLabel}>
                Avg. Session Length
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.dark.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  timeframeContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTimeframe: {
    backgroundColor: Colors.dark.primary,
  },
  timeframeText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  activeTimeframeText: {
    color: Colors.dark.background,
    fontWeight: '600',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginVertical: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginLeft: 8,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  performanceItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.dark.text,
  },
  categoryCount: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
    borderRadius: 3,
  },
  timeAnalysis: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timeAnalysisItem: {
    alignItems: 'center',
  },
  timeAnalysisValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  timeAnalysisLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    color: Colors.dark.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: Colors.dark.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
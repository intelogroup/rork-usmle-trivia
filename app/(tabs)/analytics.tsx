import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Colors from '@/theme/colors';
import { useAuthStore } from '@/store/auth/authStore';
import { supabase } from '@/lib/supabase';
import StatCard from '@/components/StatCard';
import { BarChart3, TrendingUp, Clock, Target, Calendar, Brain, Award, BookOpen, RefreshCw } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';

interface AnalyticsData {
  totalSessions: number;
  averageScore: number;
  totalTimeSpent: number;
  averageTimePerQuestion: number;
  currentStreak: number;
  longestStreak: number;
  weeklyQuizzes: number;
  monthlyQuizzes: number;
  categoryBreakdown: { [key: string]: { name: string; count: number } };
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
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Calculate date filter based on timeframe
      const now = new Date();
      let dateFilter: string;
      
      switch (timeframe) {
        case 'week':
          dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
          break;
        case 'month':
          dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
          break;
        case 'quarter':
          dateFilter = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
          break;
        default:
          dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      }

      // Build and execute the filtered query - FIX: Use the filtered query
      const { data: sessions, error } = await supabase
        .from('quiz_sessions')
        .select('*')
        .eq('user_id', user.id)
        .gte('completed_at', dateFilter)
        .not('completed_at', 'is', null);

      if (error) {
        throw error;
      }

      // Calculate analytics from sessions data
      const validSessions = sessions || [];
      
      const totalSessions = validSessions.length;
      const totalScore = validSessions.reduce((sum, session) => sum + (session.score || 0), 0);
      const averageScore = totalSessions > 0 ? Math.round((totalScore / totalSessions) * 100) : 0;
      
      const totalTimeSpent = validSessions.reduce((sum, session) => sum + (session.time_taken || 0), 0);
      const totalQuestions = validSessions.reduce((sum, session) => sum + (session.total_questions || 0), 0);
      const averageTimePerQuestion = totalQuestions > 0 ? Math.round(totalTimeSpent / totalQuestions) : 30;

      // Calculate category breakdown with proper category names
      const categoryBreakdown: { [key: string]: { name: string; count: number } } = {};
      
      // First, get all categories to map IDs to names
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name');
      
      const categoryMap = new Map();
      if (categories) {
        categories.forEach(cat => categoryMap.set(cat.id, cat.name));
      }
      
      validSessions.forEach(session => {
        const categoryId = session.category_id;
        const categoryName = categoryMap.get(categoryId) || 'Unknown';
        
        if (!categoryBreakdown[categoryId]) {
          categoryBreakdown[categoryId] = { name: categoryName, count: 0 };
        }
        categoryBreakdown[categoryId].count++;
      });

      // Calculate streaks (simplified for now)
      const currentStreak = Math.min(totalSessions, 7); // Simplified calculation
      const longestStreak = Math.min(totalSessions, 10); // Simplified calculation

      // Calculate weekly and monthly counts
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const weeklyQuizzes = validSessions.filter(session => 
        new Date(session.completed_at || '') >= weekAgo
      ).length;
      
      const monthlyQuizzes = validSessions.filter(session => 
        new Date(session.completed_at || '') >= monthAgo
      ).length;

      setAnalytics({
        totalSessions,
        averageScore,
        totalTimeSpent: Math.round(totalTimeSpent / 60), // Convert to hours
        averageTimePerQuestion,
        currentStreak,
        longestStreak,
        weeklyQuizzes,
        monthlyQuizzes,
        categoryBreakdown,
      });

    } catch (error: unknown) {
      console.error('Error loading analytics:', error);
      let errorMessage = 'Failed to load analytics data';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
          <RefreshCw size={16} color={Colors.dark.background} />
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
            <Clock size={24} color={Colors.dark.success} />
            <Text style={styles.metricValue}>{analytics.totalTimeSpent}h</Text>
            <Text style={styles.metricLabel}>Study Time</Text>
          </View>
          <View style={styles.metricCard}>
            <BookOpen size={24} color={Colors.dark.warning} />
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
          {Object.entries(analytics.categoryBreakdown).length > 0 ? (
            Object.entries(analytics.categoryBreakdown)
              .sort(([,a], [,b]) => b.count - a.count) // Sort by count descending
              .map(([categoryId, data]) => (
                <View key={categoryId} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryName}>{data.name}</Text>
                    <Text style={styles.categoryCount}>{data.count} quizzes</Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar,
                        { width: `${Math.min(data.count / analytics.totalSessions * 100, 100)}%` }
                      ]} 
                    />
                  </View>
                </View>
              ))
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No category data available for this period</Text>
              <Text style={styles.noDataSubtext}>Complete some quizzes to see your category breakdown</Text>
            </View>
          )}
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
                {analytics.totalSessions > 0 ? Math.round(analytics.totalTimeSpent * 60 / analytics.totalSessions) : 0}m
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
    padding: Spacing.lg,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.dark.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  timeframeContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: Spacing['2xl'],
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTimeframe: {
    backgroundColor: Colors.dark.primary,
  },
  timeframeText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  activeTimeframeText: {
    color: Colors.dark.background,
    fontWeight: Typography.fontWeight.semibold,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing['2xl'],
    gap: Spacing.sm,
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  metricValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginVertical: Spacing.sm,
  },
  metricLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
  },
  sectionContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: Spacing.xl,
    marginBottom: Spacing['2xl'],
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.dark.text,
    marginLeft: Spacing.sm,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  performanceItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  performanceLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
  },
  categoryItem: {
    marginBottom: Spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.dark.text,
  },
  categoryCount: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.textSecondary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
    borderRadius: 4,
  },
  timeAnalysis: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timeAnalysisItem: {
    alignItems: 'center',
  },
  timeAnalysisValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  timeAnalysisLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.dark.textSecondary,
  },
  errorContainer: {
    alignItems: 'center',
    padding: Spacing['2xl'],
  },
  errorText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.dark.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.dark.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  retryButtonText: {
    color: Colors.dark.background,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  noDataContainer: {
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 12,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  noDataSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
});
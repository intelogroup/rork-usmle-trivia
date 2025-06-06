import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '@/theme/colors';
import { useAuthStore } from '@/store/auth/authStore';
import { supabase } from '@/lib/supabase';
import StatCard from '@/components/StatCard';
import { BarChart3, TrendingUp, Clock, Target, Calendar } from 'lucide-react-native';

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
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      
      // Get date filter
      let dateFilter = '';
      const now = new Date();
      if (timeframe === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        dateFilter = weekAgo.toISOString();
      } else if (timeframe === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        dateFilter = monthAgo.toISOString();
      } else if (timeframe === 'quarter') {
        const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        dateFilter = quarterAgo.toISOString();
      }

      let query = supabase
        .from('quiz_sessions')
        .select('*')
        .eq('user_id', user.id);

      if (dateFilter) {
        query = query.gte('completed_at', dateFilter);
      }

      const { data: sessions, error } = await supabase
        .from('quiz_sessions')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading analytics:', error);
        setError('Failed to load analytics data. Please try again.');
        return;
      }

      if (sessions) {
        const totalSessions = sessions.length;
        const totalScore = sessions.reduce((sum, session) => sum + session.score, 0);
        const averageScore = totalSessions > 0 ? Math.round(totalScore / totalSessions) : 0;
        const totalTimeSpent = sessions.reduce((sum, session) => sum + session.time_taken, 0);
        const totalQuestions = sessions.reduce((sum, session) => sum + session.total_questions, 0);
        const averageTimePerQuestion = totalQuestions > 0 ? Math.round(totalTimeSpent / totalQuestions) : 30;

        // Calculate weekly and monthly stats
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        const weeklyQuizzes = sessions.filter(s => 
          new Date(s.completed_at) >= weekAgo
        ).length;
        
        const monthlyQuizzes = sessions.filter(s => 
          new Date(s.completed_at) >= monthAgo
        ).length;

        // Category breakdown
        const categoryBreakdown: { [key: string]: number } = {};
        sessions.forEach(session => {
          const categoryId = session.category_id;
          categoryBreakdown[categoryId] = (categoryBreakdown[categoryId] || 0) + 1;
        });

        setAnalytics({
          totalSessions,
          averageScore,
          totalTimeSpent: Math.round(totalTimeSpent / 3600), // Convert to hours
          averageTimePerQuestion,
          currentStreak: profile?.current_streak || 0,
          longestStreak: profile?.best_streak || 0, // Fixed: changed from longest_streak to best_streak
          weeklyQuizzes,
          monthlyQuizzes,
          categoryBreakdown,
        });
      }
    } catch (error) {
      console.error('Error loading analytics (silently bypassed):', error);
      setError('Failed to load analytics data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please log in to view analytics</Text>
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
        
        {/* Overview Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Average Score"
            value={`${analytics.averageScore}%`}
            subtitle="overall performance"
          />
          <StatCard
            title="Study Time"
            value={`${analytics.totalTimeSpent}h`}
            subtitle={`${analytics.averageTimePerQuestion}s avg`}
          />
          <StatCard
            title="Current Streak"
            value={analytics.currentStreak}
            subtitle={`Best: ${analytics.longestStreak}`}
          />
        </View>
        
        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statGridItem}>
            <Clock size={20} color={Colors.dark.textSecondary} />
            <Text style={styles.statGridValue}>{analytics.averageTimePerQuestion}s</Text>
            <Text style={styles.statGridLabel}>Avg. Time</Text>
          </View>
          <View style={styles.statGridItem}>
            <Target size={20} color={Colors.dark.textSecondary} />
            <Text style={styles.statGridValue}>{analytics.averageScore}%</Text>
            <Text style={styles.statGridLabel}>Accuracy</Text>
          </View>
          <View style={styles.statGridItem}>
            <Calendar size={20} color={Colors.dark.textSecondary} />
            <Text style={styles.statGridValue}>{analytics.totalSessions}</Text>
            <Text style={styles.statGridLabel}>Sessions</Text>
          </View>
        </View>

        {/* Activity Summary */}
        <View style={styles.activitySummary}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          <View style={styles.activityStats}>
            <View style={styles.activityItem}>
              <Text style={styles.activityValue}>{analytics.weeklyQuizzes}</Text>
              <Text style={styles.activityLabel}>This Week</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityValue}>{analytics.monthlyQuizzes}</Text>
              <Text style={styles.activityLabel}>This Month</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityValue}>{Object.keys(analytics.categoryBreakdown).length}</Text>
              <Text style={styles.activityLabel}>Categories</Text>
            </View>
          </View>
        </View>

        {/* Placeholder for future charts and insights */}
        <View style={styles.placeholderContainer}>
          <TrendingUp size={48} color={Colors.dark.textSecondary} />
          <Text style={styles.placeholderTitle}>More Analytics Coming Soon</Text>
          <Text style={styles.placeholderText}>
            Detailed performance charts, category breakdowns, and learning insights will be available here.
          </Text>
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
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
    backgroundColor: Colors.dark.background,
  },
  timeframeText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  activeTimeframeText: {
    color: Colors.dark.primary,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statGridItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statGridValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    marginVertical: 8,
  },
  statGridLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  activitySummary: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  activityStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activityItem: {
    alignItems: 'center',
  },
  activityValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.primary,
    marginBottom: 4,
  },
  activityLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    fontWeight: '500',
  },
  placeholderContainer: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.dark.error,
    textAlign: 'center',
    marginTop: 32,
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
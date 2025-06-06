import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/theme/colors';
import { Zap, BookOpen, Trophy, Target } from 'lucide-react-native';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';

interface QuickActionsProps {
  onQuickQuiz: () => void;
}

export default function QuickActions({ onQuickQuiz }: QuickActionsProps) {
  const actions = [
    {
      icon: Zap,
      label: 'Timed Challenge',
      onPress: onQuickQuiz,
      color: Colors.dark.primary,
      backgroundColor: 'rgba(96, 165, 250, 0.15)',
    },
    {
      icon: BookOpen,
      label: 'Browse Categories',
      onPress: () => router.push('/(tabs)/quiz'),
      color: Colors.dark.success,
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
    },
    {
      icon: Trophy,
      label: 'Leaderboard',
      onPress: () => router.push('/(tabs)/leaderboard'),
      color: Colors.dark.warning,
      backgroundColor: 'rgba(251, 191, 36, 0.15)',
    },
    {
      icon: Target,
      label: 'Analytics',
      onPress: () => router.push('/(tabs)/analytics'),
      color: Colors.dark.secondary,
      backgroundColor: 'rgba(147, 197, 253, 0.15)',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.grid}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionCard, { backgroundColor: action.backgroundColor }]}
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <action.icon size={20} color={Colors.dark.text} />
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
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
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  actionCard: {
    flex: 1,
    minWidth: '47%',
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    minHeight: 70,
  },
  actionLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.text,
    fontWeight: Typography.fontWeight.semibold,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
});
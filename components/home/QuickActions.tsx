import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/theme/colors';
import { Zap, BookOpen, Trophy, Target } from 'lucide-react-native';

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
      backgroundColor: 'rgba(30, 58, 138, 0.2)',
    },
    {
      icon: BookOpen,
      label: 'Browse Categories',
      onPress: () => router.push('/(tabs)/quiz'),
      color: Colors.dark.success,
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
    },
    {
      icon: Trophy,
      label: 'Leaderboard',
      onPress: () => router.push('/(tabs)/leaderboard'),
      color: Colors.dark.warning,
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
    },
    {
      icon: Target,
      label: 'Analytics',
      onPress: () => router.push('/(tabs)/analytics'),
      color: Colors.dark.secondary,
      backgroundColor: 'rgba(6, 182, 212, 0.2)',
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
            <action.icon size={18} color={Colors.dark.text} />
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
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
    flexWrap: 'wrap',
    gap: 8,
  },
  actionCard: {
    flex: 1,
    minWidth: '47%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    minHeight: 60,
  },
  actionLabel: {
    fontSize: 12,
    color: Colors.dark.text,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
});
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
      label: 'Quick Quiz',
      onPress: onQuickQuiz,
      color: Colors.dark.primary,
      backgroundColor: 'rgba(30, 58, 138, 0.2)',
    },
    {
      icon: BookOpen,
      label: 'Study Tips',
      onPress: () => router.push('/study-tips'),
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
            <action.icon size={16} color={action.color} />
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
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
    gap: 6,
  },
  actionCard: {
    flex: 1,
    minWidth: '47%',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    minHeight: 50,
  },
  actionLabel: {
    fontSize: 10,
    color: Colors.dark.text,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
});
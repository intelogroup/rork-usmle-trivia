import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import Spacing from '@/theme/spacing';
import DashboardStats from './DashboardStats';
import QuickActions from './QuickActions';
import WeeklyProgress from './WeeklyProgress';

export default function UnifiedDashboard() {
  return (
    <View style={styles.container}>
      <DashboardStats />
      
      <View style={styles.divider} />
      
      <QuickActions />
      
      <View style={styles.divider} />
      
      <WeeklyProgress />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: Spacing['2xl'],
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: 16,
    opacity: 0.5,
  },
});
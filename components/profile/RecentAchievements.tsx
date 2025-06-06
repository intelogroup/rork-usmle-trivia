import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '@/theme/colors';
import { Achievement } from '@/types';

interface RecentAchievementsProps {
  achievements: Achievement[];
  formatActivityTime: (dateString: string) => string;
  getRarityColor: (rarity: string) => string;
}

export default function RecentAchievements({ 
  achievements, 
  formatActivityTime, 
  getRarityColor 
}: RecentAchievementsProps) {
  const recentUnlocked = achievements
    .filter(a => a.unlocked && a.unlocked_at)
    .sort((a, b) => new Date(b.unlocked_at!).getTime() - new Date(a.unlocked_at!).getTime())
    .slice(0, 5);

  const handleViewAll = () => {
    // TODO: Navigate to full achievements screen
    console.log('View all achievements');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Achievements</Text>
        {recentUnlocked.length > 3 && (
          <TouchableOpacity onPress={handleViewAll} style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {recentUnlocked.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {recentUnlocked.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={styles.achievementHeader}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(achievement.rarity) }]}>
                  <Text style={styles.rarityText}>{achievement.rarity}</Text>
                </View>
              </View>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription} numberOfLines={2} ellipsizeMode="tail">
                {achievement.description}
              </Text>
              <Text style={styles.achievementTime}>
                {achievement.unlocked_at ? formatActivityTime(achievement.unlocked_at) : ''}
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No achievements unlocked yet</Text>
          <Text style={styles.emptySubtext}>Complete quizzes to earn your first achievement!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 20,
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
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.dark.primary,
    fontWeight: '600',
  },
  scrollView: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  achievementCard: {
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 180,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementIcon: {
    fontSize: 26,
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.dark.background,
    textTransform: 'uppercase',
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 6,
  },
  achievementDescription: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
  },
  achievementTime: {
    fontSize: 12,
    color: Colors.dark.textTertiary,
    fontWeight: '500',
  },
  emptyState: {
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
});
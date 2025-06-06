import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import ProgressBar from '@/components/ProgressBar';
import { Trophy, Star } from 'lucide-react-native';

interface LevelProgressProps {
  level: number;
  progress: number;
  experienceToNext: number;
}

export default function LevelProgress({
  level,
  progress,
  experienceToNext,
}: LevelProgressProps) {
  const progressPercentage = Math.round(progress * 100);
  const currentXP = Math.round(progress * experienceToNext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.levelBadge}>
          <Trophy size={16} color={Colors.dark.primary} />
          <Text style={styles.levelText}>Level {level}</Text>
        </View>
        <View style={styles.xpContainer}>
          <Star size={14} color={Colors.dark.accent} />
          <Text style={styles.xpText}>{currentXP} XP</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={progress}
          height={8}
          fillColor={Colors.dark.primary}
          backgroundColor={Colors.dark.cardHighlight}
        />
        <View style={styles.progressLabels}>
          <Text style={styles.progressText}>
            {currentXP} / {experienceToNext} XP
          </Text>
          <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
        </View>
      </View>
      
      <Text style={styles.nextLevelText}>
        {experienceToNext - currentXP} XP to Level {level + 1}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardHighlight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
    marginLeft: 6,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.textSecondary,
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark.primary,
  },
  nextLevelText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
});
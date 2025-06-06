import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Achievement } from '@/types';
import Colors from '@/theme/colors';
import { Award, BookOpen, CheckCircle, Zap, Calendar, Heart, Microscope, Pill } from 'lucide-react-native';
import ProgressBar from './ProgressBar';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const renderIcon = () => {
    const iconProps = {
      size: 24,
      color: achievement.unlocked ? Colors.dark.primary : Colors.dark.inactive,
      strokeWidth: 2
    };

    switch (achievement.icon) {
      case 'award':
        return <Award {...iconProps} />;
      case 'book-open':
        return <BookOpen {...iconProps} />;
      case 'check-circle':
        return <CheckCircle {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      case 'calendar':
        return <Calendar {...iconProps} />;
      case 'heart':
        return <Heart {...iconProps} />;
      case 'microscope':
        return <Microscope {...iconProps} />;
      case 'pill':
        return <Pill {...iconProps} />;
      default:
        return <Award {...iconProps} />;
    }
  };

  const hasProgress = achievement.progress !== undefined && achievement.total !== undefined;
  const progress = hasProgress ? achievement.progress! / achievement.total! : 0;

  return (
    <View style={[
      styles.container,
      achievement.unlocked ? styles.unlockedContainer : null
    ]}>
      <View style={styles.header}>
        <View style={[
          styles.iconContainer,
          achievement.unlocked ? styles.unlockedIconContainer : null
        ]}>
          {renderIcon()}
        </View>
        <View style={styles.titleContainer}>
          <Text style={[
            styles.title,
            achievement.unlocked ? styles.unlockedTitle : null
          ]}>
            {achievement.title}
          </Text>
          <Text style={styles.description}>{achievement.description}</Text>
        </View>
      </View>
      
      {hasProgress && !achievement.unlocked && (
        <View style={styles.progressContainer}>
          <ProgressBar 
            progress={progress} 
            height={6} 
            fillColor={Colors.dark.secondary}
            showPercentage={false}
          />
          <Text style={styles.progressText}>
            {achievement.progress} / {achievement.total}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  unlockedContainer: {
    borderColor: Colors.dark.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  unlockedIconContainer: {
    backgroundColor: 'rgba(124, 93, 240, 0.2)',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  unlockedTitle: {
    color: Colors.dark.primary,
  },
  description: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
});
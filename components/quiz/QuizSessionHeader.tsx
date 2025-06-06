import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/theme/colors';
import ProgressBar from '@/components/ProgressBar';
import QuizTimer from './QuizTimer';
import { X, BookOpenCheck, Target, Zap } from 'lucide-react-native';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';

interface QuizSessionHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  timeRemaining?: number;
  mode?: string;
  categoryName?: string;
}

export default function QuizSessionHeader({
  currentQuestion,
  totalQuestions,
  progress,
  timeRemaining,
  mode,
  categoryName,
}: QuizSessionHeaderProps) {
  const handleClose = () => {
    router.back();
  };

  const isTimedMode = mode === 'timed';

  const getModeEmoji = () => {
    switch (mode) {
      case 'timed': return '⏱️';
      case 'practice': return '✍️';
      default: return '📝';
    }
  };

  const getModeText = () => {
    switch (mode) {
      case 'timed': return 'Timed Challenge';
      case 'practice': return 'Practice Mode';
      default: return 'Standard Quiz';
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Row: Category/Title and Close Button */}
      <View style={styles.topRow}>
        <View style={styles.titleSection}>
          {categoryName && (
            <Text style={styles.categoryText} numberOfLines={1}>
              🎯 {categoryName}
            </Text>
          )}
          <Text style={styles.modeText}>
            {getModeText()} {getModeEmoji()}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={handleClose}
          accessibilityLabel="Close quiz"
          accessibilityRole="button"
        >
          <X size={20} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>

      {/* Middle Row: Question Counter and Timer */}
      <View style={styles.middleRow}>
        <View style={styles.questionInfo}>
          <Text style={styles.questionCounter}>
            Question {currentQuestion} of {totalQuestions} 📊
          </Text>
          <Text style={styles.progressText}>
            {Math.round(progress * 100)}% Complete 🌟
          </Text>
        </View>
        
        {isTimedMode && timeRemaining !== undefined && (
          <QuizTimer 
            timeRemaining={timeRemaining} 
            isWarning={timeRemaining <= 10}
          />
        )}
      </View>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar 
          progress={progress} 
          height={8} 
          fillColor={Colors.dark.primary}
          backgroundColor={Colors.dark.cardHighlight}
        />
      </View>

      {/* Motivation Badge */}
      <View style={styles.motivationContainer}>
        <View style={styles.motivationBadge}>
          <Zap size={14} color={Colors.dark.primary} />
          <Text style={styles.motivationText}>
            {progress < 0.3 ? "You've got this! 💪" : 
             progress < 0.7 ? "Great progress! 🔥" : 
             "Almost there! 🚀"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    elevation: 4,
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  titleSection: {
    flex: 1,
    marginRight: Spacing.md,
  },
  categoryText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: 2,
  },
  modeText: {
    fontSize: Typography.fontSize.base,
    color: Colors.dark.textSecondary,
    fontWeight: Typography.fontWeight.semibold,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  questionInfo: {
    flex: 1,
  },
  questionCounter: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    marginBottom: 2,
  },
  progressText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.textSecondary,
    fontWeight: Typography.fontWeight.semibold,
  },
  progressContainer: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  motivationContainer: {
    alignItems: 'center',
  },
  motivationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.dark.primary}15`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${Colors.dark.primary}30`,
  },
  motivationText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.dark.primary,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: Spacing.xs,
  },
});
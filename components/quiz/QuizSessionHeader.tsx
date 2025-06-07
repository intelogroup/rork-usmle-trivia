import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Spacing } from '@/theme/spacing';
import QuestionProgressDots from './QuestionProgressDots';
import { Flag, Clock, Brain } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface QuizSessionHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  timeRemaining?: number;
  mode: string;
  categoryName?: string;
  flaggedQuestions?: number[];
}

export default function QuizSessionHeader({
  currentQuestion,
  totalQuestions,
  progress,
  timeRemaining,
  mode,
  categoryName,
  flaggedQuestions = [],
}: QuizSessionHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.background, `${Colors.dark.background}00`]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <Text style={styles.categoryName}>{categoryName}</Text>
            <View style={styles.progressInfo}>
              <Text style={styles.questionNumber}>
                Question {currentQuestion} of {totalQuestions}
              </Text>
              {flaggedQuestions.length > 0 && (
                <View style={styles.flaggedBadge}>
                  <Flag size={12} color={Colors.dark.primary} />
                  <Text style={styles.flaggedCount}>{flaggedQuestions.length}</Text>
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.rightSection}>
            <View style={styles.modeBadge}>
              {mode === 'timed' ? (
                <Clock size={14} color={Colors.dark.textSecondary} />
              ) : (
                <Brain size={14} color={Colors.dark.textSecondary} />
              )}
              <Text style={styles.modeText}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
            </View>
            
            {mode === 'timed' && timeRemaining !== undefined && (
              <View style={[
                styles.timerContainer,
                timeRemaining <= 10 && styles.timerWarning
              ]}>
                <Text style={[
                  styles.timer,
                  timeRemaining <= 10 && styles.timerWarningText
                ]}>
                  {formatTime(timeRemaining)}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${progress * 100}%` }
              ]} 
            />
          </View>
          <QuestionProgressDots
            totalQuestions={totalQuestions}
            currentIndex={currentQuestion - 1}
            correctAnswers={[]}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  gradient: {
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  categoryName: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.primary,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 2,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  questionNumber: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.textSecondary,
  },
  flaggedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.dark.primary}15`,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  flaggedCount: {
    ...Typography.styles.caption,
    color: Colors.dark.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardHighlight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
    gap: 4,
  },
  modeText: {
    ...Typography.styles.caption,
    color: Colors.dark.textSecondary,
  },
  timerContainer: {
    backgroundColor: Colors.dark.cardHighlight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  timerWarning: {
    backgroundColor: `${Colors.dark.error}15`,
    borderColor: Colors.dark.error,
  },
  timer: {
    ...Typography.styles.bodySmall,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  timerWarningText: {
    color: Colors.dark.error,
  },
  progressContainer: {
    gap: Spacing.xs,
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.dark.border,
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
    borderRadius: 1.5,
  },
});
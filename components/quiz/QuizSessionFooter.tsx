import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/theme/colors';
import Button from '@/components/Button';
import { ArrowRight, Check, Trophy, Flag, SkipForward } from 'lucide-react-native';
import { Spacing, Dimensions } from '@/theme/spacing';
import { LinearGradient } from 'expo-linear-gradient';

interface QuizSessionFooterProps {
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isQuestionFlagged?: boolean;
  onSubmit: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onFlag?: () => void;
  onSkip?: () => void;
}

export default function QuizSessionFooter({
  selectedAnswer,
  isAnswerSubmitted,
  canGoNext,
  canGoPrevious,
  isQuestionFlagged = false,
  onSubmit,
  onNext,
  onPrevious,
  onFlag,
  onSkip,
}: QuizSessionFooterProps) {
  const renderPrimaryButton = () => {
    if (!isAnswerSubmitted) {
      return (
        <Button
          title="Submit Answer"
          onPress={onSubmit}
          disabled={selectedAnswer === null}
          style={[styles.button, styles.primaryButton]}
          icon={<Check size={Dimensions.icon.sm} color={Colors.dark.background} />}
        />
      );
    }

    return (
      <Button
        title={canGoNext ? "Next Question" : "See Results"}
        onPress={onNext}
        style={[styles.button, styles.primaryButton]}
        icon={canGoNext ? 
          <ArrowRight size={Dimensions.icon.sm} color={Colors.dark.background} /> :
          <Trophy size={Dimensions.icon.sm} color={Colors.dark.background} />
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`${Colors.dark.background}00`, Colors.dark.background]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.actionButtons}>
            {onFlag && (
              <TouchableOpacity
                onPress={onFlag}
                style={[
                  styles.actionButton,
                  isQuestionFlagged && styles.actionButtonActive
                ]}
              >
                <Flag 
                  size={Dimensions.icon.sm} 
                  color={isQuestionFlagged ? Colors.dark.primary : Colors.dark.textSecondary} 
                />
              </TouchableOpacity>
            )}
            
            {!isAnswerSubmitted && onSkip && (
              <TouchableOpacity
                onPress={onSkip}
                style={styles.actionButton}
              >
                <SkipForward size={Dimensions.icon.sm} color={Colors.dark.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.buttonContainer}>
            {renderPrimaryButton()}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  gradient: {
    paddingTop: Spacing['2xl'],
    paddingBottom: Platform.OS === 'ios' ? Spacing['2xl'] : Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  actionButtonActive: {
    backgroundColor: `${Colors.dark.primary}15`,
    borderColor: Colors.dark.primary,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    paddingVertical: Spacing.lg,
    borderRadius: Dimensions.borderRadius.lg,
  },
  primaryButton: {
    backgroundColor: Colors.dark.primary,
    elevation: 4,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
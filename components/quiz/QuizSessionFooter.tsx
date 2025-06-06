import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import Button from '@/components/Button';
import { ArrowRight, ArrowLeft, Check, Zap, Trophy } from 'lucide-react-native';
import Spacing from '@/theme/spacing';

interface QuizSessionFooterProps {
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onSubmit: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function QuizSessionFooter({
  selectedAnswer,
  isAnswerSubmitted,
  canGoNext,
  canGoPrevious,
  onSubmit,
  onNext,
  onPrevious,
}: QuizSessionFooterProps) {
  const renderPrimaryButton = () => {
    if (!isAnswerSubmitted) {
      return (
        <Button
          title="Submit Answer ⚡"
          onPress={onSubmit}
          disabled={selectedAnswer === null}
          style={[styles.button, styles.primaryButton]}
        />
      );
    }

    return (
      <Button
        title={canGoNext ? "Next Question 🚀" : "See Results 🎉"}
        onPress={onNext}
        style={[styles.button, styles.primaryButton]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {renderPrimaryButton()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    elevation: 8,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
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
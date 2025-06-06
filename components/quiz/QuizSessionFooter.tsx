import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import Button from '@/components/Button';

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
          title="Submit Answer"
          onPress={onSubmit}
          disabled={selectedAnswer === -1}
          style={[styles.button, styles.primaryButton]}
        />
      );
    }

    return (
      <Button
        title={canGoNext ? "Next Question" : "Finish Quiz"}
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
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: Colors.dark.primary,
  },
});
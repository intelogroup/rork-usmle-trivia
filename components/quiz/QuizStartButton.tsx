import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import Button from '@/components/Button';
import { Play, Users, Hash, Clock } from 'lucide-react-native';

interface QuizStartButtonProps {
  onPress: () => void;
  disabled: boolean;
  selectedCategoriesCount: number;
  questionCount: number;
  availableQuestionCount?: number;
  isCheckingAvailability?: boolean;
}

export default function QuizStartButton({
  onPress,
  disabled,
  selectedCategoriesCount,
  questionCount,
  availableQuestionCount = 0,
  isCheckingAvailability = false,
}: QuizStartButtonProps) {
  const getButtonText = () => {
    if (isCheckingAvailability) {
      return 'Checking availability...';
    }
    if (disabled && availableQuestionCount === 0 && selectedCategoriesCount > 0) {
      return 'No questions available';
    }
    return 'Start Quiz';
  };

  const getButtonIcon = () => {
    if (isCheckingAvailability) {
      return <Clock size={18} color={Colors.dark.textSecondary} />;
    }
    return <Play size={18} color={disabled ? Colors.dark.textSecondary : Colors.dark.text} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Users size={16} color={Colors.dark.textSecondary} />
          <Text style={styles.summaryText}>
            {selectedCategoriesCount || 'All'} Categories
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Hash size={16} color={Colors.dark.textSecondary} />
          <Text style={styles.summaryText}>
            {questionCount} Questions
          </Text>
        </View>
        {availableQuestionCount > 0 && selectedCategoriesCount > 0 && (
          <View style={styles.summaryItem}>
            <Text style={styles.availableText}>
              {availableQuestionCount} available
            </Text>
          </View>
        )}
      </View>
      
      <Button
        title={getButtonText()}
        onPress={onPress}
        disabled={disabled}
        fullWidth
        icon={getButtonIcon()}
        iconPosition="left"
        style={[
          styles.startButton,
          disabled ? styles.disabledButton : null
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: Colors.dark.background,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    gap: 24,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  availableText: {
    fontSize: 12,
    color: Colors.dark.primary,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: Colors.dark.primary,
    height: 50,
  },
  disabledButton: {
    backgroundColor: Colors.dark.cardHighlight,
    opacity: 0.6,
  },
});
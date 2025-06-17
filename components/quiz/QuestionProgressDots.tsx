import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';

interface QuestionProgressDotsProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  answeredQuestions: boolean[];
}

export default function QuestionProgressDots({
  totalQuestions,
  currentQuestionIndex,
  answeredQuestions,
}: QuestionProgressDotsProps) {
  const maxDotsToShow = 10;
  const shouldShowSubset = totalQuestions > maxDotsToShow;
  
  if (shouldShowSubset) {
    // Show a subset of dots with current question in the middle
    const halfRange = Math.floor(maxDotsToShow / 2);
    let startIndex = Math.max(0, currentQuestionIndex - halfRange);
    let endIndex = Math.min(totalQuestions - 1, startIndex + maxDotsToShow - 1);
    
    // Adjust if we're near the end
    if (endIndex - startIndex < maxDotsToShow - 1) {
      startIndex = Math.max(0, endIndex - maxDotsToShow + 1);
    }
    
    const visibleIndices = Array.from(
      { length: endIndex - startIndex + 1 }, 
      (_, i) => startIndex + i
    );
    
    return (
      <View style={styles.container}>
        {startIndex > 0 && <View style={styles.ellipsis} />}
        {visibleIndices.map((index) => {
          const isCurrent = index === currentQuestionIndex;
          const isAnswered = answeredQuestions[index];
          
          return (
            <View
              key={index}
              style={[
                styles.dot,
                isCurrent && styles.currentDot,
                isAnswered && !isCurrent && styles.answeredDot,
              ]}
            />
          );
        })}
        {endIndex < totalQuestions - 1 && <View style={styles.ellipsis} />}
      </View>
    );
  }
  
  // Show all dots if total is manageable
  return (
    <View style={styles.container}>
      {Array.from({ length: totalQuestions }, (_, index) => {
        const isCurrent = index === currentQuestionIndex;
        const isAnswered = answeredQuestions[index];
        
        return (
          <View
            key={index}
            style={[
              styles.dot,
              isCurrent && styles.currentDot,
              isAnswered && !isCurrent && styles.answeredDot,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.border,
  },
  currentDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.dark.primary,
  },
  answeredDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.success,
  },
  ellipsis: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.dark.textSecondary,
    marginHorizontal: 2,
  },
});
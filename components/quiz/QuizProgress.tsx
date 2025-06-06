import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import ProgressBar from '@/components/ProgressBar';
import QuizTimer from './QuizTimer';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  timeRemaining?: number;
  isTimedMode?: boolean;
}

export default function QuizProgress({
  currentQuestion,
  totalQuestions,
  progress,
  timeRemaining,
  isTimedMode = false,
}: QuizProgressProps) {
  return (
    <View style={styles.container}>
      <View style={styles.progressHeader}>
        <ProgressBar progress={progress} style={styles.progressBar} />
        
        {isTimedMode && timeRemaining !== undefined && (
          <QuizTimer 
            timeRemaining={timeRemaining} 
            isWarning={timeRemaining <= 10}
          />
        )}
      </View>
      
      <Text style={styles.progressText}>
        Question {currentQuestion} of {totalQuestions}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
  },
  progressText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
});
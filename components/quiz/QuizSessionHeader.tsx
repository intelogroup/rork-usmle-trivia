import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/theme/colors';
import ProgressBar from '@/components/ProgressBar';
import QuizTimer from './QuizTimer';
import { X } from 'lucide-react-native';

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

  return (
    <View style={styles.container}>
      {/* Top Row: Category/Title and Close Button */}
      <View style={styles.topRow}>
        <View style={styles.titleSection}>
          {categoryName && (
            <Text style={styles.categoryText} numberOfLines={1}>
              {categoryName}
            </Text>
          )}
          <Text style={styles.modeText}>
            {mode === 'timed' ? 'Timed Quiz' : mode === 'practice' ? 'Practice Mode' : 'Standard Quiz'}
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
            Question {currentQuestion} of {totalQuestions}
          </Text>
          <Text style={styles.progressText}>
            {Math.round(progress * 100)}% Complete
          </Text>
        </View>
        
        {isTimedMode && timeRemaining !== undefined && (
          <QuizTimer 
            timeRemaining={timeRemaining} 
            isWarning={timeRemaining <= 10}
          />
        )}
      </View>
      
      {/* Progress Bar - Wrapped in View for styling */}
      <View style={styles.progressContainer}>
        <ProgressBar 
          progress={progress} 
          height={6} 
          fillColor={Colors.dark.primary}
          backgroundColor={Colors.dark.cardHighlight}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  modeText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    fontWeight: '500',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.dark.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionInfo: {
    flex: 1,
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  progressText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 4,
  },
});
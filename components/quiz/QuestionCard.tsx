import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/theme/colors';
import OptionButton from '@/components/OptionButton';
import { Flag, AlertCircle } from 'lucide-react-native';

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  onOptionPress: (index: number) => void;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onOptionPress,
}: QuestionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.questionHeader}>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.flagButton}>
          <Flag size={16} color={Colors.dark.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.questionText}>{question.question_text}</Text>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            label={option}
            index={index}
            selected={selectedAnswer === index}
            onPress={() => onOptionPress(index)}
            disabled={isAnswerSubmitted}
            isCorrect={
              isAnswerSubmitted
                ? index === question.correct_answer
                  ? true
                  : index === selectedAnswer
                  ? false
                  : null
                : null
            }
            showResult={isAnswerSubmitted}
          />
        ))}
      </View>
      
      {isAnswerSubmitted && question.explanation && (
        <View style={styles.explanationContainer}>
          <View style={styles.explanationHeader}>
            <AlertCircle size={20} color={Colors.dark.text} />
            <Text style={styles.explanationTitle}>Explanation</Text>
          </View>
          <Text style={styles.explanationText}>
            {question.explanation}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  difficultyBadge: {
    backgroundColor: Colors.dark.cardHighlight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.dark.textSecondary,
  },
  flagButton: {
    padding: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  explanationContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginLeft: 8,
  },
  explanationText: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 24,
  },
});
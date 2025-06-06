import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/theme/colors';
import { Sliders, Clock, Brain } from 'lucide-react-native';
import type { QuizMode } from '@/lib/types/quiz';

interface QuizSettingsProps {
  questionCount: number;
  onQuestionCountChange: (count: number) => void;
  quizMode: QuizMode;
  onQuizModeChange: (mode: QuizMode) => void;
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
  onDifficultyChange: (difficulty: 'all' | 'easy' | 'medium' | 'hard') => void;
}

export default function QuizSettings({
  questionCount,
  onQuestionCountChange,
  quizMode,
  onQuizModeChange,
  difficulty,
  onDifficultyChange,
}: QuizSettingsProps) {
  const questionCountOptions = [5, 10, 15, 20];
  const modeOptions: { value: QuizMode; label: string; icon: any }[] = [
    { value: 'standard', label: 'Standard', icon: Brain },
    { value: 'timed', label: 'Timed', icon: Clock },
    { value: 'practice', label: 'Practice', icon: Sliders },
  ];
  const difficultyOptions = [
    { value: 'all' as const, label: 'All Levels' },
    { value: 'easy' as const, label: 'Easy' },
    { value: 'medium' as const, label: 'Medium' },
    { value: 'hard' as const, label: 'Hard' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Sliders size={20} color={Colors.dark.text} />
        <Text style={styles.title}>Quiz Settings</Text>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Number of Questions</Text>
        <View style={styles.countSelector}>
          {questionCountOptions.map((count) => (
            <TouchableOpacity
              key={count}
              style={[
                styles.countButton,
                questionCount === count ? styles.selectedCountButton : null
              ]}
              onPress={() => onQuestionCountChange(count)}
            >
              <Text
                style={[
                  styles.countText,
                  questionCount === count ? styles.selectedCountText : null
                ]}
              >
                {count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Quiz Mode</Text>
        <View style={styles.modeSelector}>
          {modeOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.modeButton,
                  quizMode === option.value ? styles.selectedModeButton : null
                ]}
                onPress={() => onQuizModeChange(option.value)}
              >
                <IconComponent 
                  size={18} 
                  color={quizMode === option.value ? Colors.dark.text : Colors.dark.textSecondary} 
                />
                <Text
                  style={[
                    styles.modeText,
                    quizMode === option.value ? styles.selectedModeText : null
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Difficulty</Text>
        <View style={styles.difficultySelector}>
          {difficultyOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.difficultyButton,
                difficulty === option.value ? styles.selectedDifficultyButton : null
              ]}
              onPress={() => onDifficultyChange(option.value)}
            >
              <Text
                style={[
                  styles.difficultyText,
                  difficulty === option.value ? styles.selectedDifficultyText : null
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginLeft: 8,
  },
  settingItem: {
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 12,
  },
  countSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countButton: {
    width: 70,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.dark.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  selectedCountButton: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  countText: {
    fontSize: 16,
    color: Colors.dark.text,
  },
  selectedCountText: {
    fontWeight: '600',
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.dark.cardHighlight,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  selectedModeButton: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  modeText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginLeft: 6,
  },
  selectedModeText: {
    color: Colors.dark.text,
    fontWeight: '500',
  },
  difficultySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.dark.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  selectedDifficultyButton: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  difficultyText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  selectedDifficultyText: {
    color: Colors.dark.text,
    fontWeight: '500',
  },
});
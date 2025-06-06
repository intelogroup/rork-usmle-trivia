import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/theme/colors';
import { Lightbulb, BookOpen, Clock, Brain, Zap, Calendar, Users, FileText } from 'lucide-react-native';

export default function StudyTipsScreen() {
  const studyTips = [
    {
      id: '1',
      title: 'Spaced Repetition',
      description: 'Review high-yield concepts at increasing intervals to improve long-term retention. Start with daily reviews, then gradually increase to weekly and monthly.',
      icon: <Calendar size={24} color={Colors.dark.primary} />,
    },
    {
      id: '2',
      title: 'Active Recall',
      description: 'Test yourself frequently rather than passively reviewing notes. Create flashcards or practice questions to force your brain to retrieve information.',
      icon: <Brain size={24} color={Colors.dark.primary} />,
    },
    {
      id: '3',
      title: 'Pomodoro Technique',
      description: 'Study in focused 25-minute intervals with 5-minute breaks. After 4 intervals, take a longer 15-30 minute break. This helps maintain concentration and prevent burnout.',
      icon: <Clock size={24} color={Colors.dark.primary} />,
    },
    {
      id: '4',
      title: 'Feynman Technique',
      description: 'Explain complex concepts in simple terms as if teaching someone else. This helps identify gaps in your understanding and reinforces your knowledge.',
      icon: <FileText size={24} color={Colors.dark.primary} />,
    },
    {
      id: '5',
      title: 'Study Groups',
      description: 'Join or form a study group with peers. Teaching others and discussing concepts can deepen your understanding and expose you to different perspectives.',
      icon: <Users size={24} color={Colors.dark.primary} />,
    },
    {
      id: '6',
      title: 'Interleaved Practice',
      description: 'Mix different topics or subjects in a single study session rather than focusing on one area for an extended period. This improves your ability to discriminate between concepts.',
      icon: <Zap size={24} color={Colors.dark.primary} />,
    },
    {
      id: '7',
      title: 'Mnemonics',
      description: 'Create memory aids like acronyms or visual associations to remember complex information. The more unusual or vivid the mnemonic, the more memorable it will be.',
      icon: <BookOpen size={24} color={Colors.dark.primary} />,
    },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Study Tips',
          headerTintColor: Colors.dark.text,
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Lightbulb size={32} color={Colors.dark.primary} />
          </View>
          <Text style={styles.title}>Effective Study Techniques</Text>
          <Text style={styles.subtitle}>
            Evidence-based methods to maximize your USMLE preparation
          </Text>
        </View>
        
        {studyTips.map((tip) => (
          <View key={tip.id} style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              {tip.icon}
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
    maxWidth: '80%',
  },
  tipCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    lineHeight: 22,
  },
});
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import Colors from '@/theme/colors';

interface FullScreenLoaderProps {
  message?: string;
}

export default function FullScreenLoader({ 
  message = "Loading QuizMaster..." 
}: FullScreenLoaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <BookOpen size={48} color={Colors.dark.primary} />
        </View>
        
        <ActivityIndicator 
          size="large" 
          color={Colors.dark.primary} 
          style={styles.spinner}
        />
        
        <Text style={styles.text}>{message}</Text>
        
        <Text style={styles.subText}>
          Setting up your learning experience...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
    opacity: 0.8,
  },
  spinner: {
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    opacity: 0.7,
  },
});
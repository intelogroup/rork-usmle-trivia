import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/theme/colors';
import QuizIntroAnimation from '@/components/quiz/QuizIntroAnimation';

export default function QuizCountdownScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Get Ready',
          headerShown: false,
        }} 
      />
      <QuizIntroAnimation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});
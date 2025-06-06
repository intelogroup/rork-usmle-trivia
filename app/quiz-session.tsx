import React from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import QuizSessionContainer from '@/components/quiz/QuizSessionContainer';
import Colors from '@/theme/colors';

export default function QuizSessionScreen() {
  const params = useLocalSearchParams();
  
  const categoryId = params.categoryId as string;
  const categoriesParam = params.categories as string;
  const countParam = params.count as string;
  const modeParam = params.mode as string;
  const difficultyParam = params.difficulty as string;
  
  const categories = categoriesParam ? categoriesParam.split(',') : undefined;
  const count = countParam ? parseInt(countParam, 10) : 10;

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Quiz Session',
          headerBackTitle: 'Back',
          headerTintColor: Colors.dark.text,
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
        }} 
      />
      <QuizSessionContainer
        categoryId={categoryId}
        categories={categories}
        count={count}
        mode={modeParam}
        difficulty={difficultyParam}
      />
    </>
  );
}
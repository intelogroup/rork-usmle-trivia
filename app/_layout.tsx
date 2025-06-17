import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/auth/authStore';
import Colors from '@/theme/colors';
import { useAppInitializer } from '@/hooks/useAppInitializer';
import FullScreenLoader from '@/components/FullScreenLoader';
import ErrorState from '@/components/ErrorState';

// Main App Layout Component
function MainAppLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuthStore();

  // Log authentication state changes for debugging
  useEffect(() => {
    console.log('MainAppLayout: isAuthenticated =', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="login" />
            <Stack.Screen name="+not-found" />
          </>
        ) : (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="quiz-session" />
            <Stack.Screen name="quiz-results" />
            <Stack.Screen name="study-tips" />
            <Stack.Screen name="+not-found" />
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
}

// Root Layout Component
export default function RootLayout() {
  const { isLoading, error } = useAppInitializer();

  // Show loading screen during initialization
  if (isLoading) {
    return <FullScreenLoader />;
  }

  // Show error screen if initialization failed
  if (error) {
    return (
      <ErrorState 
        message={error.message} 
        onRetry={() => {
          // Force a complete app restart by reloading the page
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }} 
      />
    );
  }

  // Render main app when initialization is complete
  return <MainAppLayout />;
}
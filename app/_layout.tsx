import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect, useState, Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/auth/authStore';
import Colors from '@/theme/colors';
import { useAppInitializer } from '@/hooks/useAppInitializer';
import FullScreenLoader from '@/components/FullScreenLoader';
import ErrorState from '@/components/ErrorState';

// Error Boundary Component with proper error type handling
class ErrorBoundary extends Component<
  { children: React.ReactNode }, 
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: unknown): { hasError: boolean; error: Error | null } {
    console.error('ErrorBoundary caught error:', error);
    
    // Properly handle the error type with type guards
    let processedError: Error;
    if (error instanceof Error) {
      processedError = error;
    } else if (typeof error === 'string') {
      processedError = new Error(error);
    } else if (error && typeof error === 'object' && 'message' in error) {
      processedError = new Error(String(error.message));
    } else {
      processedError = new Error('An unexpected error occurred. Please restart the app.');
    }
    
    return { hasError: true, error: processedError };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Now we can safely access error.message because we know it's an Error
      const errorMessage = this.state.error.message;
      
      return (
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: Colors.dark.background,
          padding: 20 
        }}>
          <Text style={{ 
            color: Colors.dark.text, 
            fontSize: 18, 
            textAlign: 'center',
            marginBottom: 16 
          }}>
            Something went wrong
          </Text>
          <Text style={{ 
            color: Colors.dark.textSecondary, 
            fontSize: 14, 
            textAlign: 'center',
            marginBottom: 24
          }}>
            {errorMessage}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.dark.primary,
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
            }}
            onPress={() => {
              // Reset error state and attempt to recover
              this.setState({ hasError: false, error: null });
            }}
          >
            <Text style={{
              color: Colors.dark.background,
              fontSize: 16,
              fontWeight: '600',
            }}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

// Main App Layout Component
function MainAppLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuthStore();

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
  return (
    <ErrorBoundary>
      <MainAppLayout />
    </ErrorBoundary>
  );
}
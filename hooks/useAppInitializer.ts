import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useAuthStore } from '@/store/auth/authStore';

// Keep splash screen visible during initialization
SplashScreen.preventAutoHideAsync().catch(() => {
  console.warn('Failed to prevent splash screen auto-hide');
});

export function useAppInitializer() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { initialize } = useAuthStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Starting app initialization...');
        
        // Simple initialization without complex race conditions
        await initialize();
        
        console.log('App initialization completed successfully');
      } catch (initError: unknown) {
        const processedError = initError instanceof Error 
          ? initError 
          : new Error('App initialization failed');
        
        console.error('App initialization error:', processedError.message);
        setError(processedError);
      } finally {
        // Always complete loading and hide splash screen
        setIsLoading(false);
        
        try {
          await SplashScreen.hideAsync();
          console.log('Splash screen hidden successfully');
        } catch (splashError) {
          console.warn('Failed to hide splash screen:', splashError);
        }
      }
    };

    initializeApp();
  }, [initialize]);

  return { isLoading, error };
}
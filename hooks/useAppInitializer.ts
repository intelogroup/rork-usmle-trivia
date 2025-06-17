import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useAuthStore } from '@/store/auth/authStore';

// Keep splash screen visible during initialization
SplashScreen.preventAutoHideAsync().catch((error: unknown) => {
  let errorMessage = 'Unknown splash screen error';
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  console.warn('Failed to prevent splash screen auto-hide:', errorMessage);
});

export function useAppInitializer() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { initialize } = useAuthStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Starting app initialization...');
        
        // Set a reasonable timeout for the entire initialization process
        const initializationTimeout = new Promise<never>((_, reject) => {
          setTimeout(() => {
            reject(new Error('App initialization timed out. Please restart the app.'));
          }, 10000); // 10 second timeout
        });

        // Run initialization tasks
        const initializationTasks = async () => {
          try {
            // Initialize auth state (local auth is much faster)
            await initialize();
            
            console.log('App initialization completed successfully');
          } catch (taskError: unknown) {
            // Handle any errors from the initialization tasks
            if (taskError instanceof Error) {
              throw taskError;
            } else if (typeof taskError === 'string') {
              throw new Error(taskError);
            } else {
              throw new Error('An unexpected error occurred during app initialization');
            }
          }
        };

        // Race between initialization and timeout
        await Promise.race([initializationTasks(), initializationTimeout]);
        
      } catch (initError: unknown) {
        // Properly handle the error with type guards
        let processedError: Error;
        
        if (initError instanceof Error) {
          processedError = initError;
        } else if (typeof initError === 'string') {
          processedError = new Error(initError);
        } else {
          processedError = new Error('An unexpected error occurred during app startup. Please restart the app.');
        }
        
        console.error('App initialization failed:', processedError.message);
        setError(processedError);
      } finally {
        // Always hide splash screen and set loading to false
        setIsLoading(false);
        
        try {
          await SplashScreen.hideAsync();
          console.log('Splash screen hidden successfully');
        } catch (splashError: unknown) {
          let errorMessage = 'Unknown splash screen error';
          if (splashError instanceof Error) {
            errorMessage = splashError.message;
          } else if (typeof splashError === 'string') {
            errorMessage = splashError;
          }
          console.warn('Failed to hide splash screen:', errorMessage);
        }
      }
    };

    initializeApp();
  }, [initialize]);

  return { isLoading, error };
}
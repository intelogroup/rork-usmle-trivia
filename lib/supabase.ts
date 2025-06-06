import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import type { Database } from '@/lib/types/database';

const supabaseUrl = 'https://skqllgnfxnurcoezepqa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcWxsZ25meG51cmNvZXplcHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMzk2NDUsImV4cCI6MjA2NDYxNTY0NX0.RVMJKTxoGc9Xmk2M2y2lg25HY-uUu02SCxXtOurK8Qg';

// Create a custom storage adapter for React Native
const customStorage = {
  getItem: async (key: string) => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      }
      return AsyncStorage.getItem(key);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown storage error';
      console.error('Error in customStorage.getItem:', errorMessage);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
        return;
      }
      return AsyncStorage.setItem(key, value);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown storage error';
      console.error('Error in customStorage.setItem:', errorMessage);
    }
  },
  removeItem: async (key: string) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
        return;
      }
      return AsyncStorage.removeItem(key);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown storage error';
      console.error('Error in customStorage.removeItem:', errorMessage);
    }
  },
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: customStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
  },
  global: {
    headers: {
      'x-client-info': 'quiz-app-react-native',
    },
  },
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
});

// Enhanced connection test with better error handling
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    console.log('Testing Supabase connection...');
    
    // Simple connection test with timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Connection timeout')), 8000);
    });

    const testPromise = supabase
      .from('categories')
      .select('count', { count: 'exact', head: true });

    const { error } = await Promise.race([testPromise, timeoutPromise]) as any;
    
    if (error) {
      console.error('Supabase connection error:', error.message || error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (connectionError: unknown) {
    if (connectionError instanceof Error) {
      if (connectionError.message.includes('timeout')) {
        console.error('❌ Supabase connection timeout');
      } else if (connectionError.message.includes('network')) {
        console.error('❌ Supabase network error:', connectionError.message);
      } else {
        console.error('❌ Supabase connection failed:', connectionError.message);
      }
    } else {
      console.error('❌ Supabase connection failed with unknown error');
    }
    return false;
  }
}

// Enhanced auth verification
export async function verifyAuthConnection(): Promise<boolean> {
  try {
    console.log('Verifying auth connection...');
    
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Auth verification timeout')), 8000);
    });

    const authPromise = supabase.auth.getSession();
    
    const { error } = await Promise.race([authPromise, timeoutPromise]) as any;
    
    if (error) {
      console.error('Auth verification error:', error.message || error);
      return false;
    }
    
    console.log('✅ Supabase auth verification successful');
    return true;
  } catch (authError: unknown) {
    const errorMessage = authError instanceof Error ? authError.message : 'Unknown error';
    console.error('❌ Auth verification failed:', errorMessage);
    return false;
  }
}

// Initialize connection test on import (non-blocking)
setTimeout(() => {
  Promise.all([
    testSupabaseConnection(),
    verifyAuthConnection()
  ]).then(([dbConnection, authConnection]) => {
    if (dbConnection && authConnection) {
      console.log('🎉 All Supabase services verified successfully');
    } else {
      console.warn('⚠️ Some Supabase services may not be available - app will continue with fallback behavior');
    }
  }).catch((verificationError: unknown) => {
    const errorMessage = verificationError instanceof Error ? verificationError.message : 'Unknown verification error';
    console.error('Initial Supabase verification failed:', errorMessage);
    console.log('App will continue with fallback behavior');
  });
}, 2000);
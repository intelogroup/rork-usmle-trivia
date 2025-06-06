import { supabase } from '@/lib/supabase';

interface DatabaseTestResult {
  success: boolean;
  step: string;
  error?: string;
  data?: {
    categoriesCount: number;
    questionsCount: number;
    achievementsCount: number;
  };
}

export async function runDatabaseTests(): Promise<DatabaseTestResult> {
  try {
    // Test 1: Basic connection
    console.log('Testing basic Supabase connection...');
    const { error: connectionError } = await supabase
      .from('categories')
      .select('count', { count: 'exact', head: true });

    if (connectionError) {
      return {
        success: false,
        step: 'Basic Connection',
        error: connectionError.message || 'Failed to connect to database.',
      };
    }

    // Test 2: Categories table
    console.log('Testing categories table...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(5);

    if (categoriesError) {
      return {
        success: false,
        step: 'Categories Table',
        error: categoriesError.message || 'Failed to access categories table.',
      };
    }

    // Test 3: Questions table
    console.log('Testing questions table...');
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .limit(5);

    if (questionsError) {
      return {
        success: false,
        step: 'Questions Table',
        error: questionsError.message || 'Failed to access questions table.',
      };
    }

    // Test 4: Achievements table
    console.log('Testing achievements table...');
    const { data: achievements, error: achievementsError } = await supabase
      .from('achievements')
      .select('*')
      .limit(5);

    if (achievementsError) {
      return {
        success: false,
        step: 'Achievements Table',
        error: achievementsError.message || 'Failed to access achievements table.',
      };
    }

    // Test 5: Profiles table (if user is authenticated)
    console.log('Testing profiles table...');
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Profile might not exist yet, so we don't fail on this
      if (profileError && profileError.code !== 'PGRST116') {
        console.warn('Profile test warning:', profileError.message);
      }
    }

    return {
      success: true,
      step: 'All Tests Passed',
      data: {
        categoriesCount: categories?.length || 0,
        questionsCount: questions?.length || 0,
        achievementsCount: achievements?.length || 0,
      },
    };

  } catch (error) {
    return {
      success: false,
      step: 'Unexpected Error',
      error: error instanceof Error ? error.message : 'Unknown error occurred while testing database connection.',
    };
  }
}

export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const result = await runDatabaseTests();
    return result.success;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
}
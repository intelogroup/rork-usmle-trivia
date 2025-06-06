import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { UserProfile } from '@/lib/types/auth';

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  loadOrCreateProfile: (user: User) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      profile: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      clearError: () => {
        set({ error: null });
      },

      loadOrCreateProfile: async (user: User) => {
        try {
          console.log('Loading or creating profile for user:', user.id);
          
          // Try to load existing profile first
          const { data: existingProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (existingProfile && !fetchError) {
            console.log('Existing profile loaded successfully');
            set({ profile: existingProfile });
            return;
          }

          console.log('Creating new profile for user');
          // Create new profile if doesn't exist
          const newProfile: UserProfile = {
            id: user.id,
            username: user.user_metadata?.username || user.email?.split('@')[0] || 'User',
            level: 1,
            experience_points: 0,
            total_quizzes: 0,
            correct_answers: 0,
            current_streak: 0,
            best_streak: 0,
            total_study_time: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          try {
            const { data: createdProfile, error: createError } = await supabase
              .from('profiles')
              .insert([newProfile])
              .select()
              .single();

            if (createdProfile && !createError) {
              console.log('Profile created successfully in database');
              set({ profile: createdProfile });
            } else {
              console.warn('Failed to create profile in database, using local profile:', createError);
              set({ profile: newProfile });
            }
          } catch (dbError: unknown) {
            const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error';
            console.warn('Database profile creation failed, using local profile:', errorMessage);
            set({ profile: newProfile });
          }

        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error in profile creation';
          console.error('Profile load/create error, using fallback:', errorMessage);
          // Create fallback profile
          const fallbackProfile: UserProfile = {
            id: user.id,
            username: user.user_metadata?.username || user.email?.split('@')[0] || 'User',
            level: 1,
            experience_points: 0,
            total_quizzes: 0,
            correct_answers: 0,
            current_streak: 0,
            best_streak: 0,
            total_study_time: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          set({ profile: fallbackProfile });
        }
      },

      initialize: async () => {
        try {
          console.log('Initializing auth store...');
          set({ isLoading: true, error: null });
          
          // Get initial session with timeout
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Auth initialization timeout')), 10000);
          });

          const sessionPromise = supabase.auth.getSession();
          
          let sessionResult;
          try {
            sessionResult = await Promise.race([sessionPromise, timeoutPromise]);
          } catch (timeoutError: unknown) {
            const errorMessage = timeoutError instanceof Error ? timeoutError.message : 'Unknown timeout error';
            console.warn('Session fetch timed out, continuing without auth:', errorMessage);
            set({ isLoading: false, isAuthenticated: false, error: null });
            return;
          }

          const { data: { session }, error } = sessionResult as any;
          
          if (error) {
            console.error('Session error, continuing with fallback:', error);
            set({ isLoading: false, isAuthenticated: false, error: null });
            return;
          }

          if (session?.user) {
            console.log('User session found, setting authenticated state');
            // Set authenticated immediately with basic user data
            set({ 
              user: session.user, 
              session, 
              isLoading: false, 
              isAuthenticated: true,
              error: null
            });

            // Try to load or create profile in background
            setTimeout(async () => {
              try {
                await get().loadOrCreateProfile(session.user);
              } catch (profileError: unknown) {
                const errorMessage = profileError instanceof Error ? profileError.message : 'Unknown profile setup error';
                console.error('Background profile setup error:', errorMessage);
              }
            }, 100);

          } else {
            console.log('No user session found');
            set({ isLoading: false, isAuthenticated: false, error: null });
          }

          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            try {
              console.log('Auth state change:', event);
              
              if (event === 'SIGNED_IN' && session?.user) {
                console.log('User signed in, updating state');
                set({ 
                  user: session.user, 
                  session, 
                  isAuthenticated: true,
                  error: null
                });

                // Load or create profile in background
                setTimeout(async () => {
                  try {
                    await get().loadOrCreateProfile(session.user);
                  } catch (profileError: unknown) {
                    const errorMessage = profileError instanceof Error ? profileError.message : 'Unknown auth state change error';
                    console.error('Auth state change profile error:', errorMessage);
                  }
                }, 100);

              } else if (event === 'SIGNED_OUT') {
                console.log('User signed out, clearing state');
                set({ 
                  user: null, 
                  session: null, 
                  profile: null,
                  isAuthenticated: false,
                  error: null
                });
              }
            } catch (stateChangeError: unknown) {
              const errorMessage = stateChangeError instanceof Error ? stateChangeError.message : 'Unknown auth state change error';
              console.error('Auth state change error:', errorMessage);
            }
          });

        } catch (initError: unknown) {
          const errorMessage = initError instanceof Error ? initError.message : 'Failed to initialize auth';
          console.error('Auth initialization error:', errorMessage);
          set({ 
            isLoading: false, 
            isAuthenticated: false, 
            error: errorMessage
          });
          throw new Error(errorMessage);
        }
      },

      signIn: async (email: string, password: string) => {
        try {
          console.log('Attempting to sign in user:', email);
          set({ isLoading: true, error: null });
          
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Sign in timeout')), 15000);
          });

          const signInPromise = supabase.auth.signInWithPassword({
            email,
            password,
          });

          const { data, error } = await Promise.race([signInPromise, timeoutPromise]) as any;

          if (error) {
            console.error('Sign in error:', error);
            let errorMessage = 'Failed to sign in. Please try again.';
            
            switch (error.code || error.message) {
              case 'invalid_credentials':
              case 'Invalid login credentials':
                errorMessage = 'Invalid email or password. Please check your credentials and try again.';
                break;
              case 'user_not_found':
                errorMessage = 'No account found with this email. Please sign up first.';
                break;
              case 'too_many_requests':
                errorMessage = 'Too many login attempts. Please wait a moment and try again.';
                break;
              case 'network_error':
                errorMessage = 'Network error. Please check your internet connection and try again.';
                break;
              case 'email_not_confirmed':
                errorMessage = 'Please check your email and confirm your account before signing in.';
                break;
              default:
                if (error.message?.includes('timeout')) {
                  errorMessage = 'Sign in timed out. Please check your connection and try again.';
                } else if (error.message?.includes('network')) {
                  errorMessage = 'Network error. Please check your internet connection.';
                } else if (error.message) {
                  errorMessage = error.message;
                }
            }
            
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
          }

          if (data.user) {
            console.log('Sign in successful');
            set({ 
              user: data.user, 
              session: data.session, 
              isLoading: false, 
              isAuthenticated: true,
              error: null
            });

            // Load or create profile in background
            setTimeout(async () => {
              try {
                await get().loadOrCreateProfile(data.user);
              } catch (profileError: unknown) {
                const errorMessage = profileError instanceof Error ? profileError.message : 'Unknown profile setup error';
                console.error('Sign in profile setup error:', errorMessage);
              }
            }, 100);
          }
        } catch (signInError: unknown) {
          console.error('Sign in error:', signInError);
          let errorMessage = 'Failed to sign in. Please try again.';
          if (signInError instanceof Error) {
            errorMessage = signInError.message;
          }
          set({ 
            isLoading: false,
            error: errorMessage
          });
          throw signInError;
        }
      },

      login: async (email: string, password: string) => {
        return get().signIn(email, password);
      },

      signUp: async (email: string, password: string, username: string) => {
        try {
          console.log('Attempting to sign up user:', email);
          set({ isLoading: true, error: null });
          
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Sign up timeout')), 20000);
          });

          const signUpPromise = supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username,
              },
            },
          });

          const { data, error } = await Promise.race([signUpPromise, timeoutPromise]) as any;

          if (error) {
            console.error('Sign up error:', error);
            let errorMessage = 'Failed to create account. Please try again.';
            
            switch (error.code || error.message) {
              case 'user_already_exists':
              case 'User already registered':
                errorMessage = 'An account with this email already exists. Please sign in instead.';
                break;
              case 'invalid_email':
                errorMessage = 'Invalid email format. Please check your email address.';
                break;
              case 'weak_password':
                errorMessage = 'Password is too weak. Please use at least 6 characters with a mix of letters and numbers.';
                break;
              case 'signup_disabled':
                errorMessage = 'Account creation is currently disabled. Please try again later.';
                break;
              case 'network_error':
                errorMessage = 'Network error. Please check your internet connection and try again.';
                break;
              default:
                if (error.message?.includes('timeout')) {
                  errorMessage = 'Sign up timed out. Please check your connection and try again.';
                } else if (error.message?.includes('network')) {
                  errorMessage = 'Network error. Please check your internet connection.';
                } else if (error.message) {
                  errorMessage = error.message;
                }
            }
            
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
          }

          if (data.user) {
            console.log('Sign up successful');
            set({ 
              user: data.user, 
              session: data.session, 
              isLoading: false, 
              isAuthenticated: true,
              error: null
            });

            // Create profile in background
            setTimeout(async () => {
              try {
                await get().loadOrCreateProfile(data.user);
              } catch (profileError: unknown) {
                const errorMessage = profileError instanceof Error ? profileError.message : 'Unknown profile creation error';
                console.error('Sign up profile creation error:', errorMessage);
              }
            }, 100);
          }
        } catch (signUpError: unknown) {
          console.error('Sign up error:', signUpError);
          let errorMessage = 'Failed to sign up. Please try again.';
          if (signUpError instanceof Error) {
            errorMessage = signUpError.message;
          }
          set({ 
            isLoading: false,
            error: errorMessage
          });
          throw signUpError;
        }
      },

      register: async (email: string, password: string, username: string) => {
        return get().signUp(email, password, username);
      },

      logout: async () => {
        console.log('Attempting to sign out...');
        set({ isLoading: true });

        // Attempt to sign out from Supabase, but don't let it block state cleanup
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Error during Supabase signOut:', error.message);
        }

        // ALWAYS clear the local state to log the user out of the app
        set({
          user: null,
          session: null,
          profile: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });

        // Clear any cached data
        try {
          await AsyncStorage.multiRemove(['auth-storage', 'quiz-storage']);
          console.log('Local storage cleared successfully');
        } catch (storageError: unknown) {
          const errorMessage = storageError instanceof Error ? storageError.message : 'Unknown storage error';
          console.error('Storage cleanup error:', errorMessage);
        }

        console.log('Local auth state cleared.');
      },

      updateProfile: async (updates: Partial<UserProfile>) => {
        try {
          const { profile } = get();
          if (!profile) throw new Error('No profile found');

          console.log('Updating profile with:', updates);

          const updatedProfile = {
            ...updates,
            updated_at: new Date().toISOString(),
          };

          const { data, error } = await supabase
            .from('profiles')
            .update(updatedProfile)
            .eq('id', profile.id)
            .select()
            .single();

          if (error) throw error;

          console.log('Profile updated successfully');
          set({ profile: data, error: null });
        } catch (updateError: unknown) {
          const errorMessage = updateError instanceof Error ? updateError.message : 'Failed to update profile';
          console.error('Update profile error:', errorMessage);
          set({
            error: errorMessage
          });
          throw updateError;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
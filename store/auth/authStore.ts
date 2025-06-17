import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localAuth } from '@/lib/auth/localAuth';
import type { LocalUser, LocalSession, UserProfile } from '@/lib/types/auth';

interface AuthState {
  user: LocalUser | null;
  session: LocalSession | null;
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
  loadOrCreateProfile: (user: LocalUser) => Promise<void>;
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

      loadOrCreateProfile: async (user: LocalUser) => {
        try {
          console.log('Loading or creating profile for user:', user.id);
          
          // Try to load existing profile from local storage
          const profileKey = `profile_${user.id}`;
          const existingProfileData = await AsyncStorage.getItem(profileKey);

          if (existingProfileData) {
            const existingProfile = JSON.parse(existingProfileData);
            console.log('Existing profile loaded successfully');
            set({ profile: existingProfile });
            return;
          }

          console.log('Creating new profile for user');
          // Create new profile if doesn't exist
          const newProfile: UserProfile = {
            id: user.id,
            username: user.username,
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

          // Save profile to local storage
          await AsyncStorage.setItem(profileKey, JSON.stringify(newProfile));
          console.log('Profile created successfully in local storage');
          set({ profile: newProfile });

        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error in profile creation';
          console.error('Profile load/create error, using fallback:', errorMessage);
          // Create fallback profile
          const fallbackProfile: UserProfile = {
            id: user.id,
            username: user.username,
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
          
          // Get initial session
          const { session } = await localAuth.getSession();
          
          if (session?.user) {
            console.log('User session found, setting authenticated state');
            set({ 
              user: session.user, 
              session, 
              isLoading: false, 
              isAuthenticated: true,
              error: null
            });

            // Load or create profile in background
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

          // Listen for auth changes (simplified for local auth)
          localAuth.onAuthStateChange(async (event, session) => {
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
          
          const { user, session } = await localAuth.signIn(email, password);

          console.log('Sign in successful');
          set({ 
            user, 
            session, 
            isLoading: false, 
            isAuthenticated: true,
            error: null
          });

          // Load or create profile in background
          setTimeout(async () => {
            try {
              await get().loadOrCreateProfile(user);
            } catch (profileError: unknown) {
              const errorMessage = profileError instanceof Error ? profileError.message : 'Unknown profile setup error';
              console.error('Sign in profile setup error:', errorMessage);
            }
          }, 100);

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
          
          const { user, session } = await localAuth.signUp(email, password, username);

          console.log('Sign up successful');
          set({ 
            user, 
            session, 
            isLoading: false, 
            isAuthenticated: true,
            error: null
          });

          // Create profile in background
          setTimeout(async () => {
            try {
              await get().loadOrCreateProfile(user);
            } catch (profileError: unknown) {
              const errorMessage = profileError instanceof Error ? profileError.message : 'Unknown profile creation error';
              console.error('Sign up profile creation error:', errorMessage);
            }
          }, 100);

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

        try {
          await localAuth.signOut();
        } catch (signOutError: unknown) {
          const errorMessage = signOutError instanceof Error ? signOutError.message : 'Unknown sign out error';
          console.error('Local auth signOut failed:', errorMessage);
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

        console.log('Local auth state cleared - user should be redirected to login');
      },

      updateProfile: async (updates: Partial<UserProfile>) => {
        try {
          const { profile, user } = get();
          if (!profile || !user) throw new Error('No profile found');

          console.log('Updating profile with:', updates);

          const updatedProfile = {
            ...profile,
            ...updates,
            updated_at: new Date().toISOString(),
          };

          // Save to local storage
          const profileKey = `profile_${user.id}`;
          await AsyncStorage.setItem(profileKey, JSON.stringify(updatedProfile));

          console.log('Profile updated successfully');
          set({ profile: updatedProfile, error: null });
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
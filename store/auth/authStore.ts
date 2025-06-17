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
          
          const profileKey = `profile_${user.id}`;
          const existingProfileData = await AsyncStorage.getItem(profileKey);

          if (existingProfileData) {
            const existingProfile = JSON.parse(existingProfileData);
            console.log('Existing profile loaded');
            set({ profile: existingProfile });
            return;
          }

          console.log('Creating new profile');
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

          await AsyncStorage.setItem(profileKey, JSON.stringify(newProfile));
          console.log('Profile created successfully');
          set({ profile: newProfile });

        } catch (error: unknown) {
          console.error('Profile creation error:', error);
          // Create fallback profile without throwing
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
          
          const { session } = await localAuth.getSession();
          
          if (session?.user) {
            console.log('User session found');
            set({ 
              user: session.user, 
              session, 
              isAuthenticated: true,
              error: null
            });

            // Load profile synchronously to avoid hanging
            await get().loadOrCreateProfile(session.user);
          } else {
            console.log('No user session found');
            set({ isAuthenticated: false, error: null });
          }

          // Set up auth state listener
          localAuth.onAuthStateChange(async (event, session) => {
            console.log('Auth state change:', event);
            
            if (event === 'SIGNED_IN' && session?.user) {
              set({ 
                user: session.user, 
                session, 
                isAuthenticated: true,
                error: null
              });
              // Load profile in background
              get().loadOrCreateProfile(session.user).catch(console.error);
            } else if (event === 'SIGNED_OUT') {
              set({ 
                user: null, 
                session: null, 
                profile: null,
                isAuthenticated: false,
                error: null
              });
            }
          });

        } catch (initError: unknown) {
          const errorMessage = initError instanceof Error ? initError.message : 'Auth initialization failed';
          console.error('Auth initialization error:', errorMessage);
          set({ 
            isAuthenticated: false, 
            error: errorMessage
          });
        } finally {
          set({ isLoading: false });
        }
      },

      signIn: async (email: string, password: string) => {
        try {
          console.log('Signing in user:', email);
          set({ isLoading: true, error: null });
          
          const { user, session } = await localAuth.signIn(email, password);

          set({ 
            user, 
            session, 
            isAuthenticated: true,
            error: null
          });

          // Load profile in background
          get().loadOrCreateProfile(user).catch(console.error);

        } catch (signInError: unknown) {
          const errorMessage = signInError instanceof Error ? signInError.message : 'Sign in failed';
          console.error('Sign in error:', errorMessage);
          set({ error: errorMessage });
          throw signInError;
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (email: string, password: string) => {
        return get().signIn(email, password);
      },

      signUp: async (email: string, password: string, username: string) => {
        try {
          console.log('Signing up user:', email);
          set({ isLoading: true, error: null });
          
          const { user, session } = await localAuth.signUp(email, password, username);

          set({ 
            user, 
            session, 
            isAuthenticated: true,
            error: null
          });

          // Create profile in background
          get().loadOrCreateProfile(user).catch(console.error);

        } catch (signUpError: unknown) {
          const errorMessage = signUpError instanceof Error ? signUpError.message : 'Sign up failed';
          console.error('Sign up error:', errorMessage);
          set({ error: errorMessage });
          throw signUpError;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (email: string, password: string, username: string) => {
        return get().signUp(email, password, username);
      },

      logout: async () => {
        console.log('Signing out...');
        set({ isLoading: true });

        try {
          await localAuth.signOut();
        } catch (signOutError) {
          console.error('Sign out error:', signOutError);
        }

        // Always clear local state
        set({
          user: null,
          session: null,
          profile: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });

        // Clear cached data
        try {
          await AsyncStorage.multiRemove(['auth-storage', 'quiz-storage']);
        } catch (storageError) {
          console.error('Storage cleanup error:', storageError);
        }
      },

      updateProfile: async (updates: Partial<UserProfile>) => {
        try {
          const { profile, user } = get();
          if (!profile || !user) throw new Error('No profile found');

          const updatedProfile = {
            ...profile,
            ...updates,
            updated_at: new Date().toISOString(),
          };

          const profileKey = `profile_${user.id}`;
          await AsyncStorage.setItem(profileKey, JSON.stringify(updatedProfile));

          set({ profile: updatedProfile, error: null });
        } catch (updateError: unknown) {
          const errorMessage = updateError instanceof Error ? updateError.message : 'Profile update failed';
          console.error('Update profile error:', errorMessage);
          set({ error: errorMessage });
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
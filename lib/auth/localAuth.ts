import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export interface LocalUser {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

export interface LocalSession {
  user: LocalUser;
  access_token: string;
  expires_at: number;
}

class LocalAuthService {
  private storageKey = 'local-auth-users';
  private sessionKey = 'local-auth-session';

  private async getStorage() {
    if (Platform.OS === 'web') {
      return {
        getItem: (key: string) => localStorage.getItem(key),
        setItem: (key: string, value: string) => localStorage.setItem(key, value),
        removeItem: (key: string) => localStorage.removeItem(key),
      };
    }
    return AsyncStorage;
  }

  private async getUsers(): Promise<Record<string, LocalUser>> {
    try {
      const storage = await this.getStorage();
      const usersData = await storage.getItem(this.storageKey);
      return usersData ? JSON.parse(usersData) : {};
    } catch (error) {
      console.error('Error getting users:', error);
      return {};
    }
  }

  private async saveUsers(users: Record<string, LocalUser>): Promise<void> {
    try {
      const storage = await this.getStorage();
      await storage.setItem(this.storageKey, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private generateToken(): string {
    return 'local_token_' + Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  async signUp(email: string, password: string, username: string): Promise<{ user: LocalUser; session: LocalSession }> {
    const users = await this.getUsers();
    
    // Check if user already exists
    const existingUser = Object.values(users).find(user => user.email === email);
    if (existingUser) {
      throw new Error('User already registered');
    }

    // Validate inputs
    if (!email || !password || !username) {
      throw new Error('All fields are required');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Create new user
    const user: LocalUser = {
      id: this.generateId(),
      email,
      username,
      created_at: new Date().toISOString(),
    };

    // Save user with password (in real app, password would be hashed)
    users[user.id] = user;
    await this.saveUsers(users);

    // Save password separately (in real app, this would be hashed and stored securely)
    const storage = await this.getStorage();
    await storage.setItem(`password_${user.id}`, password);

    // Create session
    const session: LocalSession = {
      user,
      access_token: this.generateToken(),
      expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };

    // Save session
    await storage.setItem(this.sessionKey, JSON.stringify(session));

    return { user, session };
  }

  async signIn(email: string, password: string): Promise<{ user: LocalUser; session: LocalSession }> {
    const users = await this.getUsers();
    
    // Find user by email
    const user = Object.values(users).find(user => user.email === email);
    if (!user) {
      throw new Error('Invalid login credentials');
    }

    // Check password
    const storage = await this.getStorage();
    const storedPassword = await storage.getItem(`password_${user.id}`);
    if (storedPassword !== password) {
      throw new Error('Invalid login credentials');
    }

    // Create session
    const session: LocalSession = {
      user,
      access_token: this.generateToken(),
      expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };

    // Save session
    await storage.setItem(this.sessionKey, JSON.stringify(session));

    return { user, session };
  }

  async getSession(): Promise<{ session: LocalSession | null }> {
    try {
      const storage = await this.getStorage();
      const sessionData = await storage.getItem(this.sessionKey);
      
      if (!sessionData) {
        return { session: null };
      }

      const session: LocalSession = JSON.parse(sessionData);
      
      // Check if session is expired
      if (Date.now() > session.expires_at) {
        await this.signOut();
        return { session: null };
      }

      return { session };
    } catch (error) {
      console.error('Error getting session:', error);
      return { session: null };
    }
  }

  async signOut(): Promise<void> {
    try {
      const storage = await this.getStorage();
      await storage.removeItem(this.sessionKey);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // Auth state change listener (simplified)
  onAuthStateChange(callback: (event: string, session: LocalSession | null) => void) {
    // For simplicity, we'll just call the callback immediately with current session
    this.getSession().then(({ session }) => {
      callback(session ? 'SIGNED_IN' : 'SIGNED_OUT', session);
    });

    // Return unsubscribe function
    return () => {};
  }
}

export const localAuth = new LocalAuthService();
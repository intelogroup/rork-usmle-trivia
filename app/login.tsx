import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth/authStore';
import Colors from '@/theme/colors';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const { login, register, isLoading, error, clearError } = useAuthStore();

  const validateForm = () => {
    let isValid = true;
    
    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
    
    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    // Username validation (only for register)
    if (isRegisterMode) {
      if (!username) {
        setUsernameError('Username is required');
        isValid = false;
      } else if (username.length < 2) {
        setUsernameError('Username must be at least 2 characters');
        isValid = false;
      } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        setUsernameError('Username can only contain letters, numbers, and underscores');
        isValid = false;
      }
    }
    
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    // Clear any previous errors
    try {
      clearError();
    } catch (error) {
      console.error('Error clearing error state (silently bypassed):', error);
    }
    
    try {
      if (isRegisterMode) {
        await register(email, password, username);
        Alert.alert(
          'Account Created!', 
          'Your account has been created successfully. You can now start using the app.',
          [
            {
              text: 'Get Started',
              onPress: () => router.replace('/(tabs)'),
            }
          ]
        );
      } else {
        await login(email, password);
        router.replace('/(tabs)');
      }
    } catch (error) {
      // Error is handled by the store and displayed in UI
      console.error('Auth error (handled by store):', error);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    try {
      clearError();
    } catch (error) {
      console.error('Error clearing error state (silently bypassed):', error);
    }
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            {isRegisterMode ? (
              <UserPlus size={32} color={Colors.dark.primary} />
            ) : (
              <LogIn size={32} color={Colors.dark.primary} />
            )}
          </View>
          <Text style={styles.title}>
            {isRegisterMode ? 'Create Account' : 'Welcome Back'}
          </Text>
          <Text style={styles.subtitle}>
            {isRegisterMode 
              ? 'Sign up to start your learning journey' 
              : 'Sign in to continue your progress'
            }
          </Text>
        </View>

        <View style={styles.form}>
          {isRegisterMode && (
            <Input
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              error={usernameError}
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
          
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            error={passwordError}
            secureTextEntry
            autoCapitalize="none"
          />

          {error && (
            <View style={styles.errorContainer}>
              <View style={styles.errorHeader}>
                <AlertCircle size={16} color={Colors.dark.error} />
                <Text style={styles.errorTitle}>Authentication Error</Text>
              </View>
              <Text style={styles.errorText}>{error}</Text>
              {error.includes('network') && (
                <Text style={styles.errorHint}>
                  Please check your internet connection and try again.
                </Text>
              )}
              {error.includes('credentials') && (
                <Text style={styles.errorHint}>
                  Double-check your email and password are correct.
                </Text>
              )}
            </View>
          )}

          <Button
            title={isRegisterMode ? 'Create Account' : 'Sign In'}
            onPress={handleSubmit}
            loading={isLoading}
            fullWidth
            style={styles.submitButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={toggleMode} disabled={isLoading}>
            <Text style={[styles.footerLink, isLoading && styles.footerLinkDisabled]}>
              {isRegisterMode ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Help text */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            {isRegisterMode 
              ? 'By creating an account, you agree to our terms of service and privacy policy.'
              : 'Having trouble signing in? Make sure your email and password are correct.'
            }
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  submitButton: {
    marginTop: 8,
  },
  errorContainer: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.3)',
  },
  errorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  errorTitle: {
    color: Colors.dark.error,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  errorText: {
    color: Colors.dark.error,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  errorHint: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 16,
    color: Colors.dark.primary,
    fontWeight: '600',
  },
  footerLinkDisabled: {
    opacity: 0.5,
  },
  helpContainer: {
    alignItems: 'center',
  },
  helpText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
    opacity: 0.8,
  },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/theme/colors';
import { User, Star, Trophy } from 'lucide-react-native';

interface AuthPromptProps {
  isAuthenticated: boolean;
}

export default function AuthPrompt({ isAuthenticated }: AuthPromptProps) {
  const router = useRouter();

  if (isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <User size={24} color={Colors.dark.primary} />
          <Text style={styles.title}>Sign in for the full experience</Text>
        </View>
        
        <View style={styles.benefits}>
          <View style={styles.benefit}>
            <Star size={16} color={Colors.dark.warning} />
            <Text style={styles.benefitText}>Track your progress</Text>
          </View>
          <View style={styles.benefit}>
            <Trophy size={16} color={Colors.dark.success} />
            <Text style={styles.benefitText}>Earn achievements</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  content: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginLeft: 8,
  },
  benefits: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  benefitText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  signInButton: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  signInText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
});
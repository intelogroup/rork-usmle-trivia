import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertCircle, RefreshCw } from 'lucide-react-native';
import Colors from '@/theme/colors';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  title?: string;
}

export default function ErrorState({ 
  message, 
  onRetry, 
  title = "Something went wrong" 
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AlertCircle size={48} color={Colors.dark.error} />
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <Text style={styles.message}>{message}</Text>
      
      <TouchableOpacity
        style={styles.retryButton}
        onPress={onRetry}
        activeOpacity={0.8}
      >
        <RefreshCw size={20} color={Colors.dark.background} style={styles.retryIcon} />
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
      
      <Text style={styles.helpText}>
        If this problem persists, please check your internet connection and restart the app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  retryIcon: {
    marginRight: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.background,
  },
  helpText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    opacity: 0.7,
    maxWidth: 280,
    lineHeight: 20,
  },
});
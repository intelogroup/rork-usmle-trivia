import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/theme/colors';
import { RefreshCcw } from 'lucide-react-native';

interface ReviewCardProps {
  onReviewPress: () => void;
  incorrectCount: number;
  isLoading?: boolean;
}

export default function ReviewCard({ onReviewPress, incorrectCount, isLoading = false }: ReviewCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Mistakes</Text>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <RefreshCcw size={18} color={Colors.dark.secondary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>Revisit questions you got wrong</Text>
            {incorrectCount > 0 ? (
              <Text style={styles.subText}>{incorrectCount} question{incorrectCount !== 1 ? 's' : ''} available for review</Text>
            ) : (
              <Text style={styles.subText}>No questions available for review yet</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, incorrectCount === 0 && styles.disabledButton]}
          onPress={onReviewPress}
          disabled={isLoading || incorrectCount === 0}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Start Review'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  button: {
    backgroundColor: Colors.dark.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.dark.border,
  },
  buttonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
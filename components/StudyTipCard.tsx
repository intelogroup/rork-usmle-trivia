import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface StudyTipCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

export default function StudyTipCard({ title, description, onPress }: StudyTipCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <ChevronRight size={20} color={Colors.dark.textSecondary} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    lineHeight: 20,
    flex: 3,
    marginRight: 12,
  },
  icon: {
    marginLeft: 8,
  },
});
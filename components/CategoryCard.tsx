import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import { BookOpen } from 'lucide-react-native';

interface CategoryCardProps {
  title: string;
  count: number;
  selected?: boolean;
  onPress: () => void;
}

export default function CategoryCard({
  title,
  count,
  selected = false,
  onPress,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selectedCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, selected && styles.selectedIconContainer]}>
        <BookOpen size={24} color={selected ? Colors.dark.text : Colors.dark.textSecondary} />
      </View>
      <Text style={[styles.title, selected && styles.selectedText]}>
        {title}
      </Text>
      <Text style={[styles.count, selected && styles.selectedCountText]}>
        {count} questions
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.dark.border,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  selectedCard: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primaryLight,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  selectedIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  count: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    letterSpacing: 0.25,
  },
  selectedText: {
    color: Colors.dark.text,
  },
  selectedCountText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
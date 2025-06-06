import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/theme/colors';
import { Brain, Clock, Target, Layers } from 'lucide-react-native';

interface QuizPlaceholderProps {
  categoryId?: string;
  categories?: string[];
  count?: number;
  mode?: string;
  difficulty?: string;
}

export default function QuizPlaceholder({
  categoryId,
  categories,
  count = 10,
  mode = 'standard',
  difficulty = 'all',
}: QuizPlaceholderProps) {
  const getModeIcon = () => {
    switch (mode) {
      case 'timed':
        return <Clock size={20} color={Colors.dark.warning} />;
      case 'challenge':
        return <Target size={20} color={Colors.dark.error} />;
      default:
        return <Brain size={20} color={Colors.dark.primary} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {getModeIcon()}
        </View>
        <Text style={styles.title}>Quiz Session Active</Text>
        <Text style={styles.subtitle}>Placeholder Mode</Text>
      </View>
      
      <View style={styles.configContainer}>
        <Text style={styles.configTitle}>Session Configuration</Text>
        
        <View style={styles.configGrid}>
          <View style={styles.configItem}>
            <Layers size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.configLabel}>Categories</Text>
            <Text style={styles.configValue}>
              {categoryId ? '1 selected' : categories ? categories.length : '0'}
            </Text>
          </View>
          
          <View style={styles.configItem}>
            <Brain size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.configLabel}>Questions</Text>
            <Text style={styles.configValue}>{count}</Text>
          </View>
          
          <View style={styles.configItem}>
            <Clock size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.configLabel}>Mode</Text>
            <Text style={styles.configValue}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
          </View>
          
          <View style={styles.configItem}>
            <Target size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.configLabel}>Difficulty</Text>
            <Text style={styles.configValue}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle}>Development Status</Text>
        <Text style={styles.noteText}>
          This quiz interface is currently in placeholder mode. 
          The focus is on building authentication and core UI components. 
          Full quiz functionality will be implemented in a later phase.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  configContainer: {
    marginBottom: 20,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  configGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  configItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.dark.card,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  configLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    marginTop: 4,
    marginBottom: 2,
  },
  configValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  noteContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.info,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.info,
    marginBottom: 6,
  },
  noteText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    lineHeight: 16,
  },
});
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from '@/theme/colors';
import { Check, X } from 'lucide-react-native';

interface OptionButtonProps {
  label: string;
  index: number;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  isCorrect?: boolean | null;
  showResult?: boolean;
}

export default function OptionButton({
  label,
  index,
  selected,
  onPress,
  disabled = false,
  isCorrect = null,
  showResult = false,
}: OptionButtonProps) {
  const getOptionLabel = () => {
    const labels = ['A', 'B', 'C', 'D', 'E'];
    return labels[index] || String.fromCharCode(65 + index);
  };

  const getBackgroundColor = () => {
    if (!showResult) return selected ? Colors.dark.primary : Colors.dark.card;
    
    if (isCorrect === true) return Colors.dark.success;
    if (isCorrect === false) return Colors.dark.error;
    return Colors.dark.card;
  };

  const getBorderColor = () => {
    if (!showResult) return selected ? Colors.dark.primary : Colors.dark.border;
    
    if (isCorrect === true) return Colors.dark.success;
    if (isCorrect === false) return Colors.dark.error;
    return Colors.dark.border;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor(), borderColor: getBorderColor() }
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.labelContainer}>
        <View style={[
          styles.indexBadge,
          selected && !showResult ? styles.selectedIndexBadge : null,
          isCorrect === true ? styles.correctIndexBadge : null,
          isCorrect === false ? styles.incorrectIndexBadge : null,
        ]}>
          <Text style={[
            styles.indexText,
            selected && !showResult ? styles.selectedIndexText : null,
            isCorrect !== null ? styles.resultIndexText : null,
          ]}>
            {getOptionLabel()}
          </Text>
        </View>
        <Text style={[
          styles.labelText,
          selected && !showResult ? styles.selectedLabelText : null,
          isCorrect !== null ? styles.resultLabelText : null,
        ]}>
          {label}
        </Text>
      </View>
      
      {showResult && isCorrect !== null && (
        <View style={styles.resultIcon}>
          {isCorrect ? (
            <Check size={20} color={Colors.dark.text} />
          ) : (
            <X size={20} color={Colors.dark.text} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  indexBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedIndexBadge: {
    backgroundColor: Colors.dark.text,
  },
  correctIndexBadge: {
    backgroundColor: Colors.dark.text,
  },
  incorrectIndexBadge: {
    backgroundColor: Colors.dark.text,
  },
  indexText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  selectedIndexText: {
    color: Colors.dark.primary,
  },
  resultIndexText: {
    color: Colors.dark.card,
  },
  labelText: {
    fontSize: 16,
    color: Colors.dark.text,
    flex: 1,
  },
  selectedLabelText: {
    color: Colors.dark.text,
    fontWeight: '500',
  },
  resultLabelText: {
    color: Colors.dark.text,
    fontWeight: '500',
  },
  resultIcon: {
    marginLeft: 8,
  },
});
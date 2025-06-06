import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated, Platform } from 'react-native';
import Colors from '@/theme/colors';
import { Check, X, Zap } from 'lucide-react-native';

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
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showResult && Platform.OS !== 'web') {
      if (isCorrect === true) {
        // Correct answer glow animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: false,
            }),
            Animated.timing(glowAnim, {
              toValue: 0.3,
              duration: 800,
              useNativeDriver: false,
            }),
          ])
        ).start();
      } else if (isCorrect === false && selected) {
        // Incorrect answer shake animation
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      }
    } else {
      glowAnim.setValue(0);
      shakeAnim.setValue(0);
    }
  }, [showResult, isCorrect, selected]);

  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
    onPress();
  };

  const getOptionLabel = () => {
    const labels = ['A', 'B', 'C', 'D', 'E'];
    return labels[index] || String.fromCharCode(65 + index);
  };

  const getBackgroundColor = () => {
    if (!showResult) return selected ? Colors.dark.primary : Colors.dark.card;
    
    if (isCorrect === true) return Colors.dark.success;
    if (isCorrect === false && selected) return Colors.dark.error;
    return Colors.dark.card;
  };

  const getBorderColor = () => {
    if (!showResult) return selected ? Colors.dark.primary : Colors.dark.border;
    
    if (isCorrect === true) return Colors.dark.success;
    if (isCorrect === false && selected) return Colors.dark.error;
    return Colors.dark.border;
  };

  const getBorderWidth = () => {
    if (showResult && isCorrect === true) return 3;
    if (showResult && isCorrect === false && selected) return 3;
    return selected ? 2 : 1;
  };

  const getGlowStyle = () => {
    if (showResult && isCorrect === true && Platform.OS !== 'web') {
      return {
        shadowColor: Colors.dark.success,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: glowAnim,
        shadowRadius: 12,
        elevation: 8,
      };
    }
    return {};
  };

  return (
    <Animated.View
      style={[
        {
          transform: [
            { scale: scaleAnim },
            { translateX: shakeAnim }
          ],
        },
        getGlowStyle(),
      ]}
    >
      <TouchableOpacity
        style={[
          styles.container,
          { 
            backgroundColor: getBackgroundColor(), 
            borderColor: getBorderColor(),
            borderWidth: getBorderWidth(),
          }
        ]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <View style={styles.labelContainer}>
          <View style={[
            styles.indexBadge,
            selected && !showResult ? styles.selectedIndexBadge : null,
            isCorrect === true ? styles.correctIndexBadge : null,
            isCorrect === false && selected ? styles.incorrectIndexBadge : null,
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
              <View style={styles.correctIcon}>
                <Check size={20} color={Colors.dark.background} />
              </View>
            ) : selected ? (
              <View style={styles.incorrectIcon}>
                <X size={20} color={Colors.dark.background} />
              </View>
            ) : null}
          </View>
        )}

        {selected && !showResult && (
          <View style={styles.selectedIndicator}>
            <Zap size={16} color={Colors.dark.background} fill={Colors.dark.background} />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    minHeight: 64,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  indexBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  selectedIndexBadge: {
    backgroundColor: Colors.dark.background,
  },
  correctIndexBadge: {
    backgroundColor: Colors.dark.background,
  },
  incorrectIndexBadge: {
    backgroundColor: Colors.dark.background,
  },
  indexText: {
    fontSize: 16,
    fontWeight: '700',
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
    lineHeight: 22,
  },
  selectedLabelText: {
    color: Colors.dark.background,
    fontWeight: '600',
  },
  resultLabelText: {
    color: Colors.dark.background,
    fontWeight: '600',
  },
  resultIcon: {
    marginLeft: 12,
  },
  correctIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incorrectIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIndicator: {
    marginLeft: 12,
  },
});
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Dimensions, Spacing } from '@/theme/spacing';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OptionButtonProps {
  label: string;
  index: number;
  selected: boolean;
  onPress: () => void;
  disabled: boolean;
  isCorrect: boolean | null;
  showResult: boolean;
}

export default function OptionButton({
  label,
  index,
  selected,
  onPress,
  disabled,
  isCorrect,
  showResult,
}: OptionButtonProps) {
  const animatedBorder = useRef(new Animated.Value(selected ? 1 : 0)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selected && !showResult) {
      Animated.timing(animatedBorder, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else if (!selected && !showResult) {
      Animated.timing(animatedBorder, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [selected, showResult]);

  useEffect(() => {
    if (showResult && isCorrect !== null) {
      // Show icon
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Show background gradient
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      if (isCorrect) {
        // Correct answer - pulse animation
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        if (Platform.OS !== 'web') {
          Animated.loop(
            Animated.sequence([
              Animated.timing(pulseAnimation, {
                toValue: 1.05,
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(pulseAnimation, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }),
            ]),
            { iterations: 3 }
          ).start();
        }
      } else if (selected) {
        // Incorrect answer - shake animation
        if (Platform.OS !== 'web') {
          Animated.sequence([
            Animated.timing(shakeAnimation, {
              toValue: 10,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
              toValue: -10,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
              toValue: 10,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
      }

      // Fade out non-relevant options
      if (!isCorrect && !selected) {
        Animated.timing(animatedOpacity, {
          toValue: 0.4,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    } else {
      // Reset animations
      iconOpacity.setValue(0);
      backgroundOpacity.setValue(0);
      animatedOpacity.setValue(1);
      shakeAnimation.setValue(0);
      pulseAnimation.setValue(1);
    }
  }, [showResult, isCorrect, selected]);

  const borderColor = animatedBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.dark.border, Colors.dark.primary],
  });

  const borderWidth = animatedBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const getGradientColors = () => {
    if (showResult && isCorrect !== null) {
      if (isCorrect) {
        return [Colors.dark.success, `${Colors.dark.success}CC`] as const;
      } else if (selected) {
        return [Colors.dark.error, `${Colors.dark.error}CC`] as const;
      }
    }
    return ['transparent', 'transparent'] as const;
  };

  const getIconColor = () => {
    if (showResult && isCorrect !== null) {
      return Colors.dark.background;
    }
    return Colors.dark.text;
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { 
          opacity: animatedOpacity,
          transform: Platform.OS !== 'web' ? [
            { translateX: shakeAnimation }, 
            { scale: pulseAnimation }
          ] : [],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          { 
            borderColor, 
            borderWidth,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.gradientContainer, { opacity: backgroundOpacity }]}>
          <LinearGradient
            colors={getGradientColors()}
            style={styles.gradientBackground}
          />
        </Animated.View>
        
        <Text style={[
          styles.label,
          showResult && isCorrect && styles.correctLabel,
          showResult && selected && !isCorrect && styles.incorrectLabel,
        ]}>
          {label}
        </Text>
        
        <Animated.View style={[styles.iconContainer, { opacity: iconOpacity }]}>
          {showResult && isCorrect !== null && (
            <>
              {isCorrect ? (
                <CheckCircle size={Dimensions.icon.sm} color={getIconColor()} />
              ) : selected ? (
                <XCircle size={Dimensions.icon.sm} color={getIconColor()} />
              ) : null}
            </>
          )}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm,
    borderRadius: Dimensions.borderRadius.md,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: Colors.dark.cardHighlight,
    padding: Spacing.lg,
    borderRadius: Dimensions.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: Dimensions.touchTarget.medium,
    position: 'relative',
    overflow: 'hidden',
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  label: {
    ...Typography.styles.body,
    color: Colors.dark.text,
    flex: 1,
    zIndex: 1,
  },
  correctLabel: {
    color: Colors.dark.background,
    fontWeight: Typography.fontWeight.semibold,
  },
  incorrectLabel: {
    color: Colors.dark.background,
  },
  iconContainer: {
    marginLeft: Spacing.sm,
    zIndex: 1,
  },
});
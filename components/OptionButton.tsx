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
  const animatedOpacity = useRef(new Animated.Value(showResult ? 0.5 : 1)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selected) {
      Animated.timing(animatedBorder, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedBorder, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [selected]);

  useEffect(() => {
    if (showResult && isCorrect !== null) {
      if (!isCorrect) {
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
        Animated.timing(animatedOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
        if (Platform.OS !== 'web') {
          Animated.loop(
            Animated.sequence([
              Animated.timing(pulseAnimation, {
                toValue: 1.1,
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
      }
    }
  }, [showResult, isCorrect]);

  const borderColor = animatedBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.dark.border, Colors.dark.primary],
  });

  const borderWidth = animatedBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const getBackground = () => {
    if (showResult && isCorrect !== null) {
      if (isCorrect) {
        return (
          <LinearGradient
            colors={[Colors.dark.success, `${Colors.dark.success}CC`]}
            style={styles.gradientBackground}
          />
        );
      } else if (selected) {
        return (
          <LinearGradient
            colors={[Colors.dark.error, `${Colors.dark.error}CC`]}
            style={styles.gradientBackground}
          />
        );
      }
    }
    return null;
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: animatedOpacity },
        showResult && !isCorrect && selected && { borderColor: Colors.dark.error, borderWidth: 2 },
        showResult && isCorrect && { borderColor: Colors.dark.success, borderWidth: 2 },
        Platform.OS !== 'web' && { transform: [{ translateX: shakeAnimation }, { scale: pulseAnimation }] },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          { borderColor, borderWidth },
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {getBackground()}
        <Text style={styles.label}>{label}</Text>
        {showResult && isCorrect !== null && (
          <View style={styles.iconContainer}>
            {isCorrect ? (
              <CheckCircle size={Dimensions.icon.sm} color={Colors.dark.background} />
            ) : selected ? (
              <XCircle size={Dimensions.icon.sm} color={Colors.dark.background} />
            ) : null}
          </View>
        )}
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
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  label: {
    ...Typography.styles.body,
    color: Colors.dark.text,
    flex: 1,
  },
  iconContainer: {
    marginLeft: Spacing.sm,
  },
});
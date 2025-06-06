import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import Spacing from '@/theme/spacing';
import { Zap } from 'lucide-react-native';

export default function QuizIntroAnimation() {
  const router = useRouter();
  const animValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const currentNumber = useRef(3);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      startCountdown();
    } else {
      // Web fallback: directly navigate after a short delay
      setTimeout(() => {
        router.push('/quiz-session');
      }, 1500);
    }
  }, []);

  const startCountdown = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(animValue, {
          toValue: 1.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(animValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      if (currentNumber.current > 1) {
        currentNumber.current -= 1;
        animValue.setValue(0);
        opacityValue.setValue(0);
        startCountdown();
      } else if (currentNumber.current === 1) {
        currentNumber.current = 0; // Show "Go!"
        animValue.setValue(0);
        opacityValue.setValue(0);
        Animated.parallel([
          Animated.timing(animValue, {
            toValue: 1.5,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start(() => {
          router.push('/quiz-session');
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.countdownContainer,
          {
            transform: [{ scale: animValue }],
            opacity: opacityValue,
          },
        ]}
      >
        <Text style={styles.countdownText}>
          {currentNumber.current > 0 ? currentNumber.current : 'Go!'}
        </Text>
        {currentNumber.current === 0 && (
          <Zap size={48} color={Colors.dark.primary} style={styles.goIcon} />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.primary,
    textAlign: 'center',
  },
  goIcon: {
    marginTop: Spacing.md,
  },
});
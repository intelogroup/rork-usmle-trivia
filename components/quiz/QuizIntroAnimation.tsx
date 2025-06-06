import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Spacing } from '@/theme/spacing';
import { Zap, Target, Brain } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function QuizIntroAnimation() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const animValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.3)).current;
  const currentNumber = useRef(3);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      startCountdown();
    } else {
      // Web fallback: directly navigate after a short delay
      setTimeout(() => {
        navigateToQuizSession();
      }, 1500);
    }
  }, []);

  const navigateToQuizSession = () => {
    // Pass through all the quiz parameters
    router.replace({
      pathname: '/quiz-session',
      params: params,
    });
  };

  const startCountdown = () => {
    Animated.parallel([
      Animated.spring(animValue, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1.2,
        tension: 80,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Hold for a moment
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacityValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (currentNumber.current > 1) {
            currentNumber.current -= 1;
            animValue.setValue(0);
            opacityValue.setValue(0);
            scaleValue.setValue(0.3);
            startCountdown();
          } else if (currentNumber.current === 1) {
            currentNumber.current = 0; // Show "Go!"
            animValue.setValue(0);
            opacityValue.setValue(0);
            scaleValue.setValue(0.3);
            showGoAnimation();
          }
        });
      }, 600);
    });
  };

  const showGoAnimation = () => {
    Animated.parallel([
      Animated.spring(animValue, {
        toValue: 1,
        tension: 120,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1.5,
        tension: 100,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigateToQuizSession();
      }, 800);
    });
  };

  const getCountdownContent = () => {
    if (currentNumber.current > 0) {
      return (
        <>
          <Text style={styles.countdownNumber}>{currentNumber.current}</Text>
          <Text style={styles.countdownSubtext}>Get ready...</Text>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.goIconContainer}>
            <Zap size={48} color={Colors.dark.primary} fill={Colors.dark.primary} />
          </View>
          <Text style={styles.goText}>Go!</Text>
          <Text style={styles.goSubtext}>Show what you know!</Text>
        </>
      );
    }
  };

  return (
    <LinearGradient
      colors={[Colors.dark.background, `${Colors.dark.primary}15`]}
      style={styles.container}
    >
      <View style={styles.backgroundElements}>
        <View style={styles.floatingIcon1}>
          <Target size={24} color={`${Colors.dark.primary}30`} />
        </View>
        <View style={styles.floatingIcon2}>
          <Brain size={32} color={`${Colors.dark.secondary}20`} />
        </View>
        <View style={styles.floatingIcon3}>
          <Zap size={20} color={`${Colors.dark.primary}25`} />
        </View>
      </View>

      <Animated.View
        style={[
          styles.countdownContainer,
          {
            opacity: opacityValue,
            transform: [
              { scale: scaleValue },
              { 
                rotateY: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })
              }
            ],
          },
        ]}
      >
        <View style={styles.countdownContent}>
          {getCountdownContent()}
        </View>
      </Animated.View>

      <View style={styles.motivationContainer}>
        <Text style={styles.motivationText}>Focus. Think. Succeed.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingIcon1: {
    position: 'absolute',
    top: '20%',
    left: '15%',
  },
  floatingIcon2: {
    position: 'absolute',
    top: '30%',
    right: '20%',
  },
  floatingIcon3: {
    position: 'absolute',
    bottom: '25%',
    left: '25%',
  },
  countdownContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 100,
    width: 180,
    height: 180,
    elevation: 12,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  countdownNumber: {
    fontSize: Typography.fontSize['5xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.primary,
    textAlign: 'center',
  },
  countdownSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  goIconContainer: {
    marginBottom: Spacing.sm,
  },
  goText: {
    fontSize: Typography.fontSize['5xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark.primary,
    textAlign: 'center',
  },
  goSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  motivationContainer: {
    position: 'absolute',
    bottom: '15%',
    alignItems: 'center',
  },
  motivationText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.dark.text,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.semibold,
    opacity: 0.8,
  },
});
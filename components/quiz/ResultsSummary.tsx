import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Spacing, Dimensions } from '@/theme/spacing';
import { Trophy, Star, Target } from 'lucide-react-native';

interface ResultsSummaryProps {
  score: number;
  totalQuestions: number;
  percentage: number;
}

export default function ResultsSummary({ score, totalQuestions, percentage }: ResultsSummaryProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS !== 'web') {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 80,
            friction: 6,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(progressAnim, {
          toValue: percentage,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(iconRotateAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(1);
      scaleAnim.setValue(1);
      progressAnim.setValue(percentage);
      iconRotateAnim.setValue(1);
    }
  }, [percentage]);

  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: 'Excellent', icon: Trophy, color: Colors.dark.success };
    if (percentage >= 80) return { level: 'Great', icon: Star, color: Colors.dark.primary };
    if (percentage >= 70) return { level: 'Good', icon: Target, color: Colors.dark.secondary };
    return { level: 'Keep Learning', icon: Target, color: Colors.dark.textSecondary };
  };

  const performance = getPerformanceLevel();
  const IconComponent = performance.icon;

  const iconRotation = iconRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.circleContainer}>
        <View style={styles.progressCircle}>
          {/* Background circle */}
          <View style={[styles.circle, styles.backgroundCircle]} />
          
          {/* Progress circle - simplified for web compatibility */}
          <View style={[styles.circle, { borderColor: performance.color }]} />
          
          {/* Center content */}
          <View style={styles.centerContent}>
            <Animated.View
              style={[
                styles.iconContainer,
                Platform.OS !== 'web' ? { transform: [{ rotate: iconRotation }] } : {},
              ]}
            >
              <IconComponent size={Dimensions.icon.lg} color={performance.color} />
            </Animated.View>
            <Text style={[styles.percentageText, { color: performance.color }]}>
              {Math.round(percentage)}%
            </Text>
            <Text style={styles.scoreText}>
              {score} / {totalQuestions}
            </Text>
            <Text style={[styles.levelText, { color: performance.color }]}>
              {performance.level}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing['2xl'],
  },
  circleContainer: {
    position: 'relative',
    width: 200,
    height: 200,
  },
  progressCircle: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
  },
  backgroundCircle: {
    borderColor: Colors.dark.border,
  },
  centerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: Spacing.xs,
  },
  percentageText: {
    ...Typography.styles.h1,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 2,
  },
  scoreText: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.xs,
  },
  levelText: {
    ...Typography.styles.bodySmall,
    fontWeight: Typography.fontWeight.semibold,
  },
});
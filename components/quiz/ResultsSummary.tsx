import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { Circle, Svg, Text as SvgText } from 'react-native-svg';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Spacing, Dimensions } from '@/theme/spacing';

interface ResultsSummaryProps {
  score: number;
  totalQuestions: number;
  percentage: number;
}

export default function ResultsSummary({ score, totalQuestions, percentage }: ResultsSummaryProps) {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS !== 'web') {
      Animated.timing(animatedProgress, {
        toValue: percentage,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    } else {
      animatedProgress.setValue(percentage);
    }
  }, [percentage]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={220} height={220} viewBox="0 0 220 220">
        <Circle
          cx="110"
          cy="110"
          r="90"
          stroke={Colors.dark.border}
          strokeWidth="12"
          fill="none"
        />
        <AnimatedCircle
          cx="110"
          cy="110"
          r="90"
          stroke={Colors.dark.primary}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 110 110)" // Start from the top
        />
        <SvgText
          x="110"
          y="110"
          textAnchor="middle"
          dy=".35em"
          fontSize={Typography.fontSize['5xl']}
          fontWeight={Typography.fontWeight.bold}
          fill={Colors.dark.text}
        >
          {`${Math.round(percentage)}%`}
        </SvgText>
        <SvgText
          x="110"
          y="140"
          textAnchor="middle"
          fontSize={Typography.fontSize.base}
          fill={Colors.dark.textSecondary}
        >
          {`${score} / ${totalQuestions} Correct`}
        </SvgText>
      </Svg>
    </View>
  );
}

// Animated Circle component for web compatibility
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
});
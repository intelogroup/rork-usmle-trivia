import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/theme/colors';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  borderRadius?: number;
  showPercentage?: boolean;
  style?: ViewStyle; // Add style prop support
}

export default function ProgressBar({
  progress,
  height = 8,
  backgroundColor = Colors.dark.cardHighlight,
  fillColor = Colors.dark.primary,
  borderRadius = 4,
  showPercentage = false,
  style,
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor,
          borderRadius,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.progress,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: fillColor,
            borderRadius,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});
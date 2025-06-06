import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Colors from '@/theme/colors';
import { Clock, AlertTriangle } from 'lucide-react-native';

interface QuizTimerProps {
  timeRemaining: number;
  isWarning?: boolean;
}

export default function QuizTimer({ timeRemaining, isWarning = false }: QuizTimerProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (timeRemaining <= 10) {
      // Start pulsing animation when time is low
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      return () => pulse.stop();
    } else {
      // Reset animation when time is not critical
      pulseAnim.setValue(1);
    }
  }, [timeRemaining, pulseAnim]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 5) return Colors.dark.error;
    if (timeRemaining <= 10) return Colors.dark.warning;
    return Colors.dark.text;
  };

  const getBackgroundColor = () => {
    if (timeRemaining <= 5) return 'rgba(239, 68, 68, 0.15)';
    if (timeRemaining <= 10) return 'rgba(245, 158, 11, 0.15)';
    return Colors.dark.card;
  };

  const getBorderColor = () => {
    if (timeRemaining <= 5) return Colors.dark.error;
    if (timeRemaining <= 10) return Colors.dark.warning;
    return 'transparent';
  };

  const IconComponent = timeRemaining <= 5 ? AlertTriangle : Clock;

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: timeRemaining <= 10 ? 1 : 0,
          transform: [{ scale: pulseAnim }],
        }
      ]}
    >
      <IconComponent size={16} color={getTimerColor()} />
      <Text 
        style={[styles.text, { color: getTimerColor() }]}
        accessibilityLabel={`Time remaining: ${formatTime(timeRemaining)}`}
      >
        {formatTime(timeRemaining)}
      </Text>
      {timeRemaining <= 5 && (
        <View style={styles.urgentIndicator} />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    position: 'relative',
    minWidth: 80,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
    fontVariant: ['tabular-nums'],
  },
  urgentIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.error,
  },
});
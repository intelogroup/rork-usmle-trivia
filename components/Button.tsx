import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Dimensions } from '@/theme/spacing';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    size === 'small' && styles.buttonSmall,
    size === 'large' && styles.buttonLarge,
    variant === 'primary' && styles.buttonPrimary,
    variant === 'secondary' && styles.buttonSecondary,
    variant === 'outline' && styles.buttonOutline,
    variant === 'text' && styles.buttonTextVariant,
    (disabled || loading) && styles.buttonDisabled,
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyles = [
    styles.buttonText,
    size === 'small' && styles.textSmall,
    size === 'large' && styles.textLarge,
    variant === 'primary' && styles.textPrimary,
    variant === 'secondary' && styles.textSecondary,
    variant === 'outline' && styles.textOutline,
    variant === 'text' && styles.textTextVariant,
    (disabled || loading) && styles.textDisabled,
    textStyle,
  ];

  const renderContent = () => {
    if (loading) {
      return <Text style={textStyles}>Loading...</Text>;
    }

    if (icon) {
      return (
        <View style={styles.contentContainer}>
          {iconPosition === 'left' && (
            <View style={styles.iconContainer}>
              {icon}
            </View>
          )}
          <Text style={textStyles}>{title}</Text>
          {iconPosition === 'right' && (
            <View style={styles.iconContainer}>
              {icon}
            </View>
          )}
        </View>
      );
    }

    return <Text style={textStyles}>{title}</Text>;
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Dimensions.borderRadius.md,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Dimensions.button.medium, // Ensures 48px touch target
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonSmall: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: Dimensions.button.small, // 40px touch target
    borderRadius: Dimensions.borderRadius.sm,
  },
  buttonLarge: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    minHeight: Dimensions.button.large, // 56px touch target
    borderRadius: Dimensions.borderRadius.lg,
  },
  buttonPrimary: {
    backgroundColor: Colors.dark.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.dark.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  },
  buttonTextVariant: {
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    shadowOpacity: 0,
    elevation: 0,
    minHeight: Dimensions.touchTarget.small, // Maintains touch target
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: Colors.dark.inactive,
  },
  fullWidth: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginHorizontal: 6,
  },
  buttonText: {
    ...Typography.styles.button,
    color: Colors.dark.text,
  },
  textSmall: {
    ...Typography.styles.buttonSmall,
  },
  textLarge: {
    ...Typography.styles.buttonLarge,
  },
  textPrimary: {
    color: Colors.dark.background,
  },
  textSecondary: {
    color: Colors.dark.background,
  },
  textOutline: {
    color: Colors.dark.primary,
  },
  textTextVariant: {
    color: Colors.dark.primary,
  },
  textDisabled: {
    color: Colors.dark.textSecondary,
  },
});
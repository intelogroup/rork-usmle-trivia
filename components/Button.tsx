import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import Colors from '@/theme/colors';

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
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonSmall: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonLarge: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  buttonPrimary: {
    backgroundColor: Colors.dark.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.dark.secondary,
  },
  buttonOutline: {
    backgroundColor: Colors.dark.cardHighlight,
    borderWidth: 1.5,
    borderColor: Colors.dark.primary,
  },
  buttonTextVariant: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    shadowOpacity: 0,
    elevation: 0,
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
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textSmall: {
    fontSize: 14,
  },
  textLarge: {
    fontSize: 18,
    letterSpacing: 0.75,
  },
  textPrimary: {
    color: Colors.dark.text,
  },
  textSecondary: {
    color: Colors.dark.text,
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
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Colors from '@/theme/colors';
import Typography from '@/theme/typography';
import { Dimensions, Spacing } from '@/theme/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  style,
  ...props
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          props.multiline && styles.multiline,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={Colors.dark.textTertiary}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
    width: '100%',
  },
  label: {
    ...Typography.styles.bodySmall,
    color: Colors.dark.text,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: Dimensions.input, // Ensures 48px touch target
    fontSize: Typography.fontSize.base,
    color: Colors.dark.text,
    borderWidth: 2,
    borderColor: Colors.dark.border,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: Colors.dark.error,
    borderWidth: 2,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: Spacing.lg,
  },
  errorText: {
    ...Typography.styles.caption,
    color: Colors.dark.error,
    marginTop: Spacing.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  helperText: {
    ...Typography.styles.caption,
    color: Colors.dark.textSecondary,
    marginTop: Spacing.xs,
  },
});
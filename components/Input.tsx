import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Colors from '@/theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
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
        placeholderTextColor={Colors.dark.textSecondary}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.dark.text,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.dark.text,
    borderWidth: 1.5,
    borderColor: Colors.dark.border,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputError: {
    borderColor: Colors.dark.error,
    borderWidth: 2,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  errorText: {
    color: Colors.dark.error,
    fontSize: 14,
    marginTop: 6,
    letterSpacing: 0.25,
  },
});
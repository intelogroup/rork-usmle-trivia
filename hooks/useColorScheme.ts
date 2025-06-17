import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme() {
  // Always return 'dark' to avoid theme switching issues during initialization
  return 'dark';
}
export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  // Standardized text styles for consistency
  styles: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 1.25,
    },
    h2: {
      fontSize: 28,
      fontWeight: '600' as const,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 1.25,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.25,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 1.25,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: '600' as const,
      lineHeight: 1.25,
    },
    buttonLarge: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 1.25,
    },
  },
};

export default Typography;
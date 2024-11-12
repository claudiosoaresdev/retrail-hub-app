export const palette = {
  // Primary Colors (Roxo Linx)
  primary: '#6A1B9A',
  primaryDark: '#4A148C',
  onPrimary: '#FFFFFF',
  primaryContainer: '#E1BEE7',
  onPrimaryContainer: '#6A1B9A',

  // Secondary Colors (Laranja Linx)
  secondary: '#FF6F00',
  secondaryDark: '#E65100',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#FFE0B2',
  onSecondaryContainer: '#FF6F00',

  // Tertiary Colors (Amarelo Linx)
  tertiary: '#FFD600',
  tertiaryDark: '#F9A825',
  onTertiary: '#333333',
  tertiaryContainer: '#FFF9C4',
  onTertiaryContainer: '#FFD600',

  // Background and Surface Colors
  background: '#F2F2F2', // Cinza Claro
  onBackground: '#333333',
  surface: '#FFFFFF',
  onSurface: '#333333',

  // Status Colors
  success: '#4CAF50',
  attention: '#FFA000',
  warning: '#F44336',

  // Error Colors
  error: '#B00020',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',

  // Outline Colors
  outline: '#BDBDBD',
  outlineVariant: '#C4C4C4',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  gray950: '#030712',
};

const lightTheme = {
  ...palette,

  primary: palette.primary,
  secondary: palette.secondary,
  tertiary: palette.tertiary,

  background: palette.background,
  surface: palette.surface,

  error: palette.error,

  outline: palette.outline,
  outlineVariant: palette.outlineVariant,

  text: palette.onBackground,
};

const darkTheme: typeof lightTheme = {
  ...palette,

  primary: palette.primary,
  secondary: palette.secondary,
  tertiary: palette.tertiary,

  background: '#121212',
  surface: '#121212',

  error: palette.error,

  outline: palette.outline,
  outlineVariant: palette.outlineVariant,

  text: palette.onSurface,
};

export const colors = {
  palette,
  lightTheme,
  darkTheme,
};
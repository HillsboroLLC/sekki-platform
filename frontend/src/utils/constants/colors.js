// LSS Color Constants
// These match the CSS variables in styles/variables.css

export const colors = {
  // Primary Colors
  primary: {
    50: '#f8f9fb',
    100: '#f1f3f7',
    200: '#e3e7ef',
    300: '#d5dbe7',
    400: '#a8b3d1',
    500: '#7b8bbb',
    600: '#5d6fa5',
    700: '#3f538f',
    800: '#2c3e6b',
    900: '#161f3b',
    DEFAULT: '#161f3b'
  },

  // Secondary Colors
  secondary: {
    50: '#f9fafb',
    100: '#f3f5f7',
    200: '#e7ebef',
    300: '#dbe1e7',
    400: '#b6c3d7',
    500: '#91a5c7',
    600: '#6c87b7',
    700: '#4769a7',
    800: '#355382',
    900: '#2c3e50',
    DEFAULT: '#2c3e50'
  },

  // Background Colors
  background: {
    50: '#fefffe',
    100: '#fdfefd',
    200: '#fbfdfb',
    300: '#f9fcf9',
    400: '#f4faf6',
    500: '#eff9fc',
    DEFAULT: '#eff9fc'
  },

  // Accent Colors
  accent: {
    50: '#fefcf9',
    100: '#fdf9f3',
    200: '#fbf3e7',
    300: '#f9eddb',
    400: '#f4dbb3',
    500: '#e9b57b',
    600: '#d4a574',
    700: '#bf956d',
    800: '#aa8566',
    900: '#95755f',
    DEFAULT: '#e9b57b'
  },

  // Neutral Colors
  white: '#ffffff',
  black: '#000000',

  // Gray Scale
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  },

  // Semantic Colors
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    DEFAULT: '#10b981'
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    DEFAULT: '#f59e0b'
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    DEFAULT: '#ef4444'
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    DEFAULT: '#3b82f6'
  }
};

// Helper functions for color manipulation
export const getColorValue = (colorPath) => {
  const keys = colorPath.split('.');
  let value = colors;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return null;
    }
  }
  
  return typeof value === 'string' ? value : null;
};

// Common color combinations
export const colorCombinations = {
  primary: {
    background: colors.primary.DEFAULT,
    text: colors.white,
    border: colors.primary.DEFAULT
  },
  secondary: {
    background: colors.secondary.DEFAULT,
    text: colors.white,
    border: colors.secondary.DEFAULT
  },
  accent: {
    background: colors.accent.DEFAULT,
    text: colors.primary.DEFAULT,
    border: colors.accent.DEFAULT
  },
  success: {
    background: colors.success.DEFAULT,
    text: colors.white,
    border: colors.success.DEFAULT
  },
  warning: {
    background: colors.warning.DEFAULT,
    text: colors.white,
    border: colors.warning.DEFAULT
  },
  error: {
    background: colors.error.DEFAULT,
    text: colors.white,
    border: colors.error.DEFAULT
  },
  info: {
    background: colors.info.DEFAULT,
    text: colors.white,
    border: colors.info.DEFAULT
  },
  light: {
    background: colors.gray[50],
    text: colors.gray[900],
    border: colors.gray[200]
  },
  dark: {
    background: colors.gray[900],
    text: colors.white,
    border: colors.gray[700]
  }
};

export default colors;


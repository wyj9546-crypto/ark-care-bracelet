import { Platform } from 'react-native';

export const colors = {
  background: '#FFF8EE',
  surface: '#FFFDF8',
  surfaceMuted: '#FFF0E5',
  surfaceMint: '#EAF3EE',
  primary: '#F36F5E',
  primaryPressed: '#DF5D4F',
  secondary: '#5A968D',
  secondarySoft: '#DCECE5',
  amber: '#F6B467',
  text: '#3B241B',
  textMuted: '#7E695C',
  textSoft: '#B09B8C',
  line: '#EBDCCB',
  success: '#5A968D',
  white: '#FFFDF8'
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 36
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999
};

export const typography = {
  hero: 30,
  title: 24,
  subtitle: 20,
  body: 16,
  small: 13,
  tiny: 11
};

export const shadow = Platform.select({
  ios: {
    shadowColor: 'rgba(59, 36, 27, 0.16)',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 }
  },
  android: {
    elevation: 3
  },
  default: {}
});

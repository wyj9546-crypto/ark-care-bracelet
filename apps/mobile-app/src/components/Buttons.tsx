import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, radius, spacing, typography } from '../theme/theme';

type ButtonProps = PropsWithChildren<{
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
}>;

export function Button({ children, onPress, variant = 'primary', style }: ButtonProps) {
  const textStyle =
    variant === 'primary'
      ? styles.primaryText
      : variant === 'secondary'
        ? styles.secondaryText
        : styles.ghostText;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        style
      ]}
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.surfaceMint
  },
  ghost: {
    backgroundColor: 'transparent'
  },
  pressed: {
    opacity: 0.76
  },
  text: {
    fontSize: typography.body,
    fontWeight: '700'
  },
  primaryText: {
    color: colors.white
  },
  secondaryText: {
    color: colors.secondary
  },
  ghostText: {
    color: colors.textMuted
  }
});

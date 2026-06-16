import type { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius, shadow, spacing } from '../theme/theme';

type CardProps = PropsWithChildren<{
  muted?: boolean;
  style?: ViewStyle;
}>;

export function Card({ children, muted, style }: CardProps) {
  return <View style={[styles.card, muted && styles.muted, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(233, 216, 196, 0.72)',
    ...shadow
  },
  muted: {
    backgroundColor: colors.surfaceMuted,
    borderColor: 'rgba(251, 226, 216, 0.9)'
  }
});

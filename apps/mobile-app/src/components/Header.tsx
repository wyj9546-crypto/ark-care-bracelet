import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme/theme';

type HeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function Header({ eyebrow, title, subtitle }: HeaderProps) {
  return (
    <View style={styles.wrap}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.xl
  },
  eyebrow: {
    color: colors.secondary,
    fontSize: typography.small,
    fontWeight: '700',
    marginBottom: spacing.sm
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    lineHeight: 31,
    fontWeight: '800',
    letterSpacing: 0
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 23
  }
});

import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, radius, spacing, typography } from '../theme/theme';

type MetricPillProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
};

export function MetricPill({ icon, label, value }: MetricPillProps) {
  return (
    <View style={styles.pill}>
      <MaterialCommunityIcons name={icon} size={18} color={colors.secondary} />
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    minHeight: 64,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMint,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  value: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '800'
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.tiny,
    marginTop: 2
  }
});

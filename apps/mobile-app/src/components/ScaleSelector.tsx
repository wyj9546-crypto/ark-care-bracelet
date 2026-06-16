import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme/theme';

type ScaleSelectorProps = {
  label: string;
  lowLabel: string;
  highLabel: string;
  value: number;
  onChange: (value: number) => void;
};

export function ScaleSelector({ label, lowLabel, highLabel, value, onChange }: ScaleSelectorProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.dots}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Pressable
            key={item}
            onPress={() => onChange(item)}
            style={[styles.dot, item <= value && styles.dotActive]}
          >
            <Text style={[styles.dotText, item <= value && styles.dotTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.hints}>
        <Text style={styles.hint}>{lowLabel}</Text>
        <Text style={styles.hint}>{highLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700'
  },
  value: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: '800'
  },
  dots: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  dot: {
    flex: 1,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.line
  },
  dotActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  dotText: {
    color: colors.textMuted,
    fontSize: typography.small,
    fontWeight: '700'
  },
  dotTextActive: {
    color: colors.white
  },
  hints: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  hint: {
    color: colors.textSoft,
    fontSize: typography.tiny
  }
});

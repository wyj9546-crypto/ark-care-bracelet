import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme/theme';
import type { Checkin } from '../types/models';

type MiniTrendProps = {
  data: Checkin[];
};

export function MiniTrend({ data }: MiniTrendProps) {
  const points = data.map((item, index) => ({
    x: 18 + index * 42,
    y: 84 - item.mood * 12,
    date: item.date
  }));

  return (
    <View style={styles.wrap}>
      <View style={styles.chart}>
        <Text style={[styles.axisText, styles.axisHigh]}>好</Text>
        <Text style={[styles.axisText, styles.axisMid]}>中</Text>
        <Text style={[styles.axisText, styles.axisLow]}>低</Text>
        {points.slice(0, -1).map((point, index) => {
          const next = points[index + 1];
          const dx = next.x - point.x;
          const dy = next.y - point.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = `${Math.atan2(dy, dx)}rad`;
          return (
            <View
              key={`${point.date}-${next.date}`}
              style={[
                styles.line,
                {
                  left: point.x + dx / 2 - length / 2,
                  top: point.y + dy / 2,
                  width: length,
                  transform: [{ rotate: angle }]
                }
              ]}
            />
          );
        })}
        {points.map((point, index) => (
          <View
            key={point.date}
            style={[
              styles.dot,
              index === points.length - 1 && styles.dotStrong,
              { left: point.x - 5, top: point.y - 5 }
            ]}
          />
        ))}
        <View style={styles.dateRow}>
          {data.map((item) => (
            <Text key={item.date} style={styles.date}>{item.date}</Text>
          ))}
        </View>
      </View>
      <Text style={styles.caption}>心情自评近 7 天趋势</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md
  },
  chart: {
    height: 134,
    position: 'relative',
    paddingLeft: 28,
    paddingTop: spacing.sm
  },
  line: {
    position: 'absolute',
    height: 2,
    borderRadius: radius.pill,
    backgroundColor: colors.secondary
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.secondary
  },
  dotStrong: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  axisText: {
    position: 'absolute',
    left: 0,
    color: colors.textMuted,
    fontSize: typography.tiny,
    fontWeight: '700'
  },
  axisHigh: {
    top: 20
  },
  axisMid: {
    top: 58
  },
  axisLow: {
    top: 96
  },
  dateRow: {
    position: 'absolute',
    left: 24,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  date: {
    color: colors.textSoft,
    fontSize: typography.tiny,
    width: 30,
    textAlign: 'center'
  },
  caption: {
    color: colors.textMuted,
    fontSize: typography.small
  }
});

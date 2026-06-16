import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import { Button } from '../components/Buttons';
import { Card } from '../components/Card';
import { MetricPill } from '../components/MetricPill';
import { WarmIllustration } from '../components/WarmIllustration';
import { mockUser } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/theme';

type Props = {
  navigation: any;
};

export function TodayScreen({ navigation }: Props) {
  return (
    <AppScreen>
      <View style={styles.brandRow}>
        <Text style={styles.brand}>方舟</Text>
        <MaterialCommunityIcons name="bell-outline" size={24} color={colors.text} />
      </View>

      <View style={styles.heroHeader}>
        <View style={styles.heroCopyBlock}>
          <Text style={styles.heroHeadline}>今天也要{'\n'}照顾好自己</Text>
          <Text style={styles.heroSub}>慢慢来，你已经做得很好了。</Text>
        </View>
        <WarmIllustration variant="sunrise" />
      </View>

      <Card style={styles.statusCard}>
        <View style={styles.cardTopRow}>
          <Text style={styles.sectionTitle}>今日状态</Text>
          <Text style={styles.syncText}>09:20 更新</Text>
        </View>
        <View style={styles.scoreRow}>
          <View style={styles.faceCircle}>
            <MaterialCommunityIcons name="emoticon-happy-outline" size={38} color={colors.amber} />
          </View>
          <View style={styles.scoreTextWrap}>
            <Text style={styles.scoreLabel}>还不错</Text>
            <Text style={styles.scoreHint}>心情有波动，但还在可照顾的范围里。</Text>
          </View>
          <Text style={styles.scoreNumber}>7<Text style={styles.scoreTotal}>/10</Text></Text>
        </View>
        <View style={styles.metrics}>
          <MetricPill icon="heart" label="心情" value="温和" />
          <MetricPill icon="battery-medium" label="精力" value="一般" />
          <MetricPill icon="walk" label="活动" value="36 分钟" />
        </View>
      </Card>

      <Card style={styles.checkinCard}>
        <View style={styles.checkinText}>
          <Text style={styles.sectionTitle}>今日打卡</Text>
          <Text style={styles.taskCopy}>花 1 分钟，记录此刻的你。</Text>
        </View>
        <View style={styles.checkinArt}>
          <WarmIllustration variant="checklist" />
        </View>
        <Button onPress={() => navigation.navigate('Checkin')} style={styles.checkinButton}>去打卡</Button>
      </Card>

      <Card style={styles.suggestionCard}>
        <View>
          <Text style={styles.sectionTitle}>小建议</Text>
          <Text style={styles.suggestionText}>喝杯温水，伸个懒腰，给自己一点时间。</Text>
        </View>
        <WarmIllustration variant="cup" />
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    paddingTop: spacing.xs
  },
  brand: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '900'
  },
  heroHeader: {
    minHeight: 158,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  heroCopyBlock: {
    flex: 1,
    paddingRight: spacing.sm
  },
  heroHeadline: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 38,
    fontWeight: '900'
  },
  heroSub: {
    color: colors.textMuted,
    fontSize: typography.body,
    marginTop: spacing.md
  },
  statusCard: {
    gap: spacing.lg,
    marginBottom: spacing.xl
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: '800'
  },
  syncText: {
    color: colors.textMuted,
    fontSize: typography.small
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  faceCircle: {
    width: 58,
    height: 58,
    borderRadius: radius.xl,
    backgroundColor: '#FFF1D8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreTextWrap: {
    flex: 1
  },
  scoreLabel: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '900'
  },
  scoreHint: {
    color: colors.textMuted,
    fontSize: typography.small,
    marginTop: spacing.xs
  },
  scoreNumber: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '900'
  },
  scoreTotal: {
    color: colors.textMuted,
    fontSize: typography.body,
    fontWeight: '700'
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  checkinCard: {
    minHeight: 122,
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden'
  },
  checkinText: {
    paddingRight: 112
  },
  checkinButton: {
    alignSelf: 'flex-start',
    minWidth: 104,
    minHeight: 44,
    marginTop: spacing.md
  },
  checkinArt: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md
  },
  suggestionCard: {
    minHeight: 118,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
    marginBottom: spacing.xxxl
  },
  taskCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    marginTop: spacing.xs
  },
  suggestionText: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 23,
    maxWidth: 190,
    marginTop: spacing.sm
  }
});

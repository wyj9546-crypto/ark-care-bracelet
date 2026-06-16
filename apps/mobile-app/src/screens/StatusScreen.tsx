import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import { Button } from '../components/Buttons';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { MiniTrend } from '../components/MiniTrend';
import { WarmIllustration } from '../components/WarmIllustration';
import { mockCheckins, mockContact, mockReport } from '../data/mockData';
import { sendCareReminder } from '../services/api';
import { colors, radius, spacing, typography } from '../theme/theme';

type Props = {
  navigation: any;
};

const careLevelLabel = {
  steady: '平稳',
  attention: '稍需关注',
  connect: '建议联系可信的人'
};

export function StatusScreen({ navigation }: Props) {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [sending, setSending] = useState(false);

  const confirmSend = async () => {
    setSending(true);
    await sendCareReminder();
    setSending(false);
    setConfirmVisible(false);
    navigation.navigate('ContactReceived');
  };

  return (
    <AppScreen>
      <Header
        eyebrow="近况"
        title="近 7 天的你"
        subtitle="记录你的状态变化，不做判断。"
      />

      <Card muted style={styles.levelCard}>
        <Text style={styles.levelLabel}>整体感受</Text>
        <Text style={styles.levelValue}>{careLevelLabel[mockReport.careLevel]}</Text>
        <Text style={styles.levelCopy}>{mockReport.summary}</Text>
      </Card>

      <Card style={styles.sectionCard}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>7 天趋势</Text>
          <MaterialCommunityIcons name="chart-bar" size={20} color={colors.primary} />
        </View>
        <MiniTrend data={mockCheckins} />
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>关怀信号</Text>
        <View style={styles.signals}>
          {mockReport.signals.map((signal) => (
            <View key={signal} style={styles.signalRow}>
              <View style={styles.signalDot} />
              <Text style={styles.signalText}>{signal}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card style={styles.actionCard}>
        <View style={styles.actionHeader}>
          <View style={styles.actionTextWrap}>
            <Text style={styles.sectionTitle}>小建议</Text>
            <Text style={styles.actionCopy}>{mockReport.suggestedAction}</Text>
          </View>
          <WarmIllustration variant="cup" />
        </View>
        <Button onPress={() => setConfirmVisible(true)} style={styles.actionButton}>
          提醒可信联系人
        </Button>
        <Text style={styles.disclaimer}>发送前需要你的确认。方舟不会自动通知任何人。</Text>
      </Card>

      <Modal visible={confirmVisible} transparent animationType="fade" onRequestClose={() => setConfirmVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>确认模拟提醒</Text>
            <Text style={styles.sheetCopy}>
              将向 {mockContact.name} 显示一条温和关怀提醒：TA 最近几天状态有些波动，建议你发一句问候。
            </Text>
            <Button onPress={confirmSend}>{sending ? '正在发送...' : '确认发送'}</Button>
            <Button variant="ghost" onPress={() => setConfirmVisible(false)}>先不发送</Button>
          </View>
        </View>
      </Modal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  levelCard: {
    marginBottom: spacing.xl
  },
  levelLabel: {
    color: colors.textMuted,
    fontSize: typography.small,
    fontWeight: '700',
    marginBottom: spacing.sm
  },
  levelValue: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: spacing.md
  },
  levelCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 24
  },
  sectionCard: {
    marginBottom: spacing.xl,
    gap: spacing.md
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: '800'
  },
  signals: {
    gap: spacing.md
  },
  signalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  signalDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.primary
  },
  signalText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 22
  },
  actionCard: {
    gap: spacing.md,
    marginBottom: spacing.xxxl
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md
  },
  actionTextWrap: {
    flex: 1
  },
  actionCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 24
  },
  actionButton: {
    marginTop: spacing.sm
  },
  disclaimer: {
    color: colors.textSoft,
    fontSize: typography.small,
    lineHeight: 19
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(60, 53, 48, 0.26)',
    justifyContent: 'flex-end'
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.md
  },
  sheetTitle: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: '900'
  },
  sheetCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 24
  }
});

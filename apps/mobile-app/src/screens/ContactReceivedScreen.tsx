import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import { Button } from '../components/Buttons';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { WarmIllustration } from '../components/WarmIllustration';
import { mockContact, mockUser } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactReceived'>;

export function ContactReceivedScreen({ navigation }: Props) {
  return (
    <AppScreen
      footer={
        <Button onPress={() => navigation.navigate('MainTabs', { screen: 'Today' })}>
          回到方舟
        </Button>
      }
    >
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={26} color={colors.text} />
        <Text style={styles.backText}>返回</Text>
      </Pressable>

      <Header
        eyebrow="联系人视图"
        title="可信联系人收到提醒"
        subtitle="这是现场演示用的独立模拟页，不发送真实短信。"
      />

      <WarmIllustration variant="envelope" />

      <Card muted style={styles.noticeCard}>
        <View style={styles.noticeIcon}>
          <MaterialCommunityIcons name="check" size={30} color={colors.white} />
        </View>
        <Text style={styles.noticeTitle}>提醒已发送</Text>
        <Text style={styles.noticeTime}>你的联系人已收到关怀提醒</Text>
      </Card>

      <Card style={styles.messageCard}>
        <View style={styles.senderRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{mockContact.name.slice(0, 1)}</Text>
          </View>
          <View>
            <Text style={styles.senderName}>{mockContact.name}</Text>
            <Text style={styles.senderMeta}>可信联系人</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.message}>
          {mockUser.name} 最近几天状态有些波动。你可以发一句轻松的问候，例如：“我在，有空时想听你说说。”
        </Text>

        <View style={styles.actionRow}>
          <Button variant="secondary" style={styles.flexButton}>我知道了</Button>
          <Button style={styles.flexButton}>发一句问候</Button>
        </View>
      </Card>

      <Text style={styles.note}>
        提醒内容保持克制，不展示聊天原文，不暴露过多隐私。
      </Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    marginBottom: spacing.xl
  },
  backText: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700'
  },
  noticeCard: {
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xl
  },
  noticeIcon: {
    width: 68,
    height: 68,
    borderRadius: radius.xl,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noticeTitle: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '900'
  },
  noticeTime: {
    color: colors.textMuted,
    fontSize: typography.small
  },
  messageCard: {
    gap: spacing.lg,
    marginBottom: spacing.xl
  },
  senderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: '900'
  },
  senderName: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '900'
  },
  senderMeta: {
    color: colors.textMuted,
    fontSize: typography.small,
    marginTop: 2
  },
  divider: {
    height: 1,
    backgroundColor: colors.line
  },
  message: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 25
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md
  },
  flexButton: {
    flex: 1,
    paddingHorizontal: spacing.sm
  },
  note: {
    color: colors.textMuted,
    fontSize: typography.small,
    lineHeight: 20
  }
});

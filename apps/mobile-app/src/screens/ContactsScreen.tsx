import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import { Button } from '../components/Buttons';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { mockContact } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

export function ContactsScreen({ navigation }: Props) {
  return (
    <AppScreen>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={26} color={colors.text} />
        <Text style={styles.backText}>返回</Text>
      </Pressable>

      <Header
        eyebrow="可信联系人"
        title="让现实中的关心有一个入口"
        subtitle="提醒不会自动发出，每一次都需要用户确认。"
      />

      <Card style={styles.contactCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>陈</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.name}>{mockContact.name}</Text>
          <Text style={styles.meta}>{mockContact.relation}</Text>
          <Text style={styles.phone}>{mockContact.phone}</Text>
        </View>
        <View style={styles.authPill}>
          <Text style={styles.authText}>已授权</Text>
        </View>
      </Card>

      <Card muted style={styles.permissionCard}>
        <Text style={styles.permissionTitle}>提醒内容示例</Text>
        <Text style={styles.permissionCopy}>
          TA 最近几天状态有些波动，建议你发一句温和问候。请避免追问或责备。
        </Text>
      </Card>

      <Button onPress={() => navigation.navigate('ContactReceived')}>
        查看联系人收到提醒
      </Button>
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
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: colors.white,
    fontSize: typography.subtitle,
    fontWeight: '900'
  },
  contactInfo: {
    flex: 1
  },
  name: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: '900'
  },
  meta: {
    color: colors.textMuted,
    fontSize: typography.small,
    marginTop: spacing.xs
  },
  phone: {
    color: colors.textSoft,
    fontSize: typography.small,
    marginTop: 2
  },
  authPill: {
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMint,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  authText: {
    color: colors.secondary,
    fontSize: typography.tiny,
    fontWeight: '900'
  },
  permissionCard: {
    gap: spacing.sm,
    marginBottom: spacing.xl
  },
  permissionTitle: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: '800'
  },
  permissionCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 24
  }
});

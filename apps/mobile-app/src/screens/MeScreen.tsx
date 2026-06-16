import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { mockContact } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/theme';

type Props = {
  navigation: any;
};

export function MeScreen({ navigation }: Props) {
  const [useCheckin, setUseCheckin] = useState(true);
  const [useBracelet, setUseBracelet] = useState(true);
  const [allowContact, setAllowContact] = useState(true);

  return (
    <AppScreen>
      <Header
        eyebrow="我的"
        title="把授权放在你看得见的地方"
        subtitle="方舟只在你确认后，才会模拟提醒可信联系人。"
      />

      <Pressable onPress={() => navigation.navigate('Contacts')}>
        <Card style={styles.contactCard}>
          <View>
            <Text style={styles.cardLabel}>可信联系人</Text>
            <Text style={styles.contactName}>{mockContact.name}</Text>
            <Text style={styles.contactMeta}>{mockContact.relation} · {mockContact.phone}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={26} color={colors.textMuted} />
        </Card>
      </Pressable>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>隐私授权</Text>
        <SettingRow label="使用打卡生成近况" value={useCheckin} onValueChange={setUseCheckin} />
        <SettingRow label="使用手环数据辅助观察" value={useBracelet} onValueChange={setUseBracelet} />
        <SettingRow label="允许确认后提醒联系人" value={allowContact} onValueChange={setAllowContact} />
      </Card>

      <Card muted style={styles.demoCard}>
        <Text style={styles.demoTitle}>演示模式</Text>
        <Text style={styles.demoCopy}>当前版本使用本地 mock 数据，适合现场真机稳定演示。</Text>
      </Card>
    </AppScreen>
  );
}

function SettingRow({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (value: boolean) => void }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.line, true: colors.secondarySoft }}
        thumbColor={value ? colors.secondary : colors.textSoft}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contactCard: {
    marginBottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardLabel: {
    color: colors.textMuted,
    fontSize: typography.small,
    fontWeight: '700',
    marginBottom: spacing.xs
  },
  contactName: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: '900'
  },
  contactMeta: {
    color: colors.textMuted,
    fontSize: typography.small,
    marginTop: spacing.xs
  },
  section: {
    gap: spacing.md,
    marginBottom: spacing.xl
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: '800'
  },
  settingRow: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  settingLabel: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700'
  },
  demoCard: {
    gap: spacing.sm
  },
  demoTitle: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: '800'
  },
  demoCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 23
  }
});

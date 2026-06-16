import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import { Button } from '../components/Buttons';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { ScaleSelector } from '../components/ScaleSelector';
import { saveCheckin } from '../services/api';
import { colors, radius, spacing, typography } from '../theme/theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkin'>;

export function CheckinScreen({ navigation }: Props) {
  const [mood, setMood] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [pressure, setPressure] = useState(3);
  const [loneliness, setLoneliness] = useState(3);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    setSaving(true);
    await saveCheckin({
      date: '今天',
      mood,
      sleep,
      pressure,
      loneliness,
      note: note || '今天先简单记录一下。'
    });
    setSaving(false);
    setSaved(true);
  };

  if (saved) {
    return (
      <AppScreen
        footer={
          <Button onPress={() => navigation.navigate('MainTabs', { screen: 'Status' })}>
            查看近况
          </Button>
        }
      >
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={26} color={colors.text} />
          <Text style={styles.backText}>返回</Text>
        </Pressable>
        <Card muted style={styles.successCard}>
          <View style={styles.successIcon}>
            <MaterialCommunityIcons name="check" size={32} color={colors.white} />
          </View>
          <Text style={styles.successTitle}>已记录</Text>
          <Text style={styles.successCopy}>谢谢你认真照顾今天的自己。方舟会把这些日常片段整理成温和的近况观察。</Text>
        </Card>
      </AppScreen>
    );
  }

  return (
    <AppScreen
      footer={
        <Button onPress={submit}>{saving ? '正在记录...' : '保存今日打卡'}</Button>
      }
    >
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={26} color={colors.text} />
        <Text style={styles.backText}>返回</Text>
      </Pressable>

      <Header
        eyebrow="今日打卡"
        title="用几个简单选择，看看现在的状态"
        subtitle="不用写得完整，能记录一点就已经足够。"
      />

      <Card style={styles.formCard}>
        <ScaleSelector label="心情" lowLabel="低落" highLabel="轻松" value={mood} onChange={setMood} />
        <ScaleSelector label="睡眠" lowLabel="较差" highLabel="很好" value={sleep} onChange={setSleep} />
        <ScaleSelector label="压力" lowLabel="轻" highLabel="重" value={pressure} onChange={setPressure} />
        <ScaleSelector label="孤独感" lowLabel="少" highLabel="强" value={loneliness} onChange={setLoneliness} />
      </Card>

      <Text style={styles.noteLabel}>今日一句话</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="例如：今天有点累，但我想早点休息。"
        placeholderTextColor={colors.textSoft}
        multiline
        style={styles.input}
      />
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
  formCard: {
    gap: spacing.xl,
    marginBottom: spacing.xl
  },
  noteLabel: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '800',
    marginBottom: spacing.sm
  },
  input: {
    minHeight: 112,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 23,
    textAlignVertical: 'top'
  },
  successCard: {
    minHeight: 330,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.xxxl
  },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: radius.xl,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center'
  },
  successTitle: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '900'
  },
  successCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 24,
    textAlign: 'center'
  }
});

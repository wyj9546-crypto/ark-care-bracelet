import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../components/Card';
import { mockMessages } from '../data/mockData';
import { sendMessage } from '../services/api';
import { colors, radius, spacing, typography } from '../theme/theme';
import type { ChatMessage } from '../types/models';

const quickTexts = ['今天有点累', '我想找人聊聊', '睡得不太好', '提醒我休息一下'];

export function CompanionScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (text = input) => {
    const content = text.trim();
    if (!content || loading) return;
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      time: '刚刚'
    };
    setMessages((items) => [...items, userMessage]);
    setInput('');
    setLoading(true);
    const reply = await sendMessage(content);
    setMessages((items) => [...items, reply]);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <View style={styles.topBar}>
          <Text style={styles.title}>陪伴</Text>
          <MaterialCommunityIcons name="dots-horizontal" size={24} color={colors.text} />
        </View>
        <View style={styles.onlinePill}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>在线 · 随时在这里陪你</Text>
        </View>

        <View style={styles.chatWrap}>
          {messages.map((message) => (
            <View key={message.id} style={[styles.messageRow, message.role === 'user' && styles.userRow]}>
              <View style={[styles.bubble, message.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
                <Text style={[styles.bubbleText, message.role === 'user' && styles.userBubbleText]}>
                  {message.content}
                </Text>
              </View>
            </View>
          ))}
          {loading ? (
            <Text style={styles.typing}>方舟正在回应...</Text>
          ) : null}
        </View>

        <View style={styles.quickRow}>
          {quickTexts.map((text) => (
            <Pressable key={text} onPress={() => submit(text)} style={styles.quickChip}>
              <Text style={styles.quickText}>{text}</Text>
            </Pressable>
          ))}
        </View>

        <Card style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="慢慢写下想说的话"
            placeholderTextColor={colors.textSoft}
            style={styles.input}
          />
          <Pressable style={styles.sendButton} onPress={() => submit()}>
            <MaterialCommunityIcons name="send" size={18} color={colors.white} />
          </Pressable>
        </Card>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '900'
  },
  onlinePill: {
    alignSelf: 'center',
    borderRadius: radius.pill,
    backgroundColor: '#FFF4E8',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.secondary
  },
  onlineText: {
    color: colors.textMuted,
    fontSize: typography.small,
    fontWeight: '700'
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md
  },
  quickChip: {
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  quickText: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '700'
  },
  chatWrap: {
    flex: 1,
    gap: spacing.md,
    paddingBottom: spacing.lg
  },
  messageRow: {
    flexDirection: 'row'
  },
  userRow: {
    justifyContent: 'flex-end'
  },
  bubble: {
    maxWidth: '84%',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  assistantBubble: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(235, 220, 203, 0.7)'
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: radius.sm
  },
  bubbleText: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 23
  },
  userBubbleText: {
    color: colors.white
  },
  typing: {
    color: colors.textMuted,
    fontSize: typography.small
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

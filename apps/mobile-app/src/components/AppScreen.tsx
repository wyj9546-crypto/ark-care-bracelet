import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../theme/theme';

type AppScreenProps = PropsWithChildren<{
  scroll?: boolean;
  footer?: ReactNode;
}>;

export function AppScreen({ children, scroll = true, footer }: AppScreenProps) {
  const content = <View style={styles.content}>{children}</View>;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  scroll: {
    paddingBottom: spacing.xxxl
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background
  }
});

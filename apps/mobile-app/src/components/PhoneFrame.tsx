import type { PropsWithChildren } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme/theme';

export function PhoneFrame({ children }: PropsWithChildren) {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.webStage}>
      <View style={styles.deviceShadow}>
        <View style={styles.device}>
          <View style={styles.sideButtonLeft} />
          <View style={styles.sideButtonRight} />
          <View style={styles.screen}>
            <View style={styles.statusBar}>
              <Text style={styles.time}>9:41</Text>
              <View style={styles.notch}>
                <View style={styles.speaker} />
                <View style={styles.camera} />
              </View>
              <View style={styles.statusIcons}>
                <View style={styles.signal}>
                  <View style={[styles.signalBar, { height: 5 }]} />
                  <View style={[styles.signalBar, { height: 8 }]} />
                  <View style={[styles.signalBar, { height: 11 }]} />
                </View>
                <View style={styles.wifi} />
                <View style={styles.battery}>
                  <View style={styles.batteryFill} />
                </View>
              </View>
            </View>
            <View style={styles.appViewport}>{children}</View>
            <View style={styles.homeIndicator} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webStage: {
    flex: 1,
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6EFE4',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl
  },
  deviceShadow: {
    borderRadius: 46,
    backgroundColor: '#171717',
    padding: 6,
    shadowColor: 'rgba(40, 28, 18, 0.38)',
    shadowOpacity: 0.38,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 18 }
  },
  device: {
    width: 390,
    height: 844,
    borderRadius: 42,
    backgroundColor: '#0E0E0F',
    padding: 11,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#2E2D2B'
  },
  sideButtonLeft: {
    position: 'absolute',
    left: -5,
    top: 150,
    width: 4,
    height: 74,
    borderRadius: radius.pill,
    backgroundColor: '#5B574F'
  },
  sideButtonRight: {
    position: 'absolute',
    right: -5,
    top: 188,
    width: 4,
    height: 94,
    borderRadius: radius.pill,
    backgroundColor: '#5B574F'
  },
  screen: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 32,
    backgroundColor: colors.background
  },
  statusBar: {
    height: 48,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'relative'
  },
  time: {
    color: '#0F0F10',
    fontSize: 13,
    fontWeight: '800'
  },
  notch: {
    position: 'absolute',
    top: 0,
    left: 116,
    width: 136,
    height: 31,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: '#0E0E0F',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12
  },
  speaker: {
    width: 46,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: '#252A31'
  },
  camera: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: '#172339',
    borderWidth: 1,
    borderColor: '#263A5D'
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  },
  signal: {
    height: 13,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2
  },
  signalBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: '#171717'
  },
  wifi: {
    width: 13,
    height: 9,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#171717',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    transform: [{ rotate: '0deg' }]
  },
  battery: {
    width: 22,
    height: 11,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#171717',
    padding: 1.5
  },
  batteryFill: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#171717'
  },
  appViewport: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 12
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 9,
    alignSelf: 'center',
    width: 116,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: '#0E0E0F'
  }
});

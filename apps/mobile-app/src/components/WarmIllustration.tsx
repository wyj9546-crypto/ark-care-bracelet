import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { colors, radius } from '../theme/theme';

type WarmIllustrationProps = {
  variant: 'sunrise' | 'checklist' | 'cup' | 'envelope';
};

export function WarmIllustration({ variant }: WarmIllustrationProps) {
  if (variant === 'checklist') {
    return (
      <View style={styles.illustration}>
        <View style={styles.paper}>
          <MaterialCommunityIcons name="clipboard-check-outline" size={48} color={colors.amber} />
        </View>
        <View style={styles.pen} />
      </View>
    );
  }

  if (variant === 'cup') {
    return (
      <View style={styles.illustration}>
        <View style={styles.saucer} />
        <MaterialCommunityIcons name="coffee-outline" size={56} color={colors.secondary} />
        <View style={styles.steam} />
      </View>
    );
  }

  if (variant === 'envelope') {
    return (
      <View style={styles.envelopeScene}>
        <View style={styles.vase}>
          <View style={styles.stem} />
          <View style={[styles.leaf, styles.leafLeft]} />
          <View style={[styles.leaf, styles.leafRight]} />
        </View>
        <View style={styles.envelope}>
          <MaterialCommunityIcons name="heart" size={22} color={colors.primary} />
        </View>
        <MaterialCommunityIcons name="coffee-outline" size={42} color={colors.amber} />
      </View>
    );
  }

  return (
    <View style={styles.sunrise}>
      <View style={styles.sun} />
      <View style={styles.hillBack} />
      <View style={styles.hillFront} />
      <View style={styles.plantStem} />
      <View style={[styles.plantLeaf, styles.plantLeafOne]} />
      <View style={[styles.plantLeaf, styles.plantLeafTwo]} />
    </View>
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: 98,
    height: 86,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sunrise: {
    width: 142,
    height: 94,
    position: 'relative'
  },
  sun: {
    position: 'absolute',
    right: 14,
    top: 2,
    width: 54,
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: '#FFB36E'
  },
  hillBack: {
    position: 'absolute',
    right: 0,
    bottom: 16,
    width: 104,
    height: 44,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    backgroundColor: '#C7DDD8',
    transform: [{ rotate: '-4deg' }]
  },
  hillFront: {
    position: 'absolute',
    left: 12,
    bottom: 6,
    width: 114,
    height: 38,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    backgroundColor: '#E8D5B8',
    transform: [{ rotate: '-7deg' }]
  },
  plantStem: {
    position: 'absolute',
    left: 34,
    bottom: 28,
    width: 3,
    height: 30,
    borderRadius: 3,
    backgroundColor: colors.secondary
  },
  plantLeaf: {
    position: 'absolute',
    width: 18,
    height: 10,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: colors.secondary
  },
  plantLeafOne: {
    left: 19,
    bottom: 48,
    transform: [{ rotate: '28deg' }]
  },
  plantLeafTwo: {
    left: 36,
    bottom: 38,
    transform: [{ rotate: '-24deg' }]
  },
  paper: {
    width: 74,
    height: 74,
    borderRadius: radius.lg,
    backgroundColor: '#FFF1D8',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '8deg' }]
  },
  pen: {
    position: 'absolute',
    right: 7,
    bottom: 10,
    width: 9,
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: colors.secondary,
    transform: [{ rotate: '22deg' }]
  },
  saucer: {
    position: 'absolute',
    bottom: 10,
    width: 74,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: '#E8D5B8'
  },
  steam: {
    position: 'absolute',
    top: 4,
    width: 22,
    height: 32,
    borderLeftWidth: 2,
    borderLeftColor: '#E8D5B8',
    borderRadius: radius.pill,
    transform: [{ rotate: '14deg' }]
  },
  envelopeScene: {
    height: 164,
    borderRadius: radius.xl,
    backgroundColor: '#F3DEC4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  vase: {
    width: 42,
    height: 58,
    borderRadius: radius.lg,
    backgroundColor: '#B8D0C2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stem: {
    position: 'absolute',
    top: -40,
    width: 3,
    height: 52,
    backgroundColor: colors.secondary
  },
  leaf: {
    position: 'absolute',
    top: -28,
    width: 20,
    height: 12,
    backgroundColor: '#91B69B',
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18
  },
  leafLeft: {
    left: 2,
    transform: [{ rotate: '30deg' }]
  },
  leafRight: {
    right: 1,
    transform: [{ rotate: '-30deg' }]
  },
  envelope: {
    width: 104,
    height: 66,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-3deg' }]
  }
});

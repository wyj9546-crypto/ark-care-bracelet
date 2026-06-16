import { evaluateEmotionRisk } from './emotionEngine';
import type { EngineInput } from './types';

const now = new Date('2026-06-16T20:00:00+08:00').getTime();
const minutesAgo = (minutes: number) => new Date(now - minutes * 60 * 1000).toISOString();

export const demoEngineInput: EngineInput = {
  baseline: {
    days: 7,
    heartRateMean: 74,
    hrvMean: 52,
    hrvStd: 9,
    sleepRegularityMean: 0.78,
    withdrawalMean: 0.3
  },
  physiological: Array.from({ length: 36 }, (_, index) => ({
    timestamp: minutesAgo((35 - index) * 2),
    heartRate: index > 24 ? 96 : 78,
    hrv: index > 24 ? 31 : 48,
    rriStability: index > 24 ? 0.46 : 0.82,
    sleepStage: index > 28 ? 'light' : 'awake',
    motionLevel: index > 28 ? 0.72 : 0.28,
    skinContact: true
  })),
  behavior: [
    { timestamp: '2026-06-10T20:00:00+08:00', appSilenceMinutes: 80, socialWithdrawalScore: 0.34, routineDeviationScore: 0.28 },
    { timestamp: '2026-06-11T20:00:00+08:00', appSilenceMinutes: 95, socialWithdrawalScore: 0.38, routineDeviationScore: 0.33 },
    { timestamp: '2026-06-12T20:00:00+08:00', appSilenceMinutes: 120, socialWithdrawalScore: 0.45, routineDeviationScore: 0.42 },
    { timestamp: '2026-06-13T20:00:00+08:00', appSilenceMinutes: 160, socialWithdrawalScore: 0.58, routineDeviationScore: 0.5 },
    { timestamp: '2026-06-14T20:00:00+08:00', appSilenceMinutes: 210, socialWithdrawalScore: 0.67, routineDeviationScore: 0.62 },
    { timestamp: '2026-06-15T20:00:00+08:00', appSilenceMinutes: 260, socialWithdrawalScore: 0.72, routineDeviationScore: 0.7 },
    { timestamp: '2026-06-16T20:00:00+08:00', appSilenceMinutes: 300, socialWithdrawalScore: 0.78, routineDeviationScore: 0.76 }
  ],
  acoustic: [
    {
      timestamp: '2026-06-16T19:58:00+08:00',
      speechRate: 0.38,
      pauseRatio: 0.64,
      stressProsodyScore: 0.73
    }
  ]
};

export const demoEngineDecision = evaluateEmotionRisk(demoEngineInput);

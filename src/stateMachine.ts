import { clamp, createSignal, latestWindow, mean, sleepPhasePenalty, zScore } from './signalProcessing';
import type { AcousticCue, BehaviorSample, DefenseSignal, PersonalBaseline, SensorSample } from './types';

type StateMachineInput = {
  physiological: SensorSample[];
  behavior: BehaviorSample[];
  acoustic: AcousticCue[];
  baseline: PersonalBaseline;
};

export function evaluateDefenseSignals(input: StateMachineInput): DefenseSignal[] {
  const shortWindow = latestWindow(input.physiological, 5);
  const mediumWindow = latestWindow(input.physiological, 30);
  const longBehavior = input.behavior.slice(-7);
  const latestBehavior = input.behavior[input.behavior.length - 1];
  const latestAcoustic = input.acoustic[input.acoustic.length - 1];

  const shortHrv = mean(shortWindow.map((sample) => sample.hrv));
  const shortRriInstability = mean(shortWindow.map((sample) => 1 - sample.rriStability));
  const shortScore = clamp(
    Math.abs(zScore(shortHrv, input.baseline.hrvMean, input.baseline.hrvStd)) * 0.28 + shortRriInstability * 0.72
  );

  const mediumHrvDrop = clamp((input.baseline.hrvMean - mean(mediumWindow.map((sample) => sample.hrv))) / 28);
  const mediumHeartRise = clamp((mean(mediumWindow.map((sample) => sample.heartRate)) - input.baseline.heartRateMean) / 32);
  const mediumSleepPenalty = sleepPhasePenalty(mediumWindow);
  const mediumScore = clamp(mediumHrvDrop * 0.42 + mediumHeartRise * 0.28 + mediumSleepPenalty * 0.3);

  const behaviorScore = latestBehavior
    ? clamp(
        latestBehavior.socialWithdrawalScore * 0.42 +
          latestBehavior.routineDeviationScore * 0.36 +
          clamp(latestBehavior.appSilenceMinutes / 240) * 0.22
      )
    : 0;

  const acousticScore = latestAcoustic
    ? clamp(latestAcoustic.stressProsodyScore * 0.5 + latestAcoustic.pauseRatio * 0.32 + clamp(1 - latestAcoustic.speechRate) * 0.18)
    : 0;

  const longTrendScore =
    longBehavior.length === 0
      ? 0
      : clamp(mean(longBehavior.map((sample) => sample.socialWithdrawalScore)) - input.baseline.withdrawalMean + 0.45);

  return [
    createSignal('short', '短周期 HRV / R-R 间期波动', shortScore, '用于捕捉瞬时生理异常，但不会单独触发干预。'),
    createSignal('medium', '30 分钟多模态联合校验', mediumScore, '整合 HRV 下降、心率抬升和睡眠阶段异常，过滤偶发噪声。'),
    createSignal('medium', '行为与非语义声学互补', clamp(behaviorScore * 0.62 + acousticScore * 0.38), '用行为节律和声学线索补足单一传感器盲区。'),
    createSignal('long', '7 天个体基线漂移', longTrendScore, '以历史状态为参照，识别缓慢累积的异常趋势。')
  ];
}

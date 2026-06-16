import { clamp } from './signalProcessing';
import type { BehaviorSample, PersonalBaseline, SensorSample } from './types';

export function updatePersonalBaseline(
  baseline: PersonalBaseline,
  physiological: SensorSample[],
  behavior: BehaviorSample[],
  learningRate = 0.08
): PersonalBaseline {
  const stablePhysiology = physiological.filter((sample) => sample.skinContact && sample.motionLevel < 0.5);
  const stableBehavior = behavior.filter((sample) => sample.routineDeviationScore < 0.55);

  if (stablePhysiology.length < 3 || stableBehavior.length < 1) {
    return baseline;
  }

  const avg = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
  const blend = (current: number, observed: number) => current * (1 - learningRate) + observed * learningRate;

  return {
    days: Math.min(30, baseline.days + 1),
    heartRateMean: blend(baseline.heartRateMean, avg(stablePhysiology.map((sample) => sample.heartRate))),
    hrvMean: blend(baseline.hrvMean, avg(stablePhysiology.map((sample) => sample.hrv))),
    hrvStd: clamp(blend(baseline.hrvStd, 8), 4, 22),
    sleepRegularityMean: blend(
      baseline.sleepRegularityMean,
      1 - avg(stableBehavior.map((sample) => sample.routineDeviationScore))
    ),
    withdrawalMean: blend(
      baseline.withdrawalMean,
      avg(stableBehavior.map((sample) => sample.socialWithdrawalScore))
    )
  };
}

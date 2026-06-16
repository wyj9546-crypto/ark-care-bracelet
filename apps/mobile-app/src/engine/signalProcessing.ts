import type { DefenseSignal, SensorSample, TimeScale } from './types';

const MINUTE = 60 * 1000;

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function mean(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function standardDeviation(values: number[]) {
  if (values.length < 2) {
    return 0;
  }

  const avg = mean(values);
  const variance = mean(values.map((value) => (value - avg) ** 2));
  return Math.sqrt(variance);
}

export function zScore(value: number, avg: number, std: number) {
  if (std <= 0.0001) {
    return 0;
  }

  return (value - avg) / std;
}

export function latestWindow<T extends { timestamp: string }>(samples: T[], minutes: number) {
  if (samples.length === 0) {
    return [];
  }

  const end = new Date(samples[samples.length - 1].timestamp).getTime();
  const start = end - minutes * MINUTE;
  return samples.filter((sample) => new Date(sample.timestamp).getTime() >= start);
}

export function createSignal(
  scale: TimeScale,
  name: string,
  score: number,
  reason: string,
  threshold = 0.62
): DefenseSignal {
  const normalized = clamp(score);

  return {
    scale,
    name,
    abnormal: normalized >= threshold,
    score: normalized,
    reason
  };
}

export function sleepPhasePenalty(samples: SensorSample[]) {
  const asleep = samples.filter((sample) => sample.sleepStage && sample.sleepStage !== 'awake');
  if (asleep.length === 0) {
    return 0;
  }

  const highMotion = asleep.filter((sample) => sample.motionLevel > 0.68).length / asleep.length;
  const highHeartRate = asleep.filter((sample) => sample.heartRate > 92).length / asleep.length;
  return clamp(highMotion * 0.55 + highHeartRate * 0.45);
}

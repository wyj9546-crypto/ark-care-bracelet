import { updatePersonalBaseline } from './baseline';
import { clamp, mean } from './signalProcessing';
import { evaluateDefenseSignals } from './stateMachine';
import type { ConfidenceLevel, EngineDecision, EngineInput, RiskLevel } from './types';

function resolveRiskLevel(score: number, abnormalSignalCount: number): RiskLevel {
  if (score >= 0.72 && abnormalSignalCount >= 2) {
    return 'intervene';
  }

  if (score >= 0.48 || abnormalSignalCount >= 1) {
    return 'watch';
  }

  return 'normal';
}

function resolveConfidence(abnormalSignalCount: number, hasAcoustic: boolean): ConfidenceLevel {
  if (abnormalSignalCount >= 3 && hasAcoustic) {
    return 'high';
  }

  if (abnormalSignalCount >= 2) {
    return 'medium';
  }

  return 'low';
}

export function evaluateEmotionRisk(input: EngineInput): EngineDecision {
  const acoustic = input.acoustic ?? [];
  const signals = evaluateDefenseSignals({ ...input, acoustic });
  const abnormalSignals = signals.filter((signal) => signal.abnormal);
  const abnormalScales = new Set(abnormalSignals.map((signal) => signal.scale));

  const rawScore = mean(signals.map((signal) => signal.score));
  const scaleBonus = abnormalScales.size >= 2 ? 0.12 : 0;
  const score = clamp(rawScore + scaleBonus);
  const riskLevel = resolveRiskLevel(score, abnormalSignals.length);
  const confidence = resolveConfidence(abnormalSignals.length, acoustic.length > 0);

  const triggerIntervention = riskLevel === 'intervene' && abnormalScales.size >= 2;

  return {
    riskLevel,
    confidence,
    triggerIntervention,
    score,
    signals,
    summary: triggerIntervention
      ? '多时间尺度和多模态信号同步异常，系统建议输出高置信度干预触发。'
      : '当前信号不足以直接干预，系统继续观察并更新个体基线。',
    suggestedAction: triggerIntervention
      ? '先发出低打扰关怀提示，再由用户确认是否联系可信联系人。'
      : '维持轻量提醒，等待更多连续数据后再提高干预强度。',
    updatedBaseline: updatePersonalBaseline(input.baseline, input.physiological, input.behavior)
  };
}

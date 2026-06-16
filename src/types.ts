export type TimeScale = 'short' | 'medium' | 'long';

export type RiskLevel = 'normal' | 'watch' | 'intervene';

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export type SensorSample = {
  timestamp: string;
  heartRate: number;
  hrv: number;
  rriStability: number;
  sleepStage?: 'awake' | 'light' | 'deep' | 'rem';
  motionLevel: number;
  skinContact: boolean;
};

export type BehaviorSample = {
  timestamp: string;
  appSilenceMinutes: number;
  socialWithdrawalScore: number;
  routineDeviationScore: number;
};

export type AcousticCue = {
  timestamp: string;
  speechRate: number;
  pauseRatio: number;
  stressProsodyScore: number;
};

export type PersonalBaseline = {
  days: number;
  heartRateMean: number;
  hrvMean: number;
  hrvStd: number;
  sleepRegularityMean: number;
  withdrawalMean: number;
};

export type EngineInput = {
  physiological: SensorSample[];
  behavior: BehaviorSample[];
  acoustic?: AcousticCue[];
  baseline: PersonalBaseline;
};

export type DefenseSignal = {
  scale: TimeScale;
  name: string;
  abnormal: boolean;
  score: number;
  reason: string;
};

export type EngineDecision = {
  riskLevel: RiskLevel;
  confidence: ConfidenceLevel;
  triggerIntervention: boolean;
  score: number;
  signals: DefenseSignal[];
  summary: string;
  suggestedAction: string;
  updatedBaseline: PersonalBaseline;
};

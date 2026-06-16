export type CareLevel = 'steady' | 'attention' | 'connect';

export type Checkin = {
  date: string;
  mood: number;
  sleep: number;
  pressure: number;
  loneliness: number;
  note: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
};

export type BraceletStatus = {
  connected: boolean;
  heartRate: number;
  steps: number;
  activeMinutes: number;
  reminder: string;
  lastSync: string;
};

export type CareReport = {
  careLevel: CareLevel;
  moodTrend: 'up' | 'stable' | 'down';
  signals: string[];
  summary: string;
  suggestedAction: string;
  confidence: 'low' | 'medium' | 'high';
};

export type TrustedContact = {
  name: string;
  relation: string;
  phone: string;
  authorized: boolean;
};

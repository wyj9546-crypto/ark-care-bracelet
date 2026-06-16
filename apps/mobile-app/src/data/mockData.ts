import type { BraceletStatus, CareReport, ChatMessage, Checkin, TrustedContact } from '../types/models';

export const mockUser = {
  name: '林舟',
  greeting: '今天也慢慢来'
};

export const mockBracelet: BraceletStatus = {
  connected: true,
  heartRate: 76,
  steps: 4280,
  activeMinutes: 36,
  reminder: '今天也要照顾好自己',
  lastSync: '刚刚同步'
};

export const mockCheckins: Checkin[] = [
  { date: '06/01', mood: 4, sleep: 4, pressure: 3, loneliness: 3, note: '状态还可以。' },
  { date: '06/02', mood: 3, sleep: 3, pressure: 4, loneliness: 4, note: '有点累。' },
  { date: '06/03', mood: 3, sleep: 3, pressure: 4, loneliness: 4, note: '不太想说话。' },
  { date: '06/04', mood: 2, sleep: 2, pressure: 4, loneliness: 5, note: '睡得不太好。' },
  { date: '06/05', mood: 3, sleep: 2, pressure: 5, loneliness: 4, note: '想休息一下。' },
  { date: '06/06', mood: 2, sleep: 3, pressure: 4, loneliness: 5, note: '今天有些低落。' },
  { date: '今天', mood: 2, sleep: 3, pressure: 4, loneliness: 4, note: '还是想有人陪一下。' }
];

export const mockMessages: ChatMessage[] = [
  {
    id: 'm1',
    role: 'assistant',
    content: '我在这里。你可以只说一点点，也可以先不急着说。',
    time: '20:12'
  },
  {
    id: 'm2',
    role: 'user',
    content: '我今天不太想说话。',
    time: '20:13'
  },
  {
    id: 'm3',
    role: 'assistant',
    content: '没关系。我们可以先安静一会儿。你已经打开方舟了，这也是在照顾自己。',
    time: '20:13'
  }
];

export const mockReport: CareReport = {
  careLevel: 'attention',
  moodTrend: 'down',
  signals: ['最近几天心情评分偏低', '睡眠质量有所下降', '主动交流次数减少'],
  summary: '近 7 天状态有一些波动，可能需要更多休息和现实中的关心。这不是医学诊断，只是一份日常近况观察。',
  suggestedAction: '建议今晚先做一件轻松的小事，并向可信联系人发一句简单问候。',
  confidence: 'medium'
};

export const mockContact: TrustedContact = {
  name: '陈安',
  relation: '可信联系人',
  phone: '138****2046',
  authorized: true
};

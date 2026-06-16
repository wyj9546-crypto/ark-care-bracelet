import { mockBracelet, mockCheckins, mockContact, mockMessages, mockReport } from '../data/mockData';
import type { ChatMessage, Checkin } from '../types/models';

const wait = (ms = 260) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTodayOverview() {
  await wait();
  return {
    bracelet: mockBracelet,
    latestCheckin: mockCheckins[mockCheckins.length - 1],
    reminder: mockBracelet.reminder
  };
}

export async function saveCheckin(checkin: Checkin) {
  await wait(420);
  return {
    ok: true,
    message: '已记录。谢谢你认真照顾今天的自己。',
    checkin
  };
}

export async function getChatMessages() {
  await wait();
  return mockMessages;
}

export async function sendMessage(message: string): Promise<ChatMessage> {
  await wait(520);
  return {
    id: `assistant-${Date.now()}`,
    role: 'assistant',
    content: message.includes('睡')
      ? '睡得不好会让一天变得更难。今晚可以先把目标放小，只做一件让身体放松的事。'
      : '我听到了。你不需要马上变好，我们先把这一刻稳稳地接住。',
    time: '刚刚'
  };
}

export async function getCareReport() {
  await wait();
  return {
    report: mockReport,
    checkins: mockCheckins
  };
}

export async function getTrustedContact() {
  await wait();
  return mockContact;
}

export async function sendCareReminder() {
  await wait(500);
  return {
    ok: true,
    contact: mockContact,
    message: '已模拟发送给可信联系人。'
  };
}

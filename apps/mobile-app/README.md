# 方舟 Mobile App

这是 AI 关怀手环项目的手机 App MVP，面向比赛现场真机演示。

## 当前范围

- 统一 App，不按人群分流
- Warm Companion 视觉方向：暖米白、柔和珊瑚橙、低饱和青绿
- 本地 mock 数据，不依赖真实后端、LLM、短信或蓝牙
- 底部导航：今日 / 陪伴 / 近况 / 我的
- 内页：今日打卡、可信联系人、联系人收到提醒

## 演示流程

```text
今日页查看手环状态
-> 完成今日打卡
-> 陪伴页发送一句话
-> 近况页查看 7 天摘要
-> 用户确认提醒可信联系人
-> 联系人收到提醒模拟页
```

## 运行

```bash
npm install
npm run start
```

然后使用 Expo Go 扫码，在手机上运行。

## 设计与安全边界

- 不做医学诊断
- 不做心理疾病检测
- 不自动通知联系人
- 不展示聊天原文给联系人
- UI 文案使用“近况”“关怀信号”“可信联系人”，避免“风险诊断”“监护人”“异常告警”等表达

## 关键文件

```text
src/theme/theme.ts       设计 token
src/data/mockData.ts     演示数据
src/services/api.ts      mock API 封装
src/navigation/          底部导航与 stack
src/screens/             页面实现
src/components/          通用组件
```


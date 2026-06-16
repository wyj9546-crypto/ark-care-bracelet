# 方舟 Care Bracelet

方舟是一套面向长者与独居人群的智能守护手环概念原型，包含移动端交互、桌面演示、3D 外观展示，以及一套用于 PPT 展示的情绪异常识别引擎代码。

## 技术路线

情绪异常识别引擎由四个互相校验的机制组成：

- 时间窗口与三重防御：把连续生理与行为信号拆成短周期、30 分钟窗口和 7 天趋势，避免单点噪声直接触发。
- 多维度安全判断：融合 HRV、R-R 间期、睡眠阶段、行为节律与非语义声学线索。
- 个体化基线：以最近 7 天稳定数据为参照，降低不同用户之间的生理差异影响。
- 持续学习迭代：只在低噪声、低运动、佩戴稳定的数据上更新基线。

核心原则：只有多个时间尺度与多模态信号协同异常时，系统才输出高置信度干预触发；后续仍由用户确认是否联系可信联系人。

## 目录

```text
apps/mobile-app/                 Expo 移动端原型
apps/mobile-app/src/engine/       情绪异常识别引擎
recording-demo/                   PPT/录屏用交互演示页
watch-3d/                         手环 3D 展示
desktop-app/                      Windows 桌面包装演示
```

## 算法入口

```ts
import { evaluateEmotionRisk, demoEngineInput } from './src/engine';

const decision = evaluateEmotionRisk(demoEngineInput);

console.log(decision.riskLevel);
console.log(decision.confidence);
console.log(decision.triggerIntervention);
```

返回结果包含：

- `riskLevel`: `normal`、`watch` 或 `intervene`
- `confidence`: `low`、`medium` 或 `high`
- `triggerIntervention`: 是否进入干预触发
- `signals`: 四类防御信号及其异常原因
- `updatedBaseline`: 迭代后的个体基线

## 本地运行

```bash
cd apps/mobile-app
npm install
npm run typecheck
npm run web
```

本项目当前主要用于比赛展示和 PPT 说明，不用于医学诊断或紧急救援判断。

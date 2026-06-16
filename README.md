# 情绪异常识别引擎

这是一个按照 PPT 技术路线整理的 TypeScript 算法示例，重点展示“从信号采集到异常判定，再到长期个体化优化”的完整算法闭环。

项目只包含情绪异常识别相关代码，不包含手环 3D 展示、移动端 App 原型或 AI 对话演示页。

## 算法闭环

核心判断原则：

> 只有多时间尺度与多模态信号协同异常时，系统才输出高置信度干预触发；随后通过个体化反馈持续降低误报。

对应四个机制：

1. 时间窗口与状态机  
   短期、中期、长期窗口依次递进；只有跨尺度协同异常，才进入高置信触发。

2. 多维度全面判断  
   融合 HRV、R-R 间期稳定性、触控/佩戴节律、睡眠阶段、行为节律与非语义声学线索。

3. 弹性阈值参考  
   以过去 7 天个体动态数据为基线，实时计算偏离度，并随长期状态漂移校正。

4. 自我进化与迭代  
   干预后的状态变化作为隐式反馈，设备端增量学习，让分类边界向个体特征收敛。

## 目录结构

```text
src/
  types.ts              输入/输出数据结构
  signalProcessing.ts   窗口、均值、标准差、z-score 等基础信号处理
  baseline.ts           个体基线更新
  stateMachine.ts       三重防御状态机与多模态信号评分
  emotionEngine.ts      总决策入口
  demoScenario.ts       PPT 展示用模拟输入
  index.ts              对外导出
```

## 使用示例

```ts
import { demoEngineInput, evaluateEmotionRisk } from './src';

const decision = evaluateEmotionRisk(demoEngineInput);

console.log(decision.riskLevel);
console.log(decision.confidence);
console.log(decision.triggerIntervention);
console.log(decision.signals);
```

## 返回结果

`evaluateEmotionRisk` 会返回：

- `riskLevel`: `normal`、`watch` 或 `intervene`
- `confidence`: `low`、`medium` 或 `high`
- `triggerIntervention`: 是否输出干预触发
- `signals`: 四类算法机制对应的异常信号
- `summary`: 面向产品层的判断摘要
- `suggestedAction`: 建议动作
- `updatedBaseline`: 更新后的个体化基线

## 验证

```bash
npm install
npm run typecheck
```

说明：本项目用于比赛/PPT 展示，不构成医学诊断、心理诊断或紧急救援系统。

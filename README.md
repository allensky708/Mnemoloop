# Mnemoloop(中文版)

> Obsidian 中主动学习的一层。
> 由 FSRS 驱动的间隔重复，让你的笔记保持整洁。

[English](./README.en.md) | **简体中文**

这是 [Mnemoloop](https://github.com/Marco-Pozzecco/mnemoloop-plugin) 的简体中文本地化版本，基于上游 `2.1.1`，使用 i18n 实现中英双语界面。当前版本 **2.1.3**，插件 ID 为 `mnemoloop-zh`，名称为 **Mnemoloop(中文版)**。

界面语言默认跟随 Obsidian，也可以在 **设置 → Mnemoloop(中文版) → Language** 中手动选择 `跟随 Obsidian`、`English` 或 `简体中文`。

汉化与维护：[allensky708](https://github.com/allensky708)。原项目版权归 Marco Pozzecco 所有，按 MIT 协议发布。

---

## 为什么选择 Mnemoloop？

### 笔记保持原样

每张卡片都是独立目录中的 Markdown 文件，通过 YAML frontmatter 链接回来源笔记。你的思考空间不会被 `!!`、`??` 之类的标记污染。

### FSRS 原生集成

Mnemoloop 把 FSRS 调度直接带进 Obsidian。它与现代 Anki 使用同类的科学调度算法：更高的记忆保持率、更少的复习次数、不用切换应用。

### 为移动端设计

左右滑动评分，点击翻面，响应式布局。手机和桌面都能在 Obsidian 内原生使用。

### 可靠

双数据源：查询用快速的 JSON 索引，透明与恢复用每张卡片上的 YAML frontmatter。即使索引损坏，所有 SRS 数据仍保存在 Markdown 中，可以完整重建。

---

## 功能

| 功能 | 说明 |
| --- | --- |
| 🧠 **FSRS 调度** | 科学验证的间隔重复算法，用更少复习获得更好记忆 |
| 📄 **一张卡片 = 一个文件** | 独立 Markdown 文件，可移植、可版本控制，不修改来源笔记 |
| 📊 **学习仪表盘** | 热力图、牌组树、每日目标和记忆保持率 |
| 🔒 **本地优先** | 核心功能完全离线，无遥测、无数据挖掘 |
| 🏗️ **自愈数据** | JSON 索引 + YAML 双数据源，索引损坏可恢复 |
| ⚡ **高性能** | 懒加载、防抖监听，面向 5 万张卡片优化 |
| 📈 **学习统计** | 跟踪保持率、复习预测和累计进度 |
| 📱 **移动端触控** | 左右滑动评分、点击翻面 |
| 🔔 **失效检测** | 来源笔记修改后，关联卡片自动标记为 `STALE`（已失效） |

---

## 安装

### 手动安装（推荐用于本汉化版）

1. 直接下载本仓库根目录的 `main.js`、`manifest.json`、`styles.css`，或下载 `release/mnemoloop-zh-2.1.3.zip` 解压使用。
2. 在仓库中创建目录：

   ```text
   <你的仓库>/.obsidian/plugins/mnemoloop-zh/
   ```

3. 把三个文件放入该目录。
4. 在 Obsidian 中打开 **设置 → 第三方插件**，关闭安全模式并启用 **Mnemoloop(中文版)**。

> **与官方版的关系**
>
> - 本版使用独立 ID `mnemoloop-zh`，安装目录是 `.obsidian/plugins/mnemoloop-zh/`，可以和官方 `mnemoloop` 并存；
> - 两个插件会索引同一批卡片 Markdown 文件，同时启用会互相写 YAML 和调度数据，**不建议同时启用**；日常使用只启用一个；
> - 从 2.1.2 或更早版本升级时，设置不会自动迁移。需要旧设置可把 `data.json` 从 `.obsidian/plugins/mnemoloop/` 复制到 `.obsidian/plugins/mnemoloop-zh/`；卡片文件本身不受影响。

### 从源码构建

```bash
npm install --legacy-peer-deps
npm run build
```

构建产物：`main.js`、`manifest.json`、`styles.css`。

开发模式：

```bash
npm run dev
```

---

## 快速开始

### 创建第一张卡片

- 打开命令面板（`Ctrl/⌘ + P`），执行 **创建卡片**；
- 或在文件管理器中右键一篇笔记，选择 **从文件创建卡片**，来源会自动填入该笔记的链接；
- 选择 **基础 / 排序 / 选择 / 填空 / 遮挡** 标签页，填写内容，可分配一个或多个牌组，然后确认。

卡片会保存为独立 Markdown 文件并自动打开。

### 复习

打开命令面板，执行 **打开仪表盘**，查看学习统计并开始复习。

复习时：

- **空格** —— 翻面 / 继续
- **1 / 2 / 3 / 4** —— 重来 / 困难 / 良好 / 简单
- **U** 或左上角按钮 —— 撤销上次评分
- 移动端：左右滑动评分，点击翻面

### 牌组

用 YAML frontmatter 给卡片分配牌组：

```yaml
---
decks:
  - 数学::线性代数
  - 计算机::算法
---
```

一张卡片可以属于多个牌组。在卡片表单中用逗号分隔，例如 `数学::线性代数, 计算机::算法`；用 `::` 表示嵌套牌组。没有牌组的卡片会显示在牌组树的 **未分类** 下。

---

## 卡片格式

每张卡片都是一个带 YAML frontmatter 的 Markdown 文件：

```markdown
---
uuid: 550e8400-e29b-41d4-a716-446655440000
source: '[[生物学/细胞生物学.md]]'
status: ACTIVE
decks:
  - 生物::细胞结构
card_type: basic
stability: 4.5
difficulty: 3.2
elapsed_days: 3
scheduled_days: 5
learning_steps: 1
reps: 4
lapses: 0
state: Review
last_review: 2026-05-10T09:00:00Z
due: 2026-05-15T09:00:00Z
---

细胞的能量工厂是什么？

?

线粒体。
```

`card_type` 选择卡片格式（默认 `basic`），`?` 是问答分隔符（可在设置中修改）。所有 SRS 元数据都保存在 YAML 中，透明、可编辑、可移植。

### 卡片类型

#### 基础（Basic）

一个问题和一个答案，用分隔符（默认 `?`）分开，复习时翻面后手动评分。

#### 排序（Sequence）

一个问题加一组有序步骤（至少两步）。复习时步骤会被打乱，拖动恢复正确顺序（移动端支持触摸拖动），按最终顺序自动评分。

#### 选择（Quiz）

一个问题加多个选项，正确选项用 `[x]` 标记。复习时选项会打乱，按选择自动评分。

#### 填空（Cloze）

用 `{{c1::答案}}`（可写 `{{c1::答案::提示}}`）标记挖空。复习时逐个揭示，手动评分。

#### 遮挡（Occlusion）

在一张图片上绘制多个遮挡区域，每个区域对应一个答案；复习时逐个选择区域并作答。

---

## 命令

| 位置 | 命令 | 说明 |
| --- | --- | --- |
| 命令面板 | 打开仪表盘 | 打开学习仪表盘 |
| 命令面板 | 创建卡片 | 打开卡片表单 |
| 文件菜单 | 从文件创建卡片 | 打开表单并预填所选 Markdown 文件的链接 |

---

## 语言与本地化

- 界面语言默认跟随 Obsidian 的语言设置。
- 可在 **设置 → Mnemoloop(中文版) → Language** 中切换为 English 或简体中文。
- 切换后仪表盘、复习、管理、统计等界面会立即更新；Obsidian 的命令名称和设置页标签可能需要重新打开设置或重启 Obsidian 才会完全更新。

---

## 参与开发

```bash
npm install --legacy-peer-deps
npm run dev        # 开发模式，热重载
npm test -- --run  # 运行测试
npm run lint       # 检查 TypeScript 与 Svelte
npm run build      # 生产构建
npm run format     # Prettier 格式化
```

架构说明、代码模式与约定见 [`AGENTS.md`](./AGENTS.md)。

---

## 技术栈

- **TypeScript** —— 严格模式、路径别名 `@/*`
- **Svelte 5** —— Runes 响应式 UI
- **Vite** —— 构建并自动复制到 Obsidian 插件目录
- **FSRS** —— 使用 `ts-fsrs` 进行调度
- **Vitest** —— 单元测试，模拟 Obsidian API
- **Zod** —— 运行时 schema 校验
- **bits-ui** —— 无头 Svelte UI 原语
- **@dnd-kit/svelte** —— 排序卡片的拖放
- **layerchart** —— 仪表盘数据可视化

---

## 许可证

[MIT](./LICENSE.md) © 2026 Marco Pozzecco

简体中文本地化部分由 allensky708 维护，同样以 MIT 协议发布。

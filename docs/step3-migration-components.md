# Step3: Chakra UI → CSS Modules 移行計画（アプローチB: 共通UIコンポーネント方式）

## 概要

**ブランチ名**: `migration-components`

Chakra UIの代替となる共通UIコンポーネントライブラリを構築し、各ページはそれを使用する方式。
デザインの一貫性が高く、長期的なメンテナンスに優れる。

### メリット
- ✅ デザインの一貫性が保たれる
- ✅ コードの再利用性が高い
- ✅ メンテナンスが容易
- ✅ Chakra UIと同様の使い勝手を維持

### デメリット
- ❌ 初期の実装コストが高い
- ❌ Issue #1〜#7が完了するまで他のIssueに着手できない

---

## 作業フロー

```
1. migration-components ブランチを作成
2. .claude/* を設定
3. スクリーンショット用のChrome環境をセットアップ（初回のみ）
4. Phase 1: 共通UIコンポーネント構築（Issue #1〜#7）
   - 順番に依存関係を解消しながら実装
5. Phase 2: ページ移行（Issue #8〜#18）※並行作業可能
   a. issue-c-<number> ブランチを作成
   b. /screenshot でBefore取得
   c. /migrate-page で移行作業
   d. /screenshot でAfter取得
   e. /compare で比較レポート生成
   f. /create-pr でPR作成
6. Phase 3: 完全削除（Issue #19）
7. レビュー・マージ（人間が実施）
```

---

## スクリーンショット取得環境のセットアップ

Firebase Auth（Googleログイン）を使用しているため、agent-browserのCDP Modeで認証済みブラウザに接続する。

### 初回セットアップ（人間が実施）

```bash
# 1. 既存のChromeを全て終了
pkill -9 Chrome

# 2. 新しいプロファイルでChromeをデバッグポート付きで起動
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-debug-profile &

# 3. 開いたChromeで http://localhost:3000/login にアクセス
# 4. Googleログインを完了（人間が操作）
```

### スクリーンショット取得（Claude Codeが実行）

```bash
# CDPモードで接続してスクショ取得
agent-browser --cdp 9222 open http://localhost:3000/<page>
agent-browser --cdp 9222 screenshot screenshots/<name>.png --full
```

### 注意事項
- Chromeセッションが切れた場合は再度ログインが必要
- `--user-data-dir=/tmp/chrome-debug-profile` を使うとログイン状態が保持される
- 開発サーバー（`npm run dev`）が起動していること

---

## .claude/ ディレクトリ設計

`migration-components` ブランチ専用の `.claude/` 設定を作成する。

### ディレクトリ構造

```
.claude/
├── CLAUDE.md                          # プロジェクト指示
├── settings.json                      # チーム共有設定
│
├── skills/                            # カスタムスラッシュコマンド
│   ├── create-component/SKILL.md      # /create-component <name>
│   ├── migrate-page/SKILL.md          # /migrate-page <page>
│   ├── screenshot/SKILL.md            # /screenshot <position>
│   ├── compare/SKILL.md               # /compare <issue-number>
│   ├── create-issue/SKILL.md          # /create-issue
│   └── create-pr/SKILL.md             # /create-pr
│
├── agents/                            # カスタムエージェント
│   ├── component-builder/agent.md     # UIコンポーネント構築
│   └── migration-checker/agent.md     # 移行品質チェッカー
│
├── hooks/                             # フックスクリプト
│   ├── lint-on-edit.sh                # 編集後リントチェック
│   └── component-export-check.sh      # index.tsエクスポート確認
│
└── rules/                             # ルールファイル
    ├── ui-components.md               # UIコンポーネント設計規約
    ├── css-modules.md                 # CSS Modulesコーディング規約
    ├── migration-workflow.md          # 移行ワークフロー
    └── chakra-api-mapping.md          # Chakra UI API対応表
```

---

### .claude/CLAUDE.md

```markdown
# TaskFlow - Chakra UI → CSS Modules 移行プロジェクト

## アプローチ
**共通UIコンポーネント方式（アプローチB）**

Chakra UIの代替となる共通UIコンポーネントライブラリを構築する。

## 技術スタック
- Next.js 16.1.3 (Page Router)
- React 19.2.3
- TypeScript 5.9.3
- CSS Modules
- framer-motion（アニメーション維持）
- react-hot-toast（useToast代替）

## 重要なルール
@.claude/rules/ui-components.md
@.claude/rules/css-modules.md
@.claude/rules/migration-workflow.md
@.claude/rules/chakra-api-mapping.md

## よく使うコマンド
- ビルド: `npm run build`
- 開発: `npm run dev`
- リント: `npm run lint`

## 作業フェーズ

### Phase 1: 共通UIコンポーネント構築
`/create-component <name>` でコンポーネントを作成

### Phase 2: ページ移行
`/migrate-page <page-name>` で移行

### Phase 3: 完全削除
Chakra UI関連パッケージを削除

## コンポーネントインポート
```tsx
import { Button, Card, Modal } from '@/components/ui';
```
```

---

### .claude/settings.json

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(npx eslint *)",
      "Bash(git checkout *)",
      "Bash(git branch *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git push *)",
      "Bash(gh issue *)",
      "Bash(gh pr *)",
      "Bash(agent-browser *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/lint-on-edit.sh",
            "timeout": 30
          },
          {
            "type": "command",
            "command": ".claude/hooks/component-export-check.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "agent": "migration-checker",
            "prompt": "移行作業が完了したかチェックしてください",
            "timeout": 60
          }
        ]
      }
    ]
  }
}
```

---

### .claude/skills/create-component/SKILL.md

```yaml
---
name: create-component
description: 共通UIコンポーネントを作成する
argument-hint: "<ComponentName>"
user-invocable: true
allowed-tools: Read, Edit, Write, Glob, Grep
---

# $ARGUMENTS コンポーネントの作成

## 作成ファイル
- `components/ui/$ARGUMENTS.tsx`
- `components/ui/$ARGUMENTS.module.css`

## 手順

1. Chakra UIの$ARGUMENTSコンポーネントのAPIを確認
2. 同等のPropsインターフェースを定義
3. CSS Modulesでスタイルを実装
4. `components/ui/index.ts` にエクスポートを追加

## 設計規約
@.claude/rules/ui-components.md を参照

## API対応表
@.claude/rules/chakra-api-mapping.md を参照

## コンポーネントテンプレート

```tsx
import React from 'react';
import styles from './$ARGUMENTS.module.css';

export interface $ARGUMENTSProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  colorScheme?: 'blue' | 'teal' | 'green' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

export const $ARGUMENTS: React.FC<$ARGUMENTSProps> = ({
  variant = 'solid',
  colorScheme = 'blue',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const classNames = [
    styles.base,
    styles[variant],
    styles[colorScheme],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};
```
```

---

### .claude/skills/migrate-page/SKILL.md

```yaml
---
name: migrate-page
description: 指定したページを共通UIコンポーネントを使って移行する
argument-hint: "<page-name>"
user-invocable: true
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# $ARGUMENTS ページの移行

## 手順

1. 対象ファイルを読み込む
2. 使用されているChakra UIコンポーネントを特定
3. 共通UIコンポーネントへの置換を実施
4. ページ固有のスタイルが必要な場合は `styles/pages/$ARGUMENTS.module.css` を作成
5. framer-motionアニメーションを維持
6. TypeScriptエラーがないことを確認

## 置換パターン

### Before (Chakra UI)
```tsx
import { Box, Button, Card } from '@chakra-ui/react';

<Box p={8} bg="gray.50">
  <Card>
    <Button colorScheme="blue">Click</Button>
  </Card>
</Box>
```

### After (共通UIコンポーネント)
```tsx
import { Box, Button, Card } from '@/components/ui';

<Box p={8} bg="gray.50">
  <Card>
    <Button colorScheme="blue">Click</Button>
  </Card>
</Box>
```

## 注意事項
- インポートパスを `@chakra-ui/react` → `@/components/ui` に変更
- Chakra UI固有のpropsが共通コンポーネントでサポートされているか確認
- サポートされていない場合はページ固有のCSSで対応
```

---

### .claude/skills/screenshot/SKILL.md

```yaml
---
name: screenshot
description: agent-browserでスクリーンショットを取得する（CDP Mode）
argument-hint: "<before|after> [position]"
user-invocable: true
allowed-tools: Bash, Read
---

# スクリーンショット取得

現在のissueブランチ名からissue番号を取得し、スクリーンショットを保存する。
CDP Mode で認証済みChromeに接続してスクリーンショットを取得する。

## 引数
- $0: before または after
- $1: position名（省略時は全影響箇所）

## 保存先
screenshots/issue-c-<issue-number>/<position>-$0.png

## 実行コマンド（CDP Mode）
```bash
agent-browser --cdp 9222 open "http://localhost:3000/<path>"
agent-browser --cdp 9222 screenshot "screenshots/issue-c-<issue-number>/<position>-$0.png" --full
```

## 注意
- 開発サーバーが起動していること
- Chrome がデバッグポート9222で起動していること
- Chrome で事前にログイン認証が完了していること
- position名は影響箇所リストを参照
```

---

### .claude/skills/compare/SKILL.md

```yaml
---
name: compare
description: Before/Afterスクリーンショットを比較する
argument-hint: "[issue-number]"
user-invocable: true
allowed-tools: Read, Bash
---

# Before/After 比較

## 手順

1. screenshots/issue-c-$ARGUMENTS/ 内のファイルを取得
2. 各positionのbefore/afterペアを特定
3. 画像を読み込んで視覚的に比較
4. 差異があれば報告

## 比較基準
- レイアウトの崩れがないか
- 色・フォントが維持されているか
- ホバー・フォーカス状態が正しいか
- レスポンシブが正しく動作するか
- アニメーションが維持されているか

## 出力
比較レポートを生成し、PRの説明に含める内容を提案
```

---

### .claude/skills/create-issue/SKILL.md

```yaml
---
name: create-issue
description: 移行タスク用のGitHub Issueを作成する
argument-hint: "<title>"
user-invocable: true
allowed-tools: Bash, Read
---

# GitHub Issue 作成

## テンプレート（共通UIコンポーネント用）

```
## 概要
$ARGUMENTS の作成/移行

## Phase
- [ ] Phase 1: 共通UIコンポーネント構築
- [ ] Phase 2: ページ移行
- [ ] Phase 3: 完全削除

## 対象ファイル
- components/ui/xxx.tsx
- components/ui/xxx.module.css

## API仕様
Chakra UIの$ARGUMENTSと同等のAPIを提供

## チェックリスト
- [ ] コンポーネント実装
- [ ] CSS Modules実装
- [ ] index.tsにエクスポート追加
- [ ] TypeScript型定義
- [ ] ビルド成功
```

## コマンド
```bash
gh issue create --title "$ARGUMENTS" --body "..."
```
```

---

### .claude/skills/create-pr/SKILL.md

```yaml
---
name: create-pr
description: 移行完了後のPRを作成する
argument-hint: ""
user-invocable: true
allowed-tools: Bash, Read
---

# PR 作成

## 手順

1. 現在のブランチ名からissue番号を取得
2. 変更ファイルを確認
3. Before/After比較結果を取得（ページ移行の場合）
4. PRを作成

## PRテンプレート（共通UIコンポーネント用）

```
## Summary
- 共通UIコンポーネント追加: $COMPONENT_NAME

## 新規ファイル
- components/ui/$COMPONENT_NAME.tsx
- components/ui/$COMPONENT_NAME.module.css

## API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'solid' | ... |
| colorScheme | string | 'blue' | ... |

## 使用例
\`\`\`tsx
import { $COMPONENT_NAME } from '@/components/ui';

<$COMPONENT_NAME variant="outline" colorScheme="teal">
  Content
</$COMPONENT_NAME>
\`\`\`

Closes #<issue-number>
```

## PRテンプレート（ページ移行用）

```
## Summary
- Chakra UI → 共通UIコンポーネント 移行完了
- 対象: <page-name>

## スクリーンショット比較
| Before | After |
|--------|-------|
| ![before](screenshots/...) | ![after](screenshots/...) |

## チェックリスト
- [x] ビルド成功
- [x] 視覚的差異なし
- [x] アニメーション維持

Closes #<issue-number>
```

## 注意
画像のアップロードは人間が行う
```

---

### .claude/agents/component-builder/agent.md

```yaml
---
name: component-builder
description: 共通UIコンポーネントを構築するエージェント。Chakra UIのAPIを分析し、同等のコンポーネントを作成
tools: Read, Edit, Write, Glob, Grep
model: sonnet
---

# 共通UIコンポーネント構築エージェント

## 役割
Chakra UIコンポーネントのAPIを分析し、CSS Modulesを使用した同等のコンポーネントを構築する。

## 構築手順

1. **API分析**
   - Chakra UIドキュメントを参照
   - 使用されているpropsを特定
   - 必要な機能を洗い出し

2. **インターフェース設計**
   - TypeScript型定義を作成
   - Chakra UIと同等のprops APIを提供

3. **実装**
   - CSS Modulesでスタイルを実装
   - バリアント（variant, colorScheme, size）対応
   - framer-motion統合（必要な場合）

4. **エクスポート**
   - components/ui/index.ts に追加

## 品質基準
- Chakra UIと同じAPIで使用可能
- TypeScript型安全
- アクセシビリティ対応
- レスポンシブ対応
```

---

### .claude/agents/migration-checker/agent.md

```yaml
---
name: migration-checker
description: 移行作業の品質をチェックするエージェント。作業完了時に自動実行
tools: Read, Grep, Glob, Bash
disallowedTools: Write, Edit
model: haiku
---

# 移行品質チェッカー

## チェック項目

1. **Chakra UI残存チェック**
   - `@chakra-ui` のimportが残っていないか
   - Chakra UIコンポーネントの使用箇所がないか

2. **共通UIコンポーネント使用チェック**
   - `@/components/ui` からインポートしているか
   - 正しいコンポーネントを使用しているか

3. **エクスポートチェック**
   - 新規コンポーネントが index.ts にエクスポートされているか

4. **TypeScriptチェック**
   - 型エラーがないか

5. **ビルドチェック**
   - npm run build が成功するか

## 出力
問題があれば具体的な修正箇所を報告
```

---

### .claude/hooks/lint-on-edit.sh

```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ "$FILE_PATH" == *.ts || "$FILE_PATH" == *.tsx ]]; then
  npx eslint "$FILE_PATH" --fix 2>&1
fi

exit 0
```

---

### .claude/hooks/component-export-check.sh

```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ "$FILE_PATH" == components/ui/*.tsx && "$FILE_PATH" != components/ui/index.ts ]]; then
  COMPONENT_NAME=$(basename "$FILE_PATH" .tsx)
  if ! grep -q "export.*$COMPONENT_NAME" components/ui/index.ts 2>/dev/null; then
    echo "Warning: $COMPONENT_NAME is not exported from components/ui/index.ts"
  fi
fi

exit 0
```

---

### .claude/rules/ui-components.md

```markdown
# 共通UIコンポーネント設計規約

## ディレクトリ構造
```
components/ui/
├── Button.tsx
├── Button.module.css
├── Card.tsx
├── Card.module.css
├── ...
└── index.ts          # 一括エクスポート
```

## コンポーネント設計原則

### 1. Props設計
- Chakra UIと同等のAPIを提供
- HTMLネイティブ属性を継承（React.HTMLAttributes）
- オプショナルなpropsにはデフォルト値を設定

### 2. スタイリング
- CSS Modulesを使用
- CSS変数で色・スペーシングを管理
- バリアント（variant, colorScheme, size）対応

### 3. アクセシビリティ
- 適切なaria属性
- キーボードナビゲーション対応
- フォーカス管理

### 4. TypeScript
- 厳密な型定義
- Propsインターフェースをエクスポート

## コンポーネントテンプレート

```tsx
import React from 'react';
import styles from './ComponentName.module.css';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  colorScheme?: 'blue' | 'teal' | 'green' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'solid',
  colorScheme = 'blue',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const classNames = [
    styles.base,
    styles[variant],
    styles[colorScheme],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};
```

## index.ts エクスポート

```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Card, CardHeader, CardBody } from './Card';
export type { CardProps } from './Card';

// ... すべてのコンポーネント
```
```

---

### .claude/rules/css-modules.md

```markdown
# CSS Modules コーディング規約

## ファイル配置
- 共通UI: `components/ui/<Component>.module.css`
- ページ固有: `styles/pages/<page-name>.module.css`

## 命名規則
- クラス名: camelCase
- CSS変数: kebab-case

## 必須CSS変数使用
`styles/variables.css` の変数を必ず使用：

```css
.button {
  padding: var(--spacing-2) var(--spacing-4);
  background-color: var(--color-blue-500);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  transition: var(--transition-base);
}
```

## バリアント対応パターン

```css
/* Base */
.base {
  /* 共通スタイル */
}

/* Variant */
.solid { /* ... */ }
.outline { /* ... */ }
.ghost { /* ... */ }

/* ColorScheme */
.blue { /* ... */ }
.teal { /* ... */ }
.green { /* ... */ }

/* Size */
.sm { /* ... */ }
.md { /* ... */ }
.lg { /* ... */ }

/* Variant + ColorScheme 組み合わせ */
.solid.blue {
  background-color: var(--color-blue-500);
  color: white;
}

.outline.blue {
  border-color: var(--color-blue-500);
  color: var(--color-blue-500);
}
```
```

---

### .claude/rules/migration-workflow.md

```markdown
# 移行ワークフロー

## Phase 1: 共通UIコンポーネント構築（Issue #1〜#7）

### 依存関係順に実装
1. Issue #1: 基盤（CSS変数、globals.css）
2. Issue #2: Box, Text, Stack
3. Issue #3: Button, Input, Textarea, Select, FormControl, Checkbox, Radio, Switch
4. Issue #4: Badge, Avatar, Card, Alert, Spinner
5. Issue #5: Modal, Tooltip
6. Issue #6: Menu, Tabs
7. Issue #7: Table, Stat, Progress, IconButton

### コンポーネント作成手順
```
/create-component <ComponentName>
```

## Phase 2: ページ移行（Issue #8〜#18）※並行作業可能

### 移行手順
1. ブランチ作成: `git checkout -b issue-c-<number>`
2. Before取得: `/screenshot before`
3. 移行実行: `/migrate-page <page-name>`
4. After取得: `/screenshot after`
5. 比較: `/compare`
6. PR作成: `/create-pr`

## Phase 3: 完全削除（Issue #19）

1. Chakra UI関連パッケージ削除
2. _app.tsx から ChakraProvider 削除
3. _document.tsx から Emotion 削除
4. 全ページ動作確認
5. バンドルサイズ確認
```

---

### .claude/rules/chakra-api-mapping.md

```markdown
# Chakra UI → 共通UIコンポーネント API対応表

## 完全互換コンポーネント
以下のコンポーネントはChakra UIと同じAPIで使用可能：

| Chakra UI | 共通UI | 主要Props |
|-----------|--------|-----------|
| Button | Button | variant, colorScheme, size, isLoading, leftIcon, rightIcon |
| Badge | Badge | variant, colorScheme |
| Card | Card | variant |
| Alert | Alert | status |
| Avatar | Avatar | size, src, name |
| Input | Input | size, variant |
| Textarea | Textarea | size, variant |
| Select | Select | size, variant |
| Checkbox | Checkbox | size, colorScheme |
| Radio | Radio | size, colorScheme |
| Switch | Switch | size, colorScheme |
| Spinner | Spinner | size, colorScheme |
| Progress | Progress | value, colorScheme |

## レイアウトコンポーネント
| Chakra UI | 共通UI | 対応Props |
|-----------|--------|-----------|
| Box | Box | p, m, bg, color, borderRadius, shadow |
| Flex | Flex | direction, justify, align, gap |
| VStack | VStack | spacing, align |
| HStack | HStack | spacing, align |
| Stack | Stack | direction, spacing |

## 複合コンポーネント
| Chakra UI | 共通UI |
|-----------|--------|
| Card, CardHeader, CardBody | Card, CardHeader, CardBody |
| Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton | 同名 |
| Menu, MenuButton, MenuList, MenuItem | 同名 |
| Tabs, TabList, Tab, TabPanels, TabPanel | 同名 |
| Table, Thead, Tbody, Tr, Th, Td | 同名 |
| Stat, StatLabel, StatNumber, StatHelpText | 同名 |
| FormControl, FormLabel, FormErrorMessage | 同名 |

## Hooks置換
| Chakra UI | 代替 |
|-----------|------|
| useDisclosure | useState |
| useToast | react-hot-toast |
| useColorModeValue | CSS変数 |
```

---

## Issue一覧（19 Issues）

### Phase 1: 共通UIコンポーネント構築

| # | タイトル | 難易度 |
|---|---------|--------|
| 1 | 基盤構築（CSS変数、globals.css） | ⭐ |
| 2 | レイアウトコンポーネント（Box, Text, Stack） | ⭐ |
| 3 | フォームコンポーネント | ⭐⭐⭐ |
| 4 | 表示系コンポーネント（Badge, Avatar, Card, Alert） | ⭐⭐ |
| 5 | Modal, Tooltip | ⭐⭐⭐ |
| 6 | Menu, Tabs | ⭐⭐⭐⭐ |
| 7 | Table, Stat, Progress | ⭐⭐ |

### Phase 2: ページ移行（並行作業可能）

| # | タイトル | 難易度 |
|---|---------|--------|
| 8 | 共通レイアウトの移行 | ⭐⭐⭐ |
| 9 | プロフィールページの移行 | ⭐ |
| 10 | チームメンバーページの移行 | ⭐⭐ |
| 11 | カレンダーページの移行 | ⭐⭐ |
| 12 | ダッシュボードの移行 | ⭐ |
| 13 | プロジェクト一覧の移行 | ⭐⭐ |
| 14 | プロジェクト詳細の移行 | ⭐⭐⭐ |
| 15 | タスク一覧の移行 | ⭐⭐ |
| 16 | タスク作成/編集の移行 | ⭐⭐ |
| 17 | レポートページの移行 | ⭐⭐ |
| 18 | 設定ページの移行 | ⭐⭐ |

### Phase 3: 完全削除

| # | タイトル | 難易度 |
|---|---------|--------|
| 19 | Chakra UI完全削除・最終調整 | ⭐⭐ |

---

## 成功基準

### 共通UIコンポーネント
- ✅ Chakra UIと同等のAPIで使用可能
- ✅ TypeScript型安全
- ✅ バリアント（variant, colorScheme, size）対応
- ✅ アクセシビリティ対応

### ページ移行
- ✅ Before/Afterスクリーンショットで視覚的に同等
- ✅ インポートパスが `@/components/ui` に変更
- ✅ framer-motionアニメーションが維持
- ✅ ビルド成功

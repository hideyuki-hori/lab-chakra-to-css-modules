# Step3: Chakra UI → CSS Modules 移行計画（アプローチA: 直接適用方式）

## 概要

**ブランチ名**: `migration-direct`

各ページファイルで直接CSS Modulesを使用してスタイリングする方式。
共通UIコンポーネントは最小限（Modal, Tooltip, Menu等の複雑なもののみ）に留める。

### メリット
- ✅ シンプルで理解しやすい
- ✅ 各ページが独立しており、並行作業が容易
- ✅ 初期の学習コストが低い

### デメリット
- ❌ スタイルの重複が発生しやすい
- ❌ デザインの一貫性を保つのが難しい

---

## 作業フロー

```
1. migration-direct ブランチを作成
2. .claude/* を設定
3. スクリーンショット用のChrome環境をセットアップ（初回のみ）
4. 各issueごとに:
   a. issue-d-<number> ブランチを作成
   b. 影響箇所にposition名を付与
   c. /screenshot でBefore取得
   d. 移行作業
   e. /screenshot でAfter取得
   f. /compare で比較レポート生成
   g. /create-pr でPR作成
5. レビュー・マージ（人間が実施）
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

`migration-direct` ブランチ専用の `.claude/` 設定を作成する。

### ディレクトリ構造

```
.claude/
├── CLAUDE.md                          # プロジェクト指示
├── settings.json                      # チーム共有設定
│
├── skills/                            # カスタムスラッシュコマンド
│   ├── migrate/SKILL.md               # /migrate <page>
│   ├── screenshot/SKILL.md            # /screenshot <position>
│   ├── compare/SKILL.md               # /compare <issue-number>
│   ├── create-issue/SKILL.md          # /create-issue
│   └── create-pr/SKILL.md             # /create-pr
│
├── agents/                            # カスタムエージェント
│   └── migration-checker/agent.md     # 移行品質チェッカー
│
├── hooks/                             # フックスクリプト
│   └── lint-on-edit.sh                # 編集後リントチェック
│
└── rules/                             # ルールファイル
    ├── css-modules.md                 # CSS Modulesコーディング規約
    ├── migration-workflow.md          # 移行ワークフロー
    └── chakra-replacement.md          # Chakra UI置換表
```

---

### .claude/CLAUDE.md

```markdown
# TaskFlow - Chakra UI → CSS Modules 移行プロジェクト

## アプローチ
**直接CSS Modules適用方式（アプローチA）**

各ページで直接CSS Modulesを使用する。共通UIコンポーネントは最小限。

## 技術スタック
- Next.js 16.1.3 (Page Router)
- React 19.2.3
- TypeScript 5.9.3
- CSS Modules
- framer-motion（アニメーション維持）
- react-hot-toast（useToast代替）

## 重要なルール
@.claude/rules/css-modules.md
@.claude/rules/migration-workflow.md
@.claude/rules/chakra-replacement.md

## よく使うコマンド
- ビルド: `npm run build`
- 開発: `npm run dev`
- リント: `npm run lint`

## 移行作業の手順
1. `/migrate <page-name>` で移行開始
2. `/screenshot before` でBefore取得
3. 作業実施
4. `/screenshot after` でAfter取得
5. `/compare` で比較
6. `/create-pr` でPR作成
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

### .claude/skills/migrate/SKILL.md

```yaml
---
name: migrate
description: 指定したページまたはコンポーネントをCSS Modulesに移行する
argument-hint: "<page-name>"
user-invocable: true
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# $ARGUMENTS の移行

## 手順

1. 対象ファイルを読み込む
2. 使用されているChakra UIコンポーネントを特定
3. CSS Modulesファイルを作成（styles/pages/$ARGUMENTS.module.css）
4. Chakra UIコンポーネントをHTML要素 + CSS Modulesに置換
5. framer-motionアニメーションを維持
6. TypeScriptエラーがないことを確認

## 置換ルール
@.claude/rules/chakra-replacement.md を参照

## 注意事項
- CSS変数は styles/variables.css を使用
- レスポンシブはメディアクエリで対応
- useDisclosure → useState に置換
- useToast → react-hot-toast に置換
```

---

### .claude/skills/screenshot/SKILL.md

```yaml
---
name: screenshot
description: agent-browserでスクリーンショットを取得する（CDP Mode使用）
argument-hint: "<before|after> [position]"
user-invocable: true
allowed-tools: Bash, Read
---

# スクリーンショット取得

現在のissueブランチ名からissue番号を取得し、スクリーンショットを保存する。

## 前提条件
- 開発サーバーが起動していること（npm run dev）
- Chromeがデバッグポート9222で起動し、ログイン済みであること

## 引数
- $0: before または after
- $1: position名（省略時は全影響箇所）

## 保存先
screenshots/issue-d-<issue-number>/<position>-$0.png

## 実行コマンド
```bash
# ページを開いてスクリーンショット取得
agent-browser --cdp 9222 open "http://localhost:3000/<path>"
agent-browser --cdp 9222 screenshot "screenshots/issue-d-<issue-number>/<position>-$0.png" --full
```

## Chromeセッションが切れている場合
人間に以下を依頼する：
1. pkill -9 Chrome
2. /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug-profile &
3. Googleログインを完了
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

1. screenshots/issue-d-$ARGUMENTS/ 内のファイルを取得
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

## テンプレート

```
## 概要
$ARGUMENTS のChakra UI → CSS Modules移行

## 対象ファイル
- pages/xxx.tsx
- 新規: styles/pages/xxx.module.css

## 影響箇所（position）
- [ ] position-1: /path1
- [ ] position-2: /path2

## 置換対象コンポーネント
- Box → div
- Button → button
- ...

## チェックリスト
- [ ] Before スクリーンショット取得
- [ ] CSS Modules実装
- [ ] Chakra UI import削除
- [ ] After スクリーンショット取得
- [ ] 比較確認
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
3. Before/After比較結果を取得
4. PRを作成

## PRテンプレート

```
## Summary
- Chakra UI → CSS Modules 移行完了
- 対象: <page-name>

## 変更内容
- xxx.tsx: Chakra UIコンポーネントをCSS Modulesに置換
- styles/pages/xxx.module.css: 新規作成

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

2. **CSS Modules適用チェック**
   - .module.css ファイルが作成されているか
   - className={styles.xxx} 形式で適用されているか

3. **CSS変数使用チェック**
   - ハードコードされた値がないか
   - var(--xxx) 形式で変数が使用されているか

4. **TypeScriptチェック**
   - 型エラーがないか

5. **ビルドチェック**
   - npm run build が成功するか

## 出力
問題があれば具体的な修正箇所を報告
```

---

### .claude/rules/css-modules.md

```markdown
# CSS Modules コーディング規約

## ファイル配置
- ページ用: `styles/pages/<page-name>.module.css`
- 共通UI: `components/ui/<Component>.module.css`

## 命名規則
- クラス名: camelCase（例: `.cardHeader`, `.buttonPrimary`）
- CSS変数: kebab-case（例: `var(--color-blue-500)`）

## CSS変数
必ず `styles/variables.css` の変数を使用：
- 色: `var(--color-xxx-nnn)`
- スペーシング: `var(--spacing-n)`
- 角丸: `var(--radius-xxx)`
- シャドウ: `var(--shadow-xxx)`
- フォント: `var(--font-xxx)`

## レスポンシブ
モバイルファースト + メディアクエリ:
```css
.container {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
  }
}
```

## framer-motion統合
```tsx
import { motion } from 'framer-motion';
import styles from './xxx.module.css';

<motion.div className={styles.card} {...motionProps}>
```
```

---

### .claude/rules/migration-workflow.md

```markdown
# 移行ワークフロー

## 1. 準備
- issue-d-<number> ブランチを作成
- 開発サーバー起動: `npm run dev`

## 2. Before取得
```
/screenshot before
```

## 3. 移行作業
```
/migrate <page-name>
```

## 4. 動作確認
- ブラウザで表示確認
- インタラクション確認（ホバー、クリック、フォーカス）
- レスポンシブ確認

## 5. After取得
```
/screenshot after
```

## 6. 比較
```
/compare
```

## 7. PR作成
```
/create-pr
```

## 8. レビュー・マージ
人間が実施
```

---

### .claude/rules/chakra-replacement.md

```markdown
# Chakra UI コンポーネント置換表

| Chakra UI | HTML + CSS Modules |
|-----------|-------------------|
| `<Box>` | `<div className={styles.xxx}>` |
| `<Text>` | `<span>` or `<p>` |
| `<Flex>` | `<div className={styles.flex}>` |
| `<VStack>` | `<div className={styles.vstack}>` |
| `<HStack>` | `<div className={styles.hstack}>` |
| `<Button>` | `<button className={styles.button}>` |
| `<Input>` | `<input className={styles.input}>` |
| `<Textarea>` | `<textarea className={styles.textarea}>` |
| `<Select>` | `<select className={styles.select}>` |
| `<Checkbox>` | `<input type="checkbox">` |
| `<Radio>` | `<input type="radio">` |
| `<Avatar>` | `<img className={styles.avatar}>` |
| `<Badge>` | `<span className={styles.badge}>` |
| `<Card>` | `<div className={styles.card}>` |
| `<Table>` | `<table className={styles.table}>` |
| `<Alert>` | `<div className={styles.alert}>` |
| `<Progress>` | `<div className={styles.progress}>` |
| `<Spinner>` | `<div className={styles.spinner}>` |

## 複雑なコンポーネント（共通化推奨）
- Modal → `components/ui/Modal.tsx`
- Menu → `components/ui/Menu.tsx`
- Tabs → `components/ui/Tabs.tsx`
- Tooltip → `components/ui/Tooltip.tsx`

## Hooks置換
| Chakra UI | 代替 |
|-----------|------|
| `useDisclosure` | `useState` |
| `useToast` | `react-hot-toast` |
| `useColorModeValue` | CSS変数 or 削除 |
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

## Issue一覧（12 Issues）

| # | タイトル | 難易度 |
|---|---------|--------|
| 1 | プロフィールページの移行 | ⭐ |
| 2 | チームメンバーページの移行（Modal導入） | ⭐⭐ |
| 3 | カレンダーページの移行（Tooltip導入） | ⭐⭐ |
| 4 | 共通レイアウトの移行（Menu導入） | ⭐⭐⭐ |
| 5 | ダッシュボードの移行 | ⭐⭐ |
| 6 | プロジェクト一覧の移行 | ⭐⭐⭐ |
| 7 | プロジェクト詳細の移行（Tabs導入） | ⭐⭐⭐⭐ |
| 8 | タスク一覧の移行 | ⭐⭐⭐ |
| 9 | タスク作成/編集の移行 | ⭐⭐ |
| 10 | レポートページの移行 | ⭐⭐⭐ |
| 11 | 設定ページの移行 | ⭐⭐ |
| 12 | Chakra UI完全削除・最終調整 | ⭐⭐ |

---

## 成功基準

各Issue完了時に以下を確認：

- ✅ Before/Afterスクリーンショットで視覚的に同等
- ✅ レスポンシブデザインが正しく動作
- ✅ framer-motionアニメーションが維持
- ✅ インタラクションが正しく動作
- ✅ TypeScriptエラーなし
- ✅ ビルド成功

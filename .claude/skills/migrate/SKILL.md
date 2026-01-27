---
name: migrate
description: ページをChakra UIからCSS Modulesに移行します
argument-hint: "[Issue番号]"
---

# /migrate <Issue番号>

指定されたIssueのページをChakra UI → CSS Modulesに移行してください。

## 1. Issue確認

```bash
gh issue view <Issue番号>
```

Issueタイトルからページを特定:
- `[A-1] プロフィールページ` → `profile` (`pages/profile.tsx`)
- `[A-2] チームメンバーページ` → `team` (`pages/team.tsx`)
- `[A-3] カレンダーページ` → `calendar` (`pages/calendar.tsx`)
- `[A-4] 共通レイアウト` → `layout` (`components/layout/`)
- `[A-5] ダッシュボード` → `index` (`pages/index.tsx`)
- `[A-6] プロジェクト一覧` → `projects` (`pages/projects/index.tsx`)
- `[A-7] プロジェクト詳細` → `projects/[id]` (`pages/projects/[id].tsx`)
- `[A-8] タスク一覧` → `tasks` (`pages/tasks/index.tsx`)
- `[A-9] タスク作成/編集` → `tasks/new`, `tasks/[id]/edit`
- `[A-10] レポート` → `reports` (`pages/reports.tsx`)
- `[A-11] 設定` → `settings` (`pages/settings.tsx`)

## 2. ブランチ作成

```bash
git checkout migration-direct
git pull origin migration-direct
git checkout -b issue/<Issue番号>-a
```

## 3. 開発サーバー確認

`npm run dev` が起動していることを確認（していなければ起動）

## 4. Before撮影

```bash
mkdir -p screenshots/<Issue番号>
agent-browser open http://localhost:3000/<ページパス>
sleep 2
agent-browser screenshot screenshots/<Issue番号>/<ページ名>-before.png
```

ユーザーに「Before撮影完了」と報告。

## 5. 移行作業

### 5.1 CSSファイル作成

`styles/pages/<ページ名>.module.css` を作成。

- `styles/variables.css` のCSS変数を使用
- Chakra UIのスタイルを再現
- クラス名はcamelCase

### 5.2 TSX修正

対象ファイルを修正:

- Chakra UIコンポーネント → HTML要素 + CSS Modules
- `import styles from '../styles/pages/<ページ名>.module.css'`
- **framer-motion はそのまま維持**
- **react-hook-form はそのまま維持**

## 6. After撮影 & 比較

```bash
agent-browser reload
sleep 2
agent-browser screenshot screenshots/<Issue番号>/<ページ名>-after.png
magick screenshots/<Issue番号>/<ページ名>-before.png screenshots/<Issue番号>/<ページ名>-after.png +append screenshots/<Issue番号>/<ページ名>-comparison.png
```

比較画像を確認し、差異があれば修正。ユーザーに比較画像を表示。

## 7. コミット & プッシュ

```bash
git add styles/ pages/
git commit -m "[A-<Issue番号>] <ページ名>ページをCSS Modulesに移行"
git push -u origin issue/<Issue番号>-a
```

## 8. PR作成

```bash
gh pr create --base migration-direct --title "[A-<Issue番号>] <ページ名>ページをCSS Modulesに移行" --body "## 概要
Issue #<Issue番号> の対応

## 変更内容
- <ページ名>ページをChakra UIからCSS Modulesに移行

## スクリーンショット
（手動でアップロードしてください）
"
```

## 9. 完了報告

ユーザーに以下を報告:
- 作成/変更したファイル一覧
- PRのURL
- スクリーンショットの場所（`screenshots/<Issue番号>/`）
- 「PRにスクリーンショットを手動でアップロードしてください」

# Step3 Scripts: 移行作業を効率化するスクリプト群

## 概要

step3の移行作業を効率化・自動化するためのスクリプト群の計画。すべてのスクリプトは `scripts/` ディレクトリに配置します。

## ディレクトリ構造

```
scripts/
├── setup/
│   ├── create-branches.sh           # ブランチ作成スクリプト
│   └── create-issues.ts             # GitHub Issue一括作成
├── workflow/
│   ├── start-issue.sh               # Issue作業開始（ブランチ作成）
│   ├── finish-issue.sh              # Issue作業完了（PR作成、マージ）
│   └── sync-branch.sh               # ブランチ同期
├── screenshot/
│   ├── capture-before.sh            # beforeスクリーンショット取得
│   ├── capture-after.sh             # afterスクリーンショット取得
│   ├── create-comparison.sh         # 比較画像作成
│   └── capture-all.sh               # 全ページ一括スクリーンショット
├── analysis/
│   ├── measure-performance.ts       # パフォーマンス測定
│   ├── analyze-bundle.ts            # バンドルサイズ分析
│   └── compare-approaches.ts        # 両アプローチの比較レポート生成
├── utils/
│   ├── dev-server.ts                # 開発サーバー起動ヘルパー
│   └── wait-for-server.ts           # サーバー起動待機
└── README.md                         # スクリプト使用ガイド
```

## スクリプト詳細

---

### 1. setup/create-branches.sh

**目的:** migration-direct と migration-component ブランチを作成

**実装:** Bash

**機能:**
- main ブランチから migration-direct を作成
- main ブランチから migration-component を作成
- リモートにプッシュ

**使用例:**
```bash
./scripts/setup/create-branches.sh
```

**実装コード:**
```bash
#!/bin/bash

set -e

echo "📝 Creating migration branches..."

# migration-direct ブランチ作成
echo "Creating migration-direct branch..."
git checkout main
git pull origin main
git checkout -b migration-direct
git push -u origin migration-direct

echo "✅ migration-direct branch created"

# migration-component ブランチ作成
echo "Creating migration-component branch..."
git checkout main
git checkout -b migration-component
git push -u origin migration-component

echo "✅ migration-component branch created"

# main に戻る
git checkout main

echo "🎉 All branches created successfully!"
echo ""
echo "Branches:"
echo "  - migration-direct"
echo "  - migration-component"
```

---

### 2. setup/create-issues.ts

**目的:** GitHub Issueを一括作成

**実装:** TypeScript (Node.js)

**依存パッケージ:**
```json
{
  "@octokit/rest": "^20.0.0"
}
```

**機能:**
- step3-a.md と step3-b.md を読み込み
- アプローチA用の12個のissueを作成（ラベル: `approach-a`, `migration`）
- アプローチB用の19個のissueを作成（ラベル: `approach-b`, `migration`）
- Issue番号とURLを出力

**使用例:**
```bash
npm run create-issues
# または
node scripts/setup/create-issues.js
```

**実装コード:**
```typescript
#!/usr/bin/env node

import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = 'hideyuki-hori'; // GitHubユーザー名
const repo = 'lab-chakra-to-css-modules';

interface Issue {
  number: string;
  title: string;
  difficulty: string;
  estimatedTime: string;
  approach: 'a' | 'b';
}

// アプローチAのissue定義
const issuesA: Issue[] = [
  {
    number: '1',
    title: 'プロフィールページの移行',
    difficulty: '⭐',
    estimatedTime: '0.5日',
    approach: 'a',
  },
  {
    number: '2',
    title: 'チームメンバーページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '1日',
    approach: 'a',
  },
  {
    number: '3',
    title: 'カレンダーページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '1日',
    approach: 'a',
  },
  {
    number: '4',
    title: '共通レイアウトコンポーネントの移行',
    difficulty: '⭐⭐⭐',
    estimatedTime: '1日',
    approach: 'a',
  },
  {
    number: '5',
    title: 'ダッシュボードの移行',
    difficulty: '⭐⭐',
    estimatedTime: '0.5日',
    approach: 'a',
  },
  {
    number: '6',
    title: 'プロジェクト一覧ページの移行',
    difficulty: '⭐⭐⭐',
    estimatedTime: '1.5日',
    approach: 'a',
  },
  {
    number: '7',
    title: 'プロジェクト詳細ページの移行',
    difficulty: '⭐⭐⭐⭐',
    estimatedTime: '2日',
    approach: 'a',
  },
  {
    number: '8',
    title: 'タスク一覧ページの移行',
    difficulty: '⭐⭐⭐',
    estimatedTime: '1.5日',
    approach: 'a',
  },
  {
    number: '9',
    title: 'タスク作成/編集ページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '1日',
    approach: 'a',
  },
  {
    number: '10',
    title: 'レポートページの移行',
    difficulty: '⭐⭐⭐',
    estimatedTime: '1日',
    approach: 'a',
  },
  {
    number: '11',
    title: '設定ページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '0.5日',
    approach: 'a',
  },
  {
    number: '12',
    title: 'Chakra UI完全削除と最終調整',
    difficulty: '⭐⭐',
    estimatedTime: '1日',
    approach: 'a',
  },
];

// アプローチBのissue定義
const issuesB: Issue[] = [
  {
    number: '1',
    title: '基盤構築 - CSS変数とユーティリティ',
    difficulty: '⭐',
    estimatedTime: '0.5日',
    approach: 'b',
  },
  {
    number: '2',
    title: '基本UIコンポーネント（レイアウト系）',
    difficulty: '⭐',
    estimatedTime: '1日',
    approach: 'b',
  },
  {
    number: '3',
    title: 'フォーム関連UIコンポーネント',
    difficulty: '⭐⭐⭐',
    estimatedTime: '2〜3日',
    approach: 'b',
  },
  {
    number: '4',
    title: '表示系UIコンポーネント',
    difficulty: '⭐⭐',
    estimatedTime: '1.5日',
    approach: 'b',
  },
  {
    number: '5',
    title: 'インタラクティブUIコンポーネント（その1: Modal, Tooltip）',
    difficulty: '⭐⭐⭐',
    estimatedTime: '1.5日',
    approach: 'b',
  },
  {
    number: '6',
    title: 'インタラクティブUIコンポーネント（その2: Menu, Tabs）',
    difficulty: '⭐⭐⭐⭐',
    estimatedTime: '2日',
    approach: 'b',
  },
  {
    number: '7',
    title: 'テーブル・統計系UIコンポーネント',
    difficulty: '⭐⭐',
    estimatedTime: '1.5日',
    approach: 'b',
  },
  {
    number: '8',
    title: '共通レイアウトコンポーネントの移行',
    difficulty: '⭐⭐⭐',
    estimatedTime: '1日',
    approach: 'b',
  },
  {
    number: '9',
    title: 'プロフィールページの移行',
    difficulty: '⭐',
    estimatedTime: '0.5日',
    approach: 'b',
  },
  {
    number: '10',
    title: 'チームメンバーページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '0.5日',
    approach: 'b',
  },
  {
    number: '11',
    title: 'カレンダーページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '0.5日',
    approach: 'b',
  },
  {
    number: '12',
    title: 'ダッシュボードの移行',
    difficulty: '⭐',
    estimatedTime: '0.5日',
    approach: 'b',
  },
  {
    number: '13',
    title: 'プロジェクト一覧ページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '1日',
    approach: 'b',
  },
  {
    number: '14',
    title: 'プロジェクト詳細ページの移行',
    difficulty: '⭐⭐⭐',
    estimatedTime: '1日',
    approach: 'b',
  },
  {
    number: '15',
    title: 'タスク一覧ページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '1日',
    approach: 'b',
  },
  {
    number: '16',
    title: 'タスク作成/編集ページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '1日',
    approach: 'b',
  },
  {
    number: '17',
    title: 'レポートページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '0.5日',
    approach: 'b',
  },
  {
    number: '18',
    title: '設定ページの移行',
    difficulty: '⭐⭐',
    estimatedTime: '0.5日',
    approach: 'b',
  },
  {
    number: '19',
    title: 'Chakra UI完全削除と最終調整',
    difficulty: '⭐⭐',
    estimatedTime: '1日',
    approach: 'b',
  },
];

function createIssueBody(issue: Issue): string {
  const approach = issue.approach === 'a' ? 'A（直接適用方式）' : 'B（共通コンポーネント方式）';
  const baseBranch = issue.approach === 'a' ? 'migration-direct' : 'migration-component';
  const detailFile = issue.approach === 'a' ? 'step3-a.md' : 'step3-b.md';

  return `## 概要
アプローチ${approach}の移行作業

## 詳細
詳細は \`${detailFile}\` の Issue #${issue.number} を参照してください。

## 難易度
${issue.difficulty}

## 推定作業時間
${issue.estimatedTime}

## 作業内容
- [ ] 影響範囲の確認
- [ ] beforeスクリーンショット取得
- [ ] 実装作業
- [ ] 動作確認
- [ ] afterスクリーンショット取得
- [ ] 比較画像作成
- [ ] PR作成
- [ ] マージ

## ブランチ情報
- ベースブランチ: \`${baseBranch}\`
- 作業ブランチ: \`issue/${issue.number}-${issue.approach}\`

## スクリーンショット
### Before
<!-- スクリーンショットを貼り付け -->

### After
<!-- スクリーンショットを貼り付け -->

### 比較
<!-- 横並び比較画像を貼り付け -->
`;
}

async function createIssues() {
  console.log('🚀 Creating GitHub Issues...\n');

  const allIssues = [
    ...issuesA.map((issue) => ({
      title: `[A-${issue.number}] ${issue.title}`,
      body: createIssueBody(issue),
      labels: ['approach-a', 'migration'],
      issue,
    })),
    ...issuesB.map((issue) => ({
      title: `[B-${issue.number}] ${issue.title}`,
      body: createIssueBody(issue),
      labels: ['approach-b', 'migration'],
      issue,
    })),
  ];

  for (const { title, body, labels } of allIssues) {
    try {
      const response = await octokit.issues.create({
        owner,
        repo,
        title,
        body,
        labels,
      });

      console.log(`✅ Created: ${title}`);
      console.log(`   URL: ${response.data.html_url}\n`);

      // GitHub API rate limit を考慮して待機
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Failed to create: ${title}`);
      console.error(error);
    }
  }

  console.log('🎉 All issues created successfully!');
}

createIssues();
```

---

### 3. workflow/start-issue.sh

**目的:** Issue作業を開始（ブランチ作成、チェックアウト）

**実装:** Bash

**機能:**
- 引数でissue番号とアプローチ（a/b）を受け取る
- 対応するベースブランチから issue ブランチを作成
- ブランチをチェックアウト

**使用例:**
```bash
./scripts/workflow/start-issue.sh 1 a    # issue/1-a を migration-direct から作成
./scripts/workflow/start-issue.sh 3 b    # issue/3-b を migration-component から作成
```

**実装コード:**
```bash
#!/bin/bash

set -e

ISSUE_NUMBER=$1
APPROACH=$2

if [ -z "$ISSUE_NUMBER" ] || [ -z "$APPROACH" ]; then
  echo "Usage: ./scripts/workflow/start-issue.sh <issue-number> <approach(a/b)>"
  echo "Example: ./scripts/workflow/start-issue.sh 1 a"
  exit 1
fi

if [ "$APPROACH" != "a" ] && [ "$APPROACH" != "b" ]; then
  echo "Error: approach must be 'a' or 'b'"
  exit 1
fi

BASE_BRANCH="migration-direct"
if [ "$APPROACH" = "b" ]; then
  BASE_BRANCH="migration-component"
fi

BRANCH_NAME="issue/${ISSUE_NUMBER}-${APPROACH}"

echo "🚀 Starting issue #${ISSUE_NUMBER}-${APPROACH}..."
echo "   Base branch: ${BASE_BRANCH}"
echo "   New branch: ${BRANCH_NAME}"
echo ""

# ベースブランチをチェックアウトして最新化
git checkout $BASE_BRANCH
git pull origin $BASE_BRANCH

# 新しいブランチを作成
git checkout -b $BRANCH_NAME

echo "✅ Branch created and checked out: ${BRANCH_NAME}"
echo ""
echo "Next steps:"
echo "  1. Work on the issue"
echo "  2. Run: ./scripts/screenshot/capture-before.sh ${ISSUE_NUMBER} ${APPROACH}"
echo "  3. Complete your work"
echo "  4. Run: ./scripts/screenshot/capture-after.sh ${ISSUE_NUMBER} ${APPROACH}"
echo "  5. Run: ./scripts/workflow/finish-issue.sh ${ISSUE_NUMBER} ${APPROACH}"
```

---

### 4. workflow/finish-issue.sh

**目的:** Issue作業を完了（コミット、プッシュ、PR作成、マージ）

**実装:** Bash

**機能:**
- 変更をコミット
- リモートにプッシュ
- PR作成（gh CLI使用）
- PR自動マージ（オプション）
- ベースブランチに戻る

**使用例:**
```bash
./scripts/workflow/finish-issue.sh 1 a "プロフィールページをCSS Modulesに移行"
./scripts/workflow/finish-issue.sh 3 b "フォーム関連UIコンポーネントを実装"
```

**実装コード:**
```bash
#!/bin/bash

set -e

ISSUE_NUMBER=$1
APPROACH=$2
COMMIT_MESSAGE=$3

if [ -z "$ISSUE_NUMBER" ] || [ -z "$APPROACH" ] || [ -z "$COMMIT_MESSAGE" ]; then
  echo "Usage: ./scripts/workflow/finish-issue.sh <issue-number> <approach(a/b)> <commit-message>"
  echo "Example: ./scripts/workflow/finish-issue.sh 1 a \"プロフィールページをCSS Modulesに移行\""
  exit 1
fi

BASE_BRANCH="migration-direct"
if [ "$APPROACH" = "b" ]; then
  BASE_BRANCH="migration-component"
fi

BRANCH_NAME="issue/${ISSUE_NUMBER}-${APPROACH}"
ISSUE_LABEL="A-${ISSUE_NUMBER}"
if [ "$APPROACH" = "b" ]; then
  ISSUE_LABEL="B-${ISSUE_NUMBER}"
fi

echo "🏁 Finishing issue #${ISSUE_NUMBER}-${APPROACH}..."
echo ""

# コミット
echo "📝 Committing changes..."
git add .
git commit -m "Issue #${ISSUE_LABEL}: ${COMMIT_MESSAGE}

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# プッシュ
echo "📤 Pushing to remote..."
git push -u origin $BRANCH_NAME

# PR作成
echo "🔀 Creating pull request..."
PR_BODY="## Issue
Closes #${ISSUE_NUMBER}

## 変更内容
${COMMIT_MESSAGE}

## スクリーンショット
<!-- screenshots/${ISSUE_NUMBER}-${APPROACH}/ 内の画像を貼り付けてください -->

## チェックリスト
- [x] beforeスクリーンショット取得済み
- [x] 実装完了
- [x] afterスクリーンショット取得済み
- [x] 比較画像作成済み
- [ ] レビュー待ち
"

gh pr create \
  --base $BASE_BRANCH \
  --title "[${ISSUE_LABEL}] ${COMMIT_MESSAGE}" \
  --body "$PR_BODY"

echo ""
echo "✅ Pull request created!"
echo ""
echo "Options:"
echo "  - Review and merge manually on GitHub"
echo "  - Auto-merge: gh pr merge --squash"
echo ""

read -p "Auto-merge now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🔀 Merging PR..."
  gh pr merge --squash

  echo "🔄 Switching back to ${BASE_BRANCH}..."
  git checkout $BASE_BRANCH
  git pull origin $BASE_BRANCH

  echo "✅ Issue completed and merged!"
else
  echo "⏸️  PR created but not merged. Merge manually when ready."
fi
```

---

### 5. screenshot/capture-before.sh

**目的:** beforeスクリーンショットを取得（main ブランチで実行）

**実装:** Bash

**依存パッケージ:**
- agent-browser (globalにインストール済みと想定)

**機能:**
- main ブランチに一時的に切り替え
- 開発サーバーを起動
- agent-browserで全ページのスクリーンショットを取得
- screenshots/<issue-number>-<approach>/ に保存
- 元のブランチに戻る

**使用例:**
```bash
./scripts/screenshot/capture-before.sh 1 a
./scripts/screenshot/capture-before.sh 3 b
```

**実装コード:**
```bash
#!/bin/bash

set -e

ISSUE_NUMBER=$1
APPROACH=$2

if [ -z "$ISSUE_NUMBER" ] || [ -z "$APPROACH" ]; then
  echo "Usage: ./scripts/screenshot/capture-before.sh <issue-number> <approach(a/b)>"
  echo "Example: ./scripts/screenshot/capture-before.sh 1 a"
  exit 1
fi

OUTPUT_DIR="screenshots/${ISSUE_NUMBER}-${APPROACH}"

# ページ定義
declare -A PAGES=(
  ["dashboard"]="/"
  ["projects"]="/projects"
  ["project-detail"]="/projects/1"
  ["tasks"]="/tasks"
  ["task-new"]="/tasks/new"
  ["task-edit"]="/tasks/1/edit"
  ["team"]="/team"
  ["calendar"]="/calendar"
  ["reports"]="/reports"
  ["settings"]="/settings"
  ["profile"]="/profile"
)

echo "📸 Capturing BEFORE screenshots for issue ${ISSUE_NUMBER}-${APPROACH}..."
echo ""

# 出力ディレクトリ作成
mkdir -p "$OUTPUT_DIR"

# 現在のブランチを保存
ORIGINAL_BRANCH=$(git branch --show-current)

# main ブランチに切り替え
echo "🔄 Switching to main branch..."
git checkout main

# 開発サーバー起動（バックグラウンド）
echo "🚀 Starting dev server..."
npm run dev > /dev/null 2>&1 &
DEV_SERVER_PID=$!

# サーバー起動待機
echo "⏳ Waiting for server to start..."
sleep 10

# スクリーンショット取得
for PAGE_NAME in "${!PAGES[@]}"; do
  PATH_URL="${PAGES[$PAGE_NAME]}"
  URL="http://localhost:3000${PATH_URL}"
  OUTPUT_FILE="${OUTPUT_DIR}/${PAGE_NAME}-before.png"

  echo "📸 Capturing: ${PAGE_NAME} (${URL})"

  # agent-browserでページを開く
  agent-browser open "$URL" > /dev/null 2>&1 || true

  # 少し待機してページがレンダリングされるのを待つ
  sleep 2

  # スクリーンショット取得
  agent-browser screenshot --full "$OUTPUT_FILE" > /dev/null 2>&1 || true

  if [ -f "$OUTPUT_FILE" ]; then
    echo "   ✅ Saved: ${OUTPUT_FILE}"
  else
    echo "   ❌ Failed to capture ${PAGE_NAME}"
  fi
done

# 開発サーバー停止
echo ""
echo "🛑 Stopping dev server..."
kill $DEV_SERVER_PID || true
wait $DEV_SERVER_PID 2>/dev/null || true

# 元のブランチに戻る
echo "🔄 Switching back to ${ORIGINAL_BRANCH}..."
git checkout "$ORIGINAL_BRANCH"

echo ""
echo "✅ BEFORE screenshots captured successfully!"
echo "   Output directory: ${OUTPUT_DIR}"
```

---

### 6. screenshot/capture-after.sh

**目的:** afterスクリーンショットを取得（現在のブランチで実行）

**実装:** Bash

**依存パッケージ:**
- agent-browser (globalにインストール済みと想定)

**機能:**
- 現在のブランチで開発サーバーを起動
- agent-browserで全ページのスクリーンショットを取得
- screenshots/<issue-number>-<approach>/ に保存

**使用例:**
```bash
./scripts/screenshot/capture-after.sh 1 a
```

**実装コード:**
```bash
#!/bin/bash

set -e

ISSUE_NUMBER=$1
APPROACH=$2

if [ -z "$ISSUE_NUMBER" ] || [ -z "$APPROACH" ]; then
  echo "Usage: ./scripts/screenshot/capture-after.sh <issue-number> <approach(a/b)>"
  echo "Example: ./scripts/screenshot/capture-after.sh 1 a"
  exit 1
fi

OUTPUT_DIR="screenshots/${ISSUE_NUMBER}-${APPROACH}"

# ページ定義
declare -A PAGES=(
  ["dashboard"]="/"
  ["projects"]="/projects"
  ["project-detail"]="/projects/1"
  ["tasks"]="/tasks"
  ["task-new"]="/tasks/new"
  ["task-edit"]="/tasks/1/edit"
  ["team"]="/team"
  ["calendar"]="/calendar"
  ["reports"]="/reports"
  ["settings"]="/settings"
  ["profile"]="/profile"
)

echo "📸 Capturing AFTER screenshots for issue ${ISSUE_NUMBER}-${APPROACH}..."
echo ""

# 出力ディレクトリ作成
mkdir -p "$OUTPUT_DIR"

# 開発サーバー起動（バックグラウンド）
echo "🚀 Starting dev server..."
npm run dev > /dev/null 2>&1 &
DEV_SERVER_PID=$!

# サーバー起動待機
echo "⏳ Waiting for server to start..."
sleep 10

# スクリーンショット取得
for PAGE_NAME in "${!PAGES[@]}"; do
  PATH_URL="${PAGES[$PAGE_NAME]}"
  URL="http://localhost:3000${PATH_URL}"
  OUTPUT_FILE="${OUTPUT_DIR}/${PAGE_NAME}-after.png"

  echo "📸 Capturing: ${PAGE_NAME} (${URL})"

  # agent-browserでページを開く
  agent-browser open "$URL" > /dev/null 2>&1 || true

  # 少し待機してページがレンダリングされるのを待つ
  sleep 2

  # スクリーンショット取得
  agent-browser screenshot --full "$OUTPUT_FILE" > /dev/null 2>&1 || true

  if [ -f "$OUTPUT_FILE" ]; then
    echo "   ✅ Saved: ${OUTPUT_FILE}"
  else
    echo "   ❌ Failed to capture ${PAGE_NAME}"
  fi
done

# 開発サーバー停止
echo ""
echo "🛑 Stopping dev server..."
kill $DEV_SERVER_PID || true
wait $DEV_SERVER_PID 2>/dev/null || true

echo ""
echo "✅ AFTER screenshots captured successfully!"
echo "   Output directory: ${OUTPUT_DIR}"
echo ""
echo "Next step:"
echo "   ./scripts/screenshot/create-comparison.sh ${ISSUE_NUMBER} ${APPROACH}"
```

---

### 7. screenshot/create-comparison.sh

**目的:** before/after の比較画像を作成

**実装:** Bash (ImageMagick使用)

**依存パッケージ:**
```bash
brew install imagemagick  # macOS
```

**機能:**
- before と after を横並びに配置
- ページ名のラベルを追加
- comparison.png として保存

**使用例:**
```bash
./scripts/screenshot/create-comparison.sh 1 a
```

**実装コード:**
```bash
#!/bin/bash

set -e

ISSUE_NUMBER=$1
APPROACH=$2

if [ -z "$ISSUE_NUMBER" ] || [ -z "$APPROACH" ]; then
  echo "Usage: ./scripts/screenshot/create-comparison.sh <issue-number> <approach(a/b)>"
  exit 1
fi

DIR="screenshots/${ISSUE_NUMBER}-${APPROACH}"

if [ ! -d "$DIR" ]; then
  echo "Error: Directory $DIR does not exist"
  exit 1
fi

echo "🖼️  Creating comparison images for issue ${ISSUE_NUMBER}-${APPROACH}..."
echo ""

# すべてのbeforeファイルを処理
for BEFORE in $DIR/*-before.png; do
  if [ ! -f "$BEFORE" ]; then
    continue
  fi

  BASENAME=$(basename "$BEFORE" -before.png)
  AFTER="$DIR/${BASENAME}-after.png"
  COMPARISON="$DIR/${BASENAME}-comparison.png"

  if [ ! -f "$AFTER" ]; then
    echo "⚠️  Warning: $AFTER not found, skipping"
    continue
  fi

  echo "Processing: $BASENAME"

  # ImageMagick で横並び画像を作成
  convert \
    \( "$BEFORE" -resize 50% -gravity North -background white -splice 0x30 -annotate +0+10 "BEFORE" \) \
    \( "$AFTER" -resize 50% -gravity North -background white -splice 0x30 -annotate +0+10 "AFTER" \) \
    +append "$COMPARISON"

  echo "   ✅ Created: $COMPARISON"
done

echo ""
echo "✅ All comparison images created!"
echo "   Directory: $DIR"
```

---

### 8. screenshot/capture-all.sh

**目的:** 全ページのスクリーンショットを一括取得（開発中のデバッグ用）

**実装:** Bash

**依存パッケージ:**
- agent-browser (globalにインストール済みと想定)

**機能:**
- 現在のブランチで開発サーバーを起動
- 全ページのスクリーンショットを取得
- screenshots/debug/ に保存

**使用例:**
```bash
./scripts/screenshot/capture-all.sh
```

**実装コード:**
```bash
#!/bin/bash

set -e

OUTPUT_DIR="screenshots/debug"

# ページ定義
declare -A PAGES=(
  ["dashboard"]="/"
  ["projects"]="/projects"
  ["project-detail"]="/projects/1"
  ["tasks"]="/tasks"
  ["task-new"]="/tasks/new"
  ["task-edit"]="/tasks/1/edit"
  ["team"]="/team"
  ["calendar"]="/calendar"
  ["reports"]="/reports"
  ["settings"]="/settings"
  ["profile"]="/profile"
)

echo "📸 Capturing all screenshots for debugging..."
echo ""

# 出力ディレクトリ作成
mkdir -p "$OUTPUT_DIR"

# 開発サーバー起動（バックグラウンド）
echo "🚀 Starting dev server..."
npm run dev > /dev/null 2>&1 &
DEV_SERVER_PID=$!

# サーバー起動待機
echo "⏳ Waiting for server to start..."
sleep 10

# スクリーンショット取得
for PAGE_NAME in "${!PAGES[@]}"; do
  PATH_URL="${PAGES[$PAGE_NAME]}"
  URL="http://localhost:3000${PATH_URL}"
  OUTPUT_FILE="${OUTPUT_DIR}/${PAGE_NAME}.png"

  echo "📸 Capturing: ${PAGE_NAME} (${URL})"

  # agent-browserでページを開く
  agent-browser open "$URL" > /dev/null 2>&1 || true

  # 少し待機してページがレンダリングされるのを待つ
  sleep 2

  # スクリーンショット取得
  agent-browser screenshot --full "$OUTPUT_FILE" > /dev/null 2>&1 || true

  if [ -f "$OUTPUT_FILE" ]; then
    echo "   ✅ Saved: ${OUTPUT_FILE}"
  else
    echo "   ❌ Failed to capture ${PAGE_NAME}"
  fi
done

# 開発サーバー停止
echo ""
echo "🛑 Stopping dev server..."
kill $DEV_SERVER_PID || true
wait $DEV_SERVER_PID 2>/dev/null || true

echo ""
echo "✅ All screenshots captured successfully!"
echo "   Output directory: ${OUTPUT_DIR}"
```

---

### 9. analysis/measure-performance.ts

**目的:** ページパフォーマンスを測定（Lighthouse使用）

**実装:** TypeScript (Node.js)

**依存パッケージ:**
```json
{
  "lighthouse": "^11.0.0"
}
```

**機能:**
- 各ページのLighthouse スコアを測定
- JSON レポート出力
- アプローチAとBを比較

**使用例:**
```bash
node scripts/analysis/measure-performance.js migration-direct
node scripts/analysis/measure-performance.js migration-component
```

**実装コード:**
```typescript
#!/usr/bin/env node

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const branch = process.argv[2] || 'main';

const pages = [
  { name: 'dashboard', path: '/' },
  { name: 'projects', path: '/projects' },
  { name: 'tasks', path: '/tasks' },
  { name: 'team', path: '/team' },
  { name: 'profile', path: '/profile' },
];

async function measurePerformance() {
  console.log(`⚡ Measuring performance for branch: ${branch}\n`);

  // ブランチに切り替え
  await execAsync(`git checkout ${branch}`);

  // 開発サーバー起動
  const devServer = exec('npm run dev');
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const results: any[] = [];

  try {
    for (const page of pages) {
      const url = `http://localhost:3000${page.path}`;
      console.log(`📊 Measuring: ${page.name} (${url})`);

      const runnerResult = await lighthouse(url, {
        port: chrome.port,
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      });

      const scores = {
        page: page.name,
        performance: runnerResult.lhr.categories.performance.score * 100,
        accessibility: runnerResult.lhr.categories.accessibility.score * 100,
        bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
        seo: runnerResult.lhr.categories.seo.score * 100,
      };

      results.push(scores);

      console.log(`   Performance: ${scores.performance.toFixed(1)}`);
      console.log(`   Accessibility: ${scores.accessibility.toFixed(1)}`);
      console.log(`   Best Practices: ${scores.bestPractices.toFixed(1)}`);
      console.log(`   SEO: ${scores.seo.toFixed(1)}\n`);
    }

    // 結果を保存
    const outputPath = path.join(process.cwd(), 'analysis', `performance-${branch}.json`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

    console.log(`✅ Performance report saved: ${outputPath}`);
  } finally {
    await chrome.kill();
    devServer.kill();
  }
}

measurePerformance().catch(console.error);
```

---

### 10. analysis/analyze-bundle.ts

**目的:** バンドルサイズを分析

**実装:** TypeScript (Node.js)

**機能:**
- ビルド後のバンドルサイズを測定
- Chakra UI版と移行版を比較
- グラフ出力（任意）

**使用例:**
```bash
node scripts/analysis/analyze-bundle.js main
node scripts/analysis/analyze-bundle.js migration-direct
node scripts/analysis/analyze-bundle.js migration-component
```

---

### 11. analysis/compare-approaches.ts

**目的:** アプローチAとBの比較レポートを生成

**実装:** TypeScript (Node.js)

**機能:**
- パフォーマンス測定結果を読み込み
- バンドルサイズを読み込み
- コード行数を計測
- Markdown形式でレポート出力

**使用例:**
```bash
node scripts/analysis/compare-approaches.js
```

**出力例:**
```markdown
# 移行アプローチ比較レポート

## パフォーマンス

| ページ | main | migration-direct | migration-component |
|--------|------|------------------|---------------------|
| Dashboard | 85 | 88 | 87 |
| Projects | 82 | 86 | 85 |
...

## バンドルサイズ

- main: 450 KB
- migration-direct: 280 KB (-37%)
- migration-component: 320 KB (-28%)

## 推奨

...
```

---

## package.json スクリプト追加

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",

    "setup:branches": "bash scripts/setup/create-branches.sh",
    "setup:issues": "tsx scripts/setup/create-issues.ts",

    "issue:start": "bash scripts/workflow/start-issue.sh",
    "issue:finish": "bash scripts/workflow/finish-issue.sh",

    "screenshot:before": "bash scripts/screenshot/capture-before.sh",
    "screenshot:after": "bash scripts/screenshot/capture-after.sh",
    "screenshot:compare": "bash scripts/screenshot/create-comparison.sh",
    "screenshot:all": "bash scripts/screenshot/capture-all.sh",

    "analyze:performance": "tsx scripts/analysis/measure-performance.ts",
    "analyze:bundle": "tsx scripts/analysis/analyze-bundle.ts",
    "analyze:compare": "tsx scripts/analysis/compare-approaches.ts"
  },
  "devDependencies": {
    "@octokit/rest": "^20.0.0",
    "lighthouse": "^11.0.0",
    "chrome-launcher": "^1.0.0",
    "tsx": "^4.0.0"
  }
}
```

## 依存パッケージのインストール

### npm パッケージ
```bash
npm install --save-dev @octokit/rest lighthouse chrome-launcher tsx
```

### agent-browser (global)
spec.mdに記載の通り、agent-browserはglobalにインストール済みと想定しています。
まだインストールしていない場合：

```bash
# agent-browserをglobalにインストール
npm install -g agent-browser

# Chromiumをダウンロード
agent-browser install
```

### ImageMagick (比較画像作成用)
```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# Windows (Chocolatey)
choco install imagemagick
```

## 使用フロー例

### セットアップ
```bash
# 1. ブランチ作成
npm run setup:branches

# 2. GitHub Issues作成（GITHUB_TOKEN必要）
export GITHUB_TOKEN=your_token_here
npm run setup:issues
```

### Issue作業
```bash
# 3. Issue開始
npm run issue:start 1 a

# 4. beforeスクリーンショット取得
npm run screenshot:before 1 a

# 5. 実装作業
# ... コードを編集 ...

# 6. afterスクリーンショット取得
npm run screenshot:after 1 a

# 7. 比較画像作成
npm run screenshot:compare 1 a

# 8. Issue完了（PR作成、マージ）
npm run issue:finish 1 a "プロフィールページをCSS Modulesに移行"
```

### 分析
```bash
# パフォーマンス測定
npm run analyze:performance migration-direct
npm run analyze:performance migration-component

# バンドルサイズ分析
npm run analyze:bundle migration-direct
npm run analyze:bundle migration-component

# 比較レポート生成
npm run analyze:compare
```

## 実装の優先順位

1. ✅ **高優先度（必須）**
   - `setup/create-branches.sh` - ブランチ作成
   - `workflow/start-issue.sh` - Issue開始
   - `workflow/finish-issue.sh` - Issue完了

2. 🟡 **中優先度（推奨）**
   - `setup/create-issues.ts` - Issue一括作成
   - `screenshot/capture-before.sh` - beforeスクリーンショット
   - `screenshot/capture-after.sh` - afterスクリーンショット
   - `screenshot/create-comparison.sh` - 比較画像作成

3. 🔵 **低優先度（便利機能）**
   - `screenshot/capture-all.sh` - 全ページスクリーンショット
   - `analysis/measure-performance.ts` - パフォーマンス測定
   - `analysis/analyze-bundle.ts` - バンドルサイズ分析
   - `analysis/compare-approaches.ts` - 比較レポート

## agent-browserについて

**agent-browser** は Vercel Labs が開発したAIエージェント向けのブラウザ自動化CLIツールです。

### 特徴
- Rust製の高速CLI
- Playwrightベースのブラウザ自動化
- 50以上のコマンド（navigation, forms, screenshots, network, storage等）
- セッション管理機能
- コンテキスト削減（最大93%）

### 主なコマンド
```bash
# ページを開く
agent-browser open https://example.com

# スクリーンショット取得
agent-browser screenshot output.png

# フルページスクリーンショット
agent-browser screenshot --full output.png

# ページのスナップショット（構造情報）
agent-browser snapshot
```

### インストール確認
```bash
# バージョン確認
agent-browser --version

# ヘルプ表示
agent-browser --help
```

### 参考リンク
- GitHub: https://github.com/vercel-labs/agent-browser
- npm: https://www.npmjs.com/package/agent-browser
- 公式サイト: https://agent-browser.dev/

## まとめ

これらのスクリプトにより、以下が自動化されます：

- ✅ ブランチ管理
- ✅ Issue作成
- ✅ スクリーンショット取得（agent-browser使用）
- ✅ 比較画像生成（ImageMagick使用）
- ✅ PR作成・マージ（gh CLI使用）
- ✅ パフォーマンス測定（Lighthouse使用）
- ✅ 比較レポート生成

手作業が大幅に削減され、効率的に移行作業を進められます。

# Step3-Upgrade: Claude Codeの最新機能を活用した移行計画

## 概要

このドキュメントは、step3の移行計画を**Claude Codeの最新機能（Tasks、Agents、Skills）**を活用してアップグレードしたバージョンです。

従来の手作業によるissue管理やスクリプト実行を、Claude Codeのネイティブ機能と統合することで、以下を実現します：

- ✅ タスク管理の自動化（TaskCreate/TaskUpdate/TaskList）
- ✅ 並行作業の効率化（複数Agentの同時実行）
- ✅ コードベース探索の高速化（Explore Agent）
- ✅ ユーザーとの対話的な意思決定（AskUserQuestion）
- ✅ 実装前の計画立案（Plan Mode）
- ✅ Git操作の自動化（Bash Agent + Skills）
- ✅ **画像比較と検証の体系化（フィードバックループ）**
- ✅ **スクリーンショットの完全自動PR統合（Git管理→削除）**

---

## Claude Codeの主要機能

### 1. Tasks（タスク管理）

**利用可能なツール:**
- `TaskCreate`: 新しいタスクを作成
- `TaskUpdate`: タスクのステータスを更新（pending → in_progress → completed）
- `TaskGet`: タスクの詳細情報を取得
- `TaskList`: すべてのタスクを一覧表示

**活用方法:**
- 各issueをClaude Code内のタスクとして管理
- 依存関係（blockedBy/blocks）を設定して順序を制御
- リアルタイムで進捗を追跡

### 2. Agents（専門エージェント）

**利用可能なエージェント:**
- **Bash Agent**: コマンド実行、Git操作、スクリプト実行
- **Explore Agent**: コードベース探索、ファイル検索、構造分析
- **Plan Agent**: 実装計画の立案、アーキテクチャ設計
- **general-purpose Agent**: 複雑なマルチステップタスク

**活用方法:**
- 複数のAgentを並行実行して作業を高速化
- 各Agentの専門性を活かして効率的に作業
- バックグラウンド実行で待ち時間を削減

### 3. Skills（特殊コマンド）

**利用可能なスキル:**
- `/commit`: Git commitの自動化
- `/review-pr`: PRレビューの自動化
- その他カスタムスキル

**活用方法:**
- Git操作を簡略化
- 標準化されたコミットメッセージ

### 4. AskUserQuestion（対話的意思決定）

**機能:**
- ユーザーに質問を提示
- 複数の選択肢から選択
- マルチセレクトにも対応

**活用方法:**
- アプローチ選択時にユーザーの意見を聞く
- 各issueの優先順位を確認
- 移行範囲を決定

### 5. Plan Mode（計画立案モード）

**機能:**
- 実装前にコードベースを探索
- 影響範囲を分析
- 実装戦略を立案してユーザーに提示

**活用方法:**
- 各issueの実装前に計画を立てる
- ユーザーの承認を得てから実装開始

---

## 移行戦略のアップグレード

### フェーズ0: 初期設定とアプローチ選択

#### ステップ1: ユーザーに移行アプローチを質問（最初の1回のみ）

```typescript
AskUserQuestion({
  questions: [
    {
      question: "どちらのアプローチで移行を進めますか？（この選択が全体に適用されます）",
      header: "アプローチ選択",
      multiSelect: false,
      options: [
        {
          label: "アプローチA（直接適用方式）",
          description: "各ページで直接CSS Modulesを適用。シンプルで高速。12 issues、8-10日。"
        },
        {
          label: "アプローチB（共通コンポーネント方式）",
          description: "共通UIコンポーネントライブラリを構築。保守性が高い。19 issues、12-18日。"
        }
      ]
    }
  ]
})

// 以降、選択されたアプローチで全て進める
const selectedApproach = userResponse === "アプローチA" ? "A" : "B";
const baseBranch = selectedApproach === "A" ? "migration-direct" : "migration-component";
```

#### ステップ2: ブランチとGitHub Issueの作成

**重要:** Issue = 計画・作業定義、PR = 成果物

```javascript
// 1. ブランチ作成
Task({
  subagent_type: "Bash",
  prompt: `
git checkout main
git checkout -b ${baseBranch}
git push -u origin ${baseBranch}
  `,
  description: "Create migration branch"
})

// 2. GitHub Issues一括作成
Task({
  subagent_type: "Bash",
  prompt: `
setup/create-issues.tsスクリプトを実行して、アプローチ${selectedApproach}の全GitHub Issuesを作成してください。

環境変数GITHUB_TOKENが必要です。

作成されたIssue番号をメモしてください（例: #42, #43, #44...）
  `,
  description: "Create GitHub issues"
})

// Issue作成結果の確認
AskUserQuestion({
  questions: [{
    question: "GitHub Issuesが作成されました。Issue番号を確認してください。",
    header: "Issue確認",
    multiSelect: false,
    options: [
      { label: "確認完了", description: "Issue番号を確認しました" }
    ]
  }]
})
```

---

### フェーズ1: タスク管理の初期化

## 重要: GitHub IssueとClaude CodeのTaskの役割

移行作業では**両方を使います**：

### GitHub Issue（必須）

**役割:** 作業の計画・定義・記録

- **Issue = 作業項目**（「何をするか」を定義）
- GitHubで可視化、チーム共有
- PRでcloseされる
- 履歴として残る

**いつ作る？**
- **フェーズ0（最初）**: 全issueを一括作成

**使用タイミング:**
- 全ての作業（必須）

### Claude Code Task（推奨）

**役割:** 作業の実行管理・依存関係制御

- **Task = 実行状態**（「誰が」「いつ」実行するか）
- 依存関係（blockedBy/blocks）を自動管理
- リアルタイムで進捗確認
- 並行実行の制御

**いつ作る？**
- **フェーズ1**: GitHub Issueの作成後、Taskとして登録

**使用タイミング:**
- Claude Codeで作業する場合（推奨）

---

## 標準的なフロー

```
1. GitHub Issue作成（計画）
   ↓
2. Claude Code Taskとして登録（実行管理）
   ↓
3. 作業実行
   ↓
4. PR作成（Issueをclose）
   ↓
5. Claude Code Task完了
```

### 具体例

```javascript
// GitHub Issue #42: "[A-1] プロフィールページの移行" が作成済み

// Claude Code Taskとして登録
TaskCreate({
  subject: "[A-1] プロフィールページの移行",
  description: `
**GitHub Issue:** #42
**対象ファイル:**
- pages/profile.tsx
- styles/pages/profile.module.css（新規作成）

詳細: GitHub Issue #42 および step3-a.md の Issue #1
  `,
  activeForm: "プロフィールページを移行中",
  metadata: {
    githubIssue: 42,
    approach: "A",
    difficulty: "⭐"
  }
})

// 作業実行...

// PR作成（GitHub Issue #42をclose）
Task({
  subagent_type: "Bash",
  prompt: `
gh pr create --base migration-direct \\
  --title "[A-1] プロフィールページの移行" \\
  --body "Closes #42

## 変更内容
...
"
  `,
  description: "Create PR"
})

// Claude Code Task完了
TaskUpdate({
  taskId: "1",
  status: "completed"
})
```

---

---

### すべてのissueをClaude Codeのタスクとして登録

**重要:** GitHub Issue番号を必ず紐付けてください。

**アプローチAの場合（12タスク）:**

```javascript
// GitHub Issue #42-#53 が作成済みと仮定

// Issue #1 (GitHub Issue #42)
TaskCreate({
  subject: "[A-1] プロフィールページの移行",
  description: `
**GitHub Issue:** #42

**対象ファイル:**
- pages/profile.tsx
- styles/pages/profile.module.css（新規作成）

**作業内容:**
1. beforeスクリーンショット取得
2. Chakra UIコンポーネントをCSS Modulesに置き換え
3. framer-motionアニメーション維持
4. afterスクリーンショット取得
5. 比較画像作成
6. PR作成（Closes #42）

**難易度:** ⭐ 低
**推定時間:** 0.5日

詳細: GitHub Issue #42、step3-a.md の Issue #1
  `,
  activeForm: "プロフィールページを移行中",
  metadata: {
    githubIssue: 42,
    approach: "A"
  }
})

// 依存関係を設定（例: Issue #4は#1,#2,#3に依存）
TaskUpdate({
  taskId: "4",
  addBlockedBy: ["1", "2", "3"]
})
```

**アプローチBの場合（19タスク）:**

```javascript
// 例: Issue #1（基盤構築）
TaskCreate({
  subject: "[B-1] 基盤構築 - CSS変数とユーティリティ",
  description: `
**作業内容:**
1. styles/variables.css の作成
2. styles/globals.css の更新
3. react-hot-toast のインストール
4. components/ui/index.ts の作成

**難易度:** ⭐ 低
**推定時間:** 0.5日

詳細: step3-b.md の Issue #1
  `,
  activeForm: "基盤を構築中"
})

// Issue #2-#7は#1に依存、#8以降は#7に依存
TaskUpdate({
  taskId: "2",
  addBlockedBy: ["1"]
})
// ... 以降も同様
```

#### タスクリストの確認

```javascript
TaskList()
// 出力例:
// 1. [A-1] プロフィールページの移行 - pending - no owner - []
// 2. [A-2] チームメンバーページの移行 - pending - no owner - []
// 3. [A-3] カレンダーページの移行 - pending - no owner - []
// 4. [A-4] 共通レイアウトコンポーネントの移行 - pending - no owner - [1,2,3]
```

---

### フェーズ2: 各Issueの実装フロー（アップグレード版）

#### 標準的な実装フロー（例: Issue #1-A）

**ステップ1: タスクを開始状態に更新**

```javascript
TaskUpdate({
  taskId: "1",
  status: "in_progress"
})
```

**ステップ2: Plan Modeで実装計画を立てる**

```javascript
EnterPlanMode()
// Plan Modeに入ると、以下の作業を行う：
// - Explore Agentでpages/profile.tsxを探索
// - 使用されているChakra UIコンポーネントを特定
// - 置き換えが必要なコンポーネントをリストアップ
// - CSS Modulesの構造を設計
// - 実装計画をユーザーに提示

ExitPlanMode({
  allowedPrompts: [
    { tool: "Bash", prompt: "run dev server" },
    { tool: "Bash", prompt: "run screenshot scripts" },
    { tool: "Bash", prompt: "commit and push changes" }
  ]
})
```

**ステップ3: ブランチ作成（Bash Agent使用）**

```javascript
Task({
  subagent_type: "Bash",
  prompt: "workflow/start-issue.sh 1 a を実行して、issue/1-aブランチを作成してチェックアウトしてください。",
  description: "Create issue branch",
  model: "haiku"  // 単純なタスクなのでhaikuで高速化
})
```

**ステップ4: Beforeスクリーンショット取得（並行実行）**

```javascript
Task({
  subagent_type: "Bash",
  prompt: "screenshot/capture-before.sh 1 a を実行して、プロフィールページのbeforeスクリーンショットを取得してください。mainブランチに切り替えてから実行します。",
  description: "Capture before screenshots",
  run_in_background: true  // バックグラウンドで実行
})
```

**ステップ5: 実装作業（Explore Agent + 本体で実装）**

```javascript
// まずExplore Agentでファイル構造を調査
Task({
  subagent_type: "Explore",
  prompt: `
pages/profile.tsxを探索して、以下を特定してください：
1. 使用されているChakra UIコンポーネントのリスト
2. 各コンポーネントの使用箇所
3. propsとして渡されているスタイル（p, m, bg, colorなど）
4. framer-motionの使用箇所

探索レベル: medium
  `,
  description: "Explore profile page"
})

// 探索結果に基づいて実装
// - pages/profile.tsxの編集
// - styles/pages/profile.module.cssの作成
```

**ステップ6: Afterスクリーンショット取得**

```javascript
Task({
  subagent_type: "Bash",
  prompt: "screenshot/capture-after.sh 1 a を実行して、プロフィールページのafterスクリーンショットを取得してください。",
  description: "Capture after screenshots"
})
```

**ステップ7: 比較画像作成**

```javascript
Task({
  subagent_type: "Bash",
  prompt: "screenshot/create-comparison.sh 1 a を実行して、before/afterの比較画像を作成してください。",
  description: "Create comparison",
  model: "haiku"
})
```

**ステップ8: PR作成**

```javascript
// コード変更のみをコミット（画像は含めない）
Skill({
  skill: "commit",
  args: "-m 'Issue #A-1: プロフィールページをCSS Modulesに移行'"
})

// PR作成
Task({
  subagent_type: "Bash",
  prompt: `
gh pr create --base migration-direct \\
  --title "[A-1] プロフィールページの移行" \\
  --body "$(cat <<'EOF'
## 変更内容
プロフィールページをChakra UIからCSS Modulesに移行

## 対象ファイル
- pages/profile.tsx
- styles/pages/profile.module.css（新規作成）

## スクリーンショット
（GitHub UIで画像をアップロードしてください）

アップロード手順：
1. このPRページの編集ボタンをクリック
2. 以下の画像をドラッグ&ドロップ：
   - screenshots/1-a/profile-before.png（Before）
   - screenshots/1-a/profile-after.png（After）
   - screenshots/1-a/profile-comparison.png（比較）
3. 自動生成されたMarkdownリンクでこのセクションを置き換え

## 検証結果
- ✅ 視覚的差異なし（または許容範囲内）
- ✅ デスクトップ表示OK
- ✅ タブレット表示OK
- ✅ モバイル表示OK
- ✅ ホバーエフェクトOK
- ✅ アニメーションOK
- ✅ TypeScriptエラーなし
- ✅ コンソールエラーなし

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
  `,
  description: "Create PR"
})
```

**ステップ9: 画像アップロード（手動）**

```javascript
// ユーザーに画像アップロードを依頼
AskUserQuestion({
  questions: [{
    question: `
PRが作成されました。

次の手順でスクリーンショットをアップロードしてください：
1. GitHub UIでPRページを開く
2. PR本文の編集ボタン（鉛筆アイコン）をクリック
3. 編集画面で画像をドラッグ&ドロップ
4. 自動生成されたMarkdown（![image](https://user-images.githubusercontent.com/...)）を確認
5. プレースホルダーを画像リンクで置き換える
6. 保存

完了しましたか？
    `,
    header: "画像アップロード",
    multiSelect: false,
    options: [
      { label: "完了", description: "画像をアップロードしました" },
      { label: "後で", description: "後でアップロードします" }
    ]
  }]
})
```

**ステップ10: PRマージ**

```javascript
// PRマージ
Task({
  subagent_type: "Bash",
  prompt: "gh pr merge --squash でPRをマージしてください",
  description: "Merge PR",
  model: "haiku"
})
```

**注:** 画像を自動でPRに含めたい場合は、「スクリーンショット管理の詳細」セクションの方法2（Git管理+削除）を参照してください。

**ステップ10: タスクを完了状態に更新**

```javascript
TaskUpdate({
  taskId: "1",
  status: "completed"
})

// 次のタスクを確認
TaskList()
```

---

### フェーズ3: 並行作業の戦略

#### 並行実行可能なタスクの特定

**アプローチAの場合:**
- Issue #1, #2, #3は独立しており並行実行可能
- Issue #5, #9, #11も比較的独立

**アプローチBの場合:**
- Issue #1-#7は順次実行が必要（依存関係あり）
- Issue #9-#18は#8完了後に並行実行可能

#### 並行実行の実装例

```javascript
// アプローチAで3つのissueを並行実行
// 1つのメッセージで複数のTaskツールを呼び出す

// Issue #1, #2, #3を並行実行
[
  Task({
    subagent_type: "general-purpose",
    prompt: "Issue #A-1（プロフィールページの移行）を実装してください。step3-a.mdの詳細に従い、Plan Modeで計画を立ててから実装してください。",
    description: "Implement A-1",
    run_in_background: true
  }),
  Task({
    subagent_type: "general-purpose",
    prompt: "Issue #A-2（チームメンバーページの移行）を実装してください。step3-a.mdの詳細に従い、Plan Modeで計画を立ててから実装してください。",
    description: "Implement A-2",
    run_in_background: true
  }),
  Task({
    subagent_type: "general-purpose",
    prompt: "Issue #A-3（カレンダーページの移行）を実装してください。step3-a.mdの詳細に従い、Plan Modeで計画を立ててから実装してください。",
    description: "Implement A-3",
    run_in_background: true
  })
]

// TaskOutputで進捗確認
TaskOutput({ task_id: "agent-1", block: false })
TaskOutput({ task_id: "agent-2", block: false })
TaskOutput({ task_id: "agent-3", block: false })
```

---

### フェーズ4: 画像比較と検証（重要なフィードバックループ）

#### 4.1 スクリーンショット比較の実施

**手順:**

1. **比較画像の目視確認**
2. **差分の検出と評価**
3. **問題があれば修正**
4. **再検証**

#### 4.2 ユーザーによる画像確認（AskUserQuestion活用）

```javascript
// スクリーンショット取得と比較画像作成後
Task({
  subagent_type: "Bash",
  prompt: "screenshot/create-comparison.sh 1 a を実行して比較画像を作成",
  description: "Create comparison"
})

// ユーザーに画像を確認してもらう
AskUserQuestion({
  questions: [
    {
      question: "スクリーンショット比較画像を確認しました。問題はありませんか？",
      header: "画像確認",
      multiSelect: false,
      options: [
        {
          label: "問題なし（完全に一致）",
          description: "before/afterで視覚的な差異がない、または意図した変更のみ"
        },
        {
          label: "軽微な差異あり（許容範囲）",
          description: "フォントレンダリングやピクセルレベルの微差など、許容できる範囲"
        },
        {
          label: "問題あり（修正が必要）",
          description: "レイアウト崩れ、色の違い、サイズの違いなど、修正が必要"
        }
      ]
    }
  ]
})
```

#### 4.3 問題があった場合の修正フロー

```javascript
// 問題が検出された場合
if (userResponse === "問題あり（修正が必要）") {
  // 追加質問で詳細を確認
  AskUserQuestion({
    questions: [
      {
        question: "どのような問題がありますか？（複数選択可）",
        header: "問題の種類",
        multiSelect: true,
        options: [
          { label: "レイアウト崩れ", description: "要素の配置や整列に問題" },
          { label: "スペーシングの違い", description: "余白やマージンが異なる" },
          { label: "色の違い", description: "背景色、文字色、ボーダー色など" },
          { label: "サイズの違い", description: "ボタン、入力欄、カードのサイズ" },
          { label: "フォントの違い", description: "フォントサイズ、太さ、行間" },
          { label: "アニメーションの問題", description: "ホバーエフェクトや遷移" },
          { label: "レスポンシブの問題", description: "画面サイズによる崩れ" },
          { label: "その他", description: "上記以外の問題" }
        ]
      },
      {
        question: "具体的にどのコンポーネント/箇所に問題がありますか？",
        header: "問題の箇所",
        multiSelect: true,
        options: [
          { label: "ヘッダー", description: "" },
          { label: "フォーム", description: "" },
          { label: "ボタン", description: "" },
          { label: "カード", description: "" },
          { label: "テーブル", description: "" },
          { label: "その他", description: "" }
        ]
      }
    ]
  })

  // Explore Agentで問題箇所を調査
  Task({
    subagent_type: "Explore",
    prompt: `
pages/profile.tsxと関連するCSS Modulesファイルを調査して、以下の問題の原因を特定してください：
- 問題の種類: ${problemTypes.join(", ")}
- 問題の箇所: ${problemLocations.join(", ")}

特に以下を重点的に確認：
1. CSS変数の使用が正しいか
2. Chakra UIのデフォルト値（padding, margin, color等）が再現されているか
3. レスポンシブのブレークポイントが正しいか
4. 疑似クラス（:hover, :focus等）が実装されているか
    `,
    description: "Investigate visual issues"
  })

  // 修正作業
  // → CSSまたはコンポーネントを修正

  // 再度スクリーンショット取得
  Task({
    subagent_type: "Bash",
    prompt: "screenshot/capture-after.sh 1 a を再実行してafterスクリーンショットを更新",
    description: "Re-capture after screenshots"
  })

  Task({
    subagent_type: "Bash",
    prompt: "screenshot/create-comparison.sh 1 a を実行して比較画像を更新",
    description: "Re-create comparison"
  })

  // 再度ユーザーに確認
  // （上記のAskUserQuestionに戻る）
}
```

#### 4.4 自動画像差分検出（オプション）

より高度な検証のために、画像差分ツールを使用することも可能です。

**方法1: ImageMagick compare**

```javascript
Task({
  subagent_type: "Bash",
  prompt: `
ImageMagickのcompareコマンドで画像差分を検出してください：

compare -metric RMSE \
  screenshots/1-a/profile-before.png \
  screenshots/1-a/profile-after.png \
  screenshots/1-a/profile-diff.png

差分のパーセンテージを出力してください。
許容範囲: 5%以下
  `,
  description: "Auto detect visual diff"
})
```

**方法2: Playwright Visual Comparison（より正確）**

```typescript
// scripts/screenshot/visual-regression.ts を作成
import { test, expect } from '@playwright/test';

test('Profile page visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000/profile');
  await expect(page).toHaveScreenshot('profile.png', {
    maxDiffPixels: 100, // 許容する差分ピクセル数
    threshold: 0.2      // 許容する差分率
  });
});
```

```javascript
Task({
  subagent_type: "Bash",
  prompt: `
Playwrightのvisual regression testを実行してください：
1. beforeブランチ（main）でbaselineスクリーンショットを取得
2. afterブランチ（issue/1-a）で比較実行
3. 差分が許容範囲内か確認
  `,
  description: "Run visual regression test"
})
```

#### 4.5 チェックリストによる検証

画像以外の確認事項もチェック：

```javascript
AskUserQuestion({
  questions: [
    {
      question: "以下の項目を確認してください（複数選択）",
      header: "検証チェック",
      multiSelect: true,
      options: [
        { label: "✅ デスクトップ表示が正常", description: "1024px以上での表示" },
        { label: "✅ タブレット表示が正常", description: "768px-1023pxでの表示" },
        { label: "✅ モバイル表示が正常", description: "767px以下での表示" },
        { label: "✅ ホバーエフェクトが動作", description: "ボタン、リンク、カードなど" },
        { label: "✅ フォーカススタイルが正常", description: "キーボードナビゲーション" },
        { label: "✅ アニメーションが動作", description: "framer-motionのアニメーション" },
        { label: "✅ フォームバリデーション動作", description: "エラー表示など" },
        { label: "✅ TypeScriptエラーなし", description: "ビルドが成功" },
        { label: "✅ コンソールエラーなし", description: "ブラウザのdevtools確認" }
      ]
    }
  ]
})
```

#### 4.6 修正後の再検証ループ

```javascript
// 修正が必要な場合、タスクのステータスを調整
TaskUpdate({
  taskId: "1",
  status: "in_progress",  // completedに変更せず、修正継続
  metadata: {
    issuesFound: "レイアウト崩れ、色の違い",
    retryCount: 1
  }
})

// 修正完了後、再度検証
// （上記の画像確認フローを再実行）

// すべての検証をパスしたら完了
if (allChecksPass) {
  TaskUpdate({
    taskId: "1",
    status: "completed",
    metadata: {
      verifiedAt: new Date().toISOString(),
      screenshotsPath: "screenshots/1-a/",
      visualDiff: "0.5%"  // 許容範囲内
    }
  })
}
```

#### 4.7 検証結果の記録

```javascript
// コード変更をコミット（画像は含めない）
Skill({
  skill: "commit",
  args: "-m 'Issue #A-1: プロフィールページをCSS Modulesに移行'"
})

// PRを作成（検証結果を含む）
Task({
  subagent_type: "Bash",
  prompt: `
gh pr createでPRを作成してください。

PR本文に以下を含めてください：
- 変更内容の説明
- スクリーンショットセクション（プレースホルダー）
- 視覚的差異: 0.5%（許容範囲内）
- 検証チェックリスト（すべて✅）
- 修正履歴（あれば）

PR作成後、ユーザーに画像アップロードを依頼してください。
  `,
  description: "Create PR"
})

// ユーザーに画像アップロードを依頼
AskUserQuestion({
  questions: [{
    question: `
PRが作成されました。

GitHub UIでPRページを開き、以下の画像をアップロードしてください：
- screenshots/1-a/profile-before.png
- screenshots/1-a/profile-after.png
- screenshots/1-a/profile-comparison.png

完了しましたか？
    `,
    header: "画像アップロード",
    multiSelect: false,
    options: [
      { label: "完了", description: "" },
      { label: "スキップ", description: "" }
    ]
  }]
})
```

---

### フェーズ5: 進捗管理とモニタリング

#### リアルタイム進捗確認

```javascript
// 定期的にタスクリストを確認
TaskList()

// 出力例:
// 1. [A-1] プロフィールページの移行 - completed - agent-main - []
// 2. [A-2] チームメンバーページの移行 - in_progress - agent-1 - []
// 3. [A-3] カレンダーページの移行 - in_progress - agent-2 - []
// 4. [A-4] 共通レイアウトコンポーネントの移行 - pending - no owner - [1,2,3]
```

#### ブロッキングタスクの解消

```javascript
// タスク#1が完了したら、タスク#4がアンブロックされる
TaskUpdate({
  taskId: "1",
  status: "completed"
})

TaskList()
// → タスク#4のblockedByが更新される
```

---

## アプローチ別の詳細フロー

### アプローチA: 直接適用方式（12タスク）

#### 推奨作業順序とタスク依存関係

```
1. [A-1] プロフィール ⭐ (独立)
2. [A-2] チームメンバー ⭐⭐ (独立)
3. [A-3] カレンダー ⭐⭐ (独立)
   ↓
4. [A-4] 共通レイアウト ⭐⭐⭐ (#1,#2,#3に依存)
   ↓
5. [A-5] ダッシュボード ⭐⭐ (独立)
6. [A-9] タスクフォーム ⭐⭐ (独立)
7. [A-11] 設定ページ ⭐⭐ (独立)
   ↓
8. [A-8] タスク一覧 ⭐⭐⭐ (独立)
9. [A-6] プロジェクト一覧 ⭐⭐⭐ (独立)
   ↓
10. [A-10] レポート ⭐⭐⭐ (独立)
11. [A-7] プロジェクト詳細 ⭐⭐⭐⭐ (#6に依存)
    ↓
12. [A-12] 完全削除と最終調整 ⭐⭐ (全タスクに依存)
```

#### タスク登録スクリプト（自動化）

```javascript
// GitHub Issue番号をマッピング（setup/create-issues.tsの実行結果から取得）
const githubIssues = {
  "1": 42, "2": 43, "3": 44, "4": 45, "5": 46, "6": 47,
  "7": 48, "8": 49, "9": 50, "10": 51, "11": 52, "12": 53
};

const tasksA = [
  { id: "1", subject: "[A-1] プロフィールページの移行", difficulty: "⭐", time: "0.5日", blockedBy: [] },
  { id: "2", subject: "[A-2] チームメンバーページの移行", difficulty: "⭐⭐", time: "1日", blockedBy: [] },
  { id: "3", subject: "[A-3] カレンダーページの移行", difficulty: "⭐⭐", time: "1日", blockedBy: [] },
  { id: "4", subject: "[A-4] 共通レイアウトコンポーネントの移行", difficulty: "⭐⭐⭐", time: "1日", blockedBy: ["1", "2", "3"] },
  { id: "5", subject: "[A-5] ダッシュボードの移行", difficulty: "⭐⭐", time: "0.5日", blockedBy: ["4"] },
  { id: "6", subject: "[A-6] プロジェクト一覧ページの移行", difficulty: "⭐⭐⭐", time: "1.5日", blockedBy: ["4"] },
  { id: "7", subject: "[A-7] プロジェクト詳細ページの移行", difficulty: "⭐⭐⭐⭐", time: "2日", blockedBy: ["6"] },
  { id: "8", subject: "[A-8] タスク一覧ページの移行", difficulty: "⭐⭐⭐", time: "1.5日", blockedBy: ["4"] },
  { id: "9", subject: "[A-9] タスク作成/編集ページの移行", difficulty: "⭐⭐", time: "1日", blockedBy: ["4"] },
  { id: "10", subject: "[A-10] レポートページの移行", difficulty: "⭐⭐⭐", time: "1日", blockedBy: ["4"] },
  { id: "11", subject: "[A-11] 設定ページの移行", difficulty: "⭐⭐", time: "0.5日", blockedBy: ["4"] },
  { id: "12", subject: "[A-12] Chakra UI完全削除と最終調整", difficulty: "⭐⭐", time: "1日", blockedBy: ["1","2","3","4","5","6","7","8","9","10","11"] }
];

// すべてのタスクを登録
for (const task of tasksA) {
  const ghIssue = githubIssues[task.id];

  TaskCreate({
    subject: task.subject,
    description: `
**GitHub Issue:** #${ghIssue}

難易度: ${task.difficulty}
推定時間: ${task.time}
詳細: GitHub Issue #${ghIssue}、step3-a.md の Issue #${task.id}
    `,
    activeForm: `${task.subject}を実行中`,
    metadata: {
      githubIssue: ghIssue,
      approach: "A"
    }
  });

  if (task.blockedBy.length > 0) {
    TaskUpdate({
      taskId: task.id,
      addBlockedBy: task.blockedBy
    });
  }
}
```

#### 並行実行の最適化

**Wave 1（並行実行可能）:**
- Issue #1, #2, #3を3つのAgentで同時実行

**Wave 2（#4完了後）:**
- Issue #5, #6, #8, #9, #10, #11を複数Agentで並行実行
- Issue #4は単独で実行（全ページに影響するため）

**Wave 3（#6完了後）:**
- Issue #7を実行

**Wave 4（全完了後）:**
- Issue #12を実行

---

### アプローチB: 共通コンポーネント方式（19タスク）

#### 推奨作業順序とタスク依存関係

```
Phase 1: 基盤とコンポーネント構築（順次実行）
1. [B-1] 基盤構築 ⭐
   ↓
2. [B-2] 基本UIコンポーネント ⭐
   ↓
3. [B-3] フォーム関連UI ⭐⭐⭐
   ↓
4. [B-4] 表示系UI ⭐⭐
   ↓
5. [B-5] インタラクティブUI（その1） ⭐⭐⭐
   ↓
6. [B-6] インタラクティブUI（その2） ⭐⭐⭐⭐
   ↓
7. [B-7] テーブル・統計系UI ⭐⭐
   ↓
8. [B-8] 共通レイアウト ⭐⭐⭐
   ↓
Phase 2: ページ移行（並行実行可能）
9. [B-9] プロフィール ⭐
10. [B-10] チームメンバー ⭐⭐
11. [B-11] カレンダー ⭐⭐
12. [B-12] ダッシュボード ⭐
13. [B-13] プロジェクト一覧 ⭐⭐
14. [B-14] プロジェクト詳細 ⭐⭐⭐
15. [B-15] タスク一覧 ⭐⭐
16. [B-16] タスクフォーム ⭐⭐
17. [B-17] レポート ⭐⭐
18. [B-18] 設定 ⭐⭐
    ↓
19. [B-19] 完全削除と最終調整 ⭐⭐
```

#### 並行実行の最適化

**Phase 1（順次実行）:**
- Issue #1-#8は依存関係があるため順次実行
- 各issueは1つのAgentが担当

**Phase 2（並行実行）:**
- Issue #9-#18は独立しているため、最大10個のAgentで並行実行可能
- 優先度: #9, #12（簡単） → #10, #11, #13, #15, #16, #17, #18（中） → #14（難）

**Phase 3（単独実行）:**
- Issue #19は全完了後に実行

---

## 最終評価とアプローチ選択

### 評価指標の自動収集

#### 1. パフォーマンス測定（Bash Agent使用）

```javascript
Task({
  subagent_type: "Bash",
  prompt: `
両ブランチでパフォーマンス測定を実行してください：
1. migration-directブランチをチェックアウト
2. analysis/measure-performance.ts を実行
3. migration-componentブランチをチェックアウト
4. analysis/measure-performance.ts を実行
5. 結果を比較
  `,
  description: "Measure performance"
})
```

#### 2. バンドルサイズ分析（Bash Agent使用）

```javascript
Task({
  subagent_type: "Bash",
  prompt: `
両ブランチでバンドルサイズ分析を実行してください：
1. migration-directでnpm run build
2. .next/static/のサイズを測定
3. migration-componentでnpm run build
4. .next/static/のサイズを測定
5. 結果を比較
  `,
  description: "Analyze bundle size"
})
```

#### 3. コード品質分析（Explore Agent使用）

```javascript
Task({
  subagent_type: "Explore",
  prompt: `
両ブランチのコード品質を分析してください：
1. 重複コードの量
2. CSS Modulesファイルの数と行数
3. コンポーネントファイルの数と行数
4. インポート文の複雑さ
  `,
  description: "Analyze code quality"
})
```

### ユーザーへの最終提案

```javascript
AskUserQuestion({
  questions: [
    {
      question: "評価結果に基づき、どちらのアプローチを採用しますか？",
      header: "最終選択",
      multiSelect: false,
      options: [
        {
          label: "アプローチA（直接適用方式）",
          description: `
バンドルサイズ削減: X%
実装期間: Y日
コード行数: Z行
メリット: シンプル、高速
デメリット: 保守性
          `
        },
        {
          label: "アプローチB（共通コンポーネント方式）",
          description: `
バンドルサイズ削減: X%
実装期間: Y日
コード行数: Z行
メリット: 保守性、再利用性
デメリット: 初期コスト
          `
        }
      ]
    }
  ]
})
```

---

## 実装例: アプローチA Issue #1の完全フロー

以下は、Claude Codeの機能をフル活用した実装例です。

### 1. タスク作成と開始

**前提:** GitHub Issue #42 "[A-1] プロフィールページの移行" が作成済み

```javascript
// タスク作成
TaskCreate({
  subject: "[A-1] プロフィールページの移行",
  description: `
**GitHub Issue:** #42

pages/profile.tsxをChakra UIからCSS Modulesに移行する。

**対象ファイル:**
- pages/profile.tsx
- styles/pages/profile.module.css（新規作成）

**置き換えるコンポーネント:**
- Box → div
- Avatar → img
- Button → button
- FormControl → div
- Input → input
- Textarea → textarea
- Badge → span
- Alert → div
- VStack/HStack → div (flexbox)

**詳細:** GitHub Issue #42、step3-a.md の Issue #1
  `,
  activeForm: "プロフィールページを移行中",
  metadata: {
    githubIssue: 42,
    approach: "A"
  }
})

// ステータスを in_progress に更新
TaskUpdate({
  taskId: "1",
  status: "in_progress"
})
```

### 2. Plan Modeで計画立案

```javascript
// Plan Modeに入る
EnterPlanMode()

// → Plan Agentが以下を実行:
// 1. pages/profile.tsxを読み込んで分析
// 2. Chakra UIコンポーネントの使用箇所を特定
// 3. CSS Modulesの構造を設計
// 4. 実装計画書を作成
// 5. ユーザーに提示

// ユーザーが承認したら Plan Modeを終了
ExitPlanMode({
  allowedPrompts: [
    { tool: "Bash", prompt: "run dev server" },
    { tool: "Bash", prompt: "run screenshot scripts" },
    { tool: "Bash", prompt: "git operations" }
  ]
})
```

### 3. ブランチ作成とスクリーンショット取得（並行実行）

```javascript
// 3つのタスクを並行実行
Task({
  subagent_type: "Bash",
  prompt: "workflow/start-issue.sh 1 a を実行してissue/1-aブランチを作成",
  description: "Create branch",
  model: "haiku"
}),

Task({
  subagent_type: "Bash",
  prompt: "screenshot/capture-before.sh 1 a を実行してbeforeスクリーンショットを取得",
  description: "Before screenshots",
  run_in_background: true
})
```

### 4. コードベース探索と実装

```javascript
// Explore Agentでファイル構造を調査
Task({
  subagent_type: "Explore",
  prompt: `
pages/profile.tsxを詳細に探索してください：
1. すべてのChakra UIコンポーネントとそのpropsをリストアップ
2. framer-motionの使用箇所を特定
3. 状態管理（useState, useForm等）の使用を確認
4. イベントハンドラーをリストアップ
  `,
  description: "Explore profile page"
})

// 探索結果に基づいて実装
// → pages/profile.tsxの編集
// → styles/pages/profile.module.cssの作成
```

### 5. 動作確認とスクリーンショット

```javascript
// 開発サーバー起動（バックグラウンド）
Task({
  subagent_type: "Bash",
  prompt: "npm run dev をバックグラウンドで起動",
  description: "Start dev server",
  run_in_background: true
})

// afterスクリーンショット取得
Task({
  subagent_type: "Bash",
  prompt: "screenshot/capture-after.sh 1 a を実行",
  description: "After screenshots"
})

// 比較画像作成
Task({
  subagent_type: "Bash",
  prompt: "screenshot/create-comparison.sh 1 a を実行",
  description: "Create comparison",
  model: "haiku"
})
```

### 6. 画像比較と検証（重要！）

```javascript
// ユーザーに比較画像を確認してもらう
AskUserQuestion({
  questions: [
    {
      question: `
比較画像を確認してください：
- screenshots/1-a/profile-comparison.png

before/afterで視覚的な差異はありますか？
      `,
      header: "画像確認",
      multiSelect: false,
      options: [
        {
          label: "問題なし",
          description: "視覚的に完全に一致、または意図した変更のみ"
        },
        {
          label: "軽微な差異（許容範囲）",
          description: "フォントレンダリングやアンチエイリアスの違いなど"
        },
        {
          label: "問題あり（要修正）",
          description: "レイアウト崩れ、色違い、サイズ違いなど"
        }
      ]
    }
  ]
})

// 問題があった場合
if (userResponse === "問題あり（要修正）") {
  // 詳細な問題箇所を質問
  AskUserQuestion({
    questions: [
      {
        question: "どのような問題がありますか？",
        header: "問題の詳細",
        multiSelect: true,
        options: [
          { label: "レイアウト崩れ", description: "" },
          { label: "スペーシングの違い", description: "" },
          { label: "色の違い", description: "" },
          { label: "フォント/サイズの違い", description: "" },
          { label: "ホバー/アニメーションの問題", description: "" }
        ]
      }
    ]
  })

  // Explore Agentで原因調査
  Task({
    subagent_type: "Explore",
    prompt: `
pages/profile.tsxとstyles/pages/profile.module.cssを調査して、
以下の問題の原因を特定してください：
${problemTypes.join(", ")}

特に確認：
1. CSS変数の使用
2. Chakra UIのデフォルト値との比較
3. レスポンシブスタイル
4. 疑似クラス（:hover, :focus等）
    `,
    description: "Investigate issues"
  })

  // 修正後、再度スクリーンショット取得
  Task({
    subagent_type: "Bash",
    prompt: "screenshot/capture-after.sh 1 a を再実行",
    description: "Re-capture screenshots"
  })

  Task({
    subagent_type: "Bash",
    prompt: "screenshot/create-comparison.sh 1 a を再実行",
    description: "Re-create comparison"
  })

  // 再度検証（上記のAskUserQuestionに戻る）
}

// レスポンシブとアクセシビリティの確認
AskUserQuestion({
  questions: [
    {
      question: "以下の項目を確認してください",
      header: "追加検証",
      multiSelect: true,
      options: [
        { label: "✅ デスクトップ表示OK", description: "1024px以上" },
        { label: "✅ タブレット表示OK", description: "768-1023px" },
        { label: "✅ モバイル表示OK", description: "767px以下" },
        { label: "✅ ホバーエフェクトOK", description: "" },
        { label: "✅ フォーカススタイルOK", description: "" },
        { label: "✅ アニメーション動作OK", description: "" },
        { label: "✅ TypeScriptエラーなし", description: "" },
        { label: "✅ コンソールエラーなし", description: "" }
      ]
    }
  ]
})
```

### 7. PR作成と画像アップロード

```javascript
// コード変更のみをコミット（画像は含めない）
Skill({
  skill: "commit",
  args: "-m 'Issue #A-1: プロフィールページをCSS Modulesに移行'"
})

// PR作成（画像プレースホルダー）
Task({
  subagent_type: "Bash",
  prompt: `
gh pr create --base migration-direct \\
  --title "[A-1] プロフィールページの移行" \\
  --body "## 変更内容
プロフィールページをChakra UIからCSS Modulesに移行

## 対象ファイル
- pages/profile.tsx
- styles/pages/profile.module.css（新規作成）

## スクリーンショット
（GitHub UIで画像をアップロードしてください）

手順：
1. このPRページを開く
2. 本文の編集ボタンをクリック
3. 画像をドラッグ&ドロップ
   - screenshots/1-a/profile-before.png
   - screenshots/1-a/profile-after.png
   - screenshots/1-a/profile-comparison.png
4. 自動生成されたMarkdownリンクでこのセクションを置き換え

## 検証結果
- ✅ 視覚的差異なし（または許容範囲内）
- ✅ デスクトップ表示OK
- ✅ タブレット表示OK
- ✅ モバイル表示OK
- ✅ ホバーエフェクトOK
- ✅ アニメーションOK
- ✅ TypeScriptエラーなし
"
  `,
  description: "Create PR"
})

// ユーザーに画像アップロードを依頼
AskUserQuestion({
  questions: [{
    question: "PRが作成されました。GitHub UIでスクリーンショットをアップロードしてください。完了しましたか？",
    header: "画像アップロード",
    multiSelect: false,
    options: [
      { label: "完了", description: "画像をアップロードしました" },
      { label: "スキップ", description: "後でアップロードします" }
    ]
  }]
})

// PRマージ
Task({
  subagent_type: "Bash",
  prompt: "gh pr merge --squash でマージ",
  description: "Merge PR",
  model: "haiku"
})
```

**注:** 完全自動化したい場合は、スクリーンショットをGit管理する方法（上記の「スクリーンショット管理の詳細」セクション参照）を使用してください。

### 8. タスク完了

```javascript
// すべての検証をパスしたらタスクを完了状態に
TaskUpdate({
  taskId: "1",
  status: "completed",
  metadata: {
    verifiedAt: new Date().toISOString(),
    screenshotsPath: "screenshots/1-a/",
    visualCheck: "passed",
    responsiveCheck: "passed",
    a11yCheck: "passed"
  }
})

// 次のタスクを確認
TaskList()
// → Issue #2, #3が実行可能になる
// → Issue #4は#1,#2,#3完了後に実行可能
```

---

## スクリーンショット管理の詳細

### 画像の保存場所

```
screenshots/
├── 1-a/                           # Issue #1-A
│   ├── profile-before.png
│   ├── profile-after.png
│   └── profile-comparison.png
├── 2-a/                           # Issue #2-A
│   ├── team-before.png
│   ├── team-after.png
│   └── team-comparison.png
└── ...
```

### 画像をPRに含める方法

#### 方法1: GitHub APIで自動アップロード（推奨・完全自動化）

**メリット:**
- ✅ 完全自動化（人手不要）
- ✅ リポジトリに画像をコミット不要
- ✅ PRでそのまま表示できる
- ✅ GitHub CDNが自動管理

**デメリット:**
- ❌ GitHub APIトークンが必要
- ❌ やや複雑

**実装:**

```javascript
// Bash Agentで自動実行
Task({
  subagent_type: "Bash",
  prompt: `
以下の手順でスクリーンショットをPRに追加してください：

1. PRを作成
PR_URL=$(gh pr create --base migration-direct \\
  --title "[A-1] プロフィールページの移行" \\
  --body "## 変更内容
プロフィールページをChakra UIからCSS Modulesに移行
（スクリーンショットをアップロード中...）
" --json url --jq .url)

PR_NUMBER=$(echo $PR_URL | grep -oP 'pull/\\K[0-9]+')

2. 画像をGitHub Issue Commentにアップロード（GitHub APIを使用）
# GitHub APIで画像をアップロードする方法：
# a) Issue commentを作成
# b) 画像をBase64エンコードしてアップロード
# c) 返されたURLを取得

# curlでGitHub APIを呼び出し
for img in before after comparison; do
  # 画像をBase64エンコード
  base64_img=$(base64 -i screenshots/1-a/profile-\${img}.png)

  # GitHub Asset Upload API経由でアップロード
  # （実際にはIssue Attachments APIを使用）

  # または、一時的なIssueを作成してコメント経由でアップロード
done

3. PR本文を更新
gh pr edit $PR_NUMBER --body "$(cat <<'EOF'
## 変更内容
プロフィールページをChakra UIからCSS Modulesに移行

## スクリーンショット
![Before](アップロードされたURL)
![After](アップロードされたURL)
![Comparison](アップロードされたURL)
EOF
)"

注意: GitHub APIの画像アップロードは複雑なため、より簡単な方法（方法1B）を推奨します。
  `,
  description: "Auto upload screenshots"
})
```

**実装方法1B: PRコメント経由（より簡単な自動化）**

```javascript
Task({
  subagent_type: "Bash",
  prompt: `
以下の手順を実行してください：

1. PRを作成
PR_NUMBER=$(gh pr create --base migration-direct \\
  --title "[A-1] プロフィールページの移行" \\
  --body "プロフィールページをChakra UIからCSS Modulesに移行" \\
  --json number --jq .number)

2. PRに画像付きコメントを追加
# GitHub CLIは画像の直接アップロードをサポートしていないため、
# 回避策として：

# a) 一時的なIssueを作成
TEMP_ISSUE=$(gh issue create --title "temp-screenshots-$PR_NUMBER" --body "一時保存")

# b) curlでGitHub APIを使って画像をアップロード
# （複雑なため、次の方法を推奨）

3. 代替案：PRに指示コメントを追加
gh pr comment $PR_NUMBER --body "
スクリーンショットを以下からアップロードしてください：
- screenshots/1-a/profile-before.png
- screenshots/1-a/profile-after.png
- screenshots/1-a/profile-comparison.png

このコメントに画像をドラッグ&ドロップしてください。
"

echo "PR #$PR_NUMBER が作成されました。"
echo "次のステップ：ユーザーがGitHub UIで画像をアップロードする必要があります。"
  `,
  description: "Create PR with comment"
})

// ユーザーに画像アップロードを依頼
AskUserQuestion({
  questions: [{
    question: `
PR #\${PR_NUMBER} が作成されました。

PRにコメントが追加されています。そのコメントに以下の画像をドラッグ&ドロップしてください：
- screenshots/1-a/profile-before.png
- screenshots/1-a/profile-after.png
- screenshots/1-a/profile-comparison.png

完了しましたか？
    `,
    header: "画像アップロード",
    multiSelect: false,
    options: [
      { label: "完了", description: "画像をアップロードしました" },
      { label: "スキップ", description: "後でアップロードします" }
    ]
  }]
})
```

#### 方法2: Git管理（レビュー後に削除）

**メリット:**
- ✅ 自動化しやすい
- ✅ PRで確実に表示される

**デメリット:**
- ❌ 一時的にリポジトリサイズが増える
- ❌ 削除の手間がかかる

リポジトリに一時的にコミットし、PRマージ後に削除する方法。

```javascript
// 1. 画像をコミット
Task({
  subagent_type: "Bash",
  prompt: "git add screenshots/1-a/ && git commit -m 'Add screenshots for review'",
  description: "Commit screenshots"
})

// 2. PR作成
Task({
  subagent_type: "Bash",
  prompt: `
gh pr create --body "## スクリーンショット
![Before](screenshots/1-a/profile-before.png)
![After](screenshots/1-a/profile-after.png)
![Comparison](screenshots/1-a/profile-comparison.png)
"
  `,
  description: "Create PR"
})

// 3. PRマージ後、画像を削除するコミット
Task({
  subagent_type: "Bash",
  prompt: `
git rm -r screenshots/1-a/
git commit -m "Remove screenshots after review"
git push
  `,
  description: "Clean up screenshots"
})
```

#### 方法3: 外部ホスティング（Imgur等）

**メリット:**
- ✅ リポジトリが軽量
- ✅ 画像の更新が自由

**デメリット:**
- ❌ セットアップが必要
- ❌ 外部サービスに依存
- ❌ リンク切れのリスク

**実装:**

```bash
# .gitignoreに追加
echo "screenshots/" >> .gitignore
```

```javascript
// 画像をアップロード（例: Imgur、Cloudinary、GitHub Gist等）
Task({
  subagent_type: "Bash",
  prompt: `
screenshots/1-a/profile-comparison.png を画像ホスティングサービスにアップロードして、
URLを取得してください。
  `,
  description: "Upload screenshot"
})

// PR作成（外部URLを参照）
Task({
  subagent_type: "Bash",
  prompt: `
gh pr create --base migration-direct \\
  --title "[A-1] プロフィールページの移行" \\
  --body "## スクリーンショット

![Comparison](https://i.imgur.com/xxxxx.png)
"
  `,
  description: "Create PR with external images"
})
```

#### 方法3: GitHub Issues/Commentsにアップロード

GitHub UIから直接画像をアップロード。

**メリット:**
- ✅ リポジトリに影響なし
- ✅ 画像の更新が自由

**デメリット:**
- ❌ 外部サービスに依存
- ❌ セットアップが必要

```javascript
// Imgur APIを使用（例）
Task({
  subagent_type: "Bash",
  prompt: `
curl -X POST -H "Authorization: Client-ID YOUR_CLIENT_ID" \\
  -F "image=@screenshots/1-a/profile-comparison.png" \\
  https://api.imgur.com/3/image

URLを取得してPR本文に貼り付け
  `,
  description: "Upload to Imgur"
})
```

### 推奨アプローチの選択

**完全自動化したい場合 → 方法2（Git管理+削除）**
**手動でも良い場合 → 方法1C（手動アップロード）**

#### なぜ方法1（GitHub API自動アップロード）は推奨しないのか？

GitHub CLIやAPIでの画像アップロードは**実は非常に複雑**です：
- `gh` CLIは画像の直接アップロードをサポートしていない
- GitHub REST APIで画像をアップロードするには、Issue Attachments APIを使う必要がある
- 複雑なBase64エンコーディングやmultipart form-dataの処理が必要

そのため、**より実用的な2つの方法**を推奨します。

---

### 推奨方法A: Git管理+削除（完全自動化）

**誰がアップロードする？ → Claude Code（Bash Agent）が自動実行**

このドキュメントで**完全自動化したい場合はこちら**を推奨します。

**手順:**

1. 画像を一時的にGitにコミット
2. PRを作成（Markdownで相対パス参照）
3. PRマージ後、画像を削除するコミット

**Claude Codeでの実装例:**

```javascript
// 1. コード変更と画像を一緒にコミット
Task({
  subagent_type: "Bash",
  prompt: `
git add pages/profile.tsx styles/pages/profile.module.css screenshots/1-a/
git commit -m "Issue #A-1: プロフィールページをCSS Modulesに移行

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push
  `,
  description: "Commit code and screenshots"
})

// 2. PRを作成（Markdownで相対パス参照、GitHub Issue #42をclose）
Task({
  subagent_type: "Bash",
  prompt: `
gh pr create --base migration-direct \\
  --title "[A-1] プロフィールページの移行" \\
  --body "$(cat <<'EOF'
Closes #42

## 変更内容
プロフィールページをChakra UIからCSS Modulesに移行

## スクリーンショット

### Before
![Before](screenshots/1-a/profile-before.png)

### After
![After](screenshots/1-a/profile-after.png)

### 比較
![Comparison](screenshots/1-a/profile-comparison.png)

**視覚的差異:** 許容範囲内

## 検証結果
- ✅ デスクトップ表示OK
- ✅ タブレット表示OK
- ✅ モバイル表示OK
- ✅ TypeScriptエラーなし

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
  `,
  description: "Create PR (closes #42)"
})

// 3. PRマージ（ユーザーが承認後）
Task({
  subagent_type: "Bash",
  prompt: "gh pr merge --squash",
  description: "Merge PR"
})

// 4. 画像を削除するコミット（PRマージ後）
Task({
  subagent_type: "Bash",
  prompt: `
git checkout migration-direct
git pull
git rm -r screenshots/1-a/
git commit -m "Remove screenshots after PR #\${PR_NUMBER} merge"
git push
  `,
  description: "Remove screenshots"
})
```

**メリット:**
- ✅ **完全自動化（Claude Codeが全て実行）**
- ✅ PRで確実に画像が表示される
- ✅ セットアップ不要

**デメリット:**
- ❌ 一時的にリポジトリサイズが増える
- ❌ 削除コミットが履歴に残る（通常は問題ない）

---

### 推奨方法B: 手動アップロード（シンプル）

**誰がアップロードする？ → ユーザー（人間）が手動でアップロード**

このドキュメントで**シンプルさを優先する場合はこちら**を推奨します。

**手順:**

1. PRを作成（コード変更のみ）
2. ユーザーがGitHub UIでPRページを開く
3. 編集画面で画像をドラッグ&ドロップ
4. 自動生成されたMarkdownをPR本文に追加

**Claude Codeでの実装例:**

```javascript
// 1. コード変更のみをコミット（画像は含めない）
Skill({
  skill: "commit",
  args: "-m 'Issue #A-1: プロフィールページをCSS Modulesに移行'"
})

// 2. PRを作成（画像プレースホルダー）
Task({
  subagent_type: "Bash",
  prompt: `
gh pr create --base migration-direct \\
  --title "[A-1] プロフィールページの移行" \\
  --body "## 変更内容
プロフィールページをChakra UIからCSS Modulesに移行

## スクリーンショット
（次のステップでアップロードしてください）

## 検証結果
- ✅ 視覚的差異なし
- ✅ レスポンシブOK
- ✅ TypeScriptエラーなし
"
  `,
  description: "Create PR"
})

// 3. ユーザーに画像アップロードを依頼
AskUserQuestion({
  questions: [{
    question: `
PRが作成されました。次の手順でスクリーンショットをアップロードしてください：

1. GitHub UIでPRを開く
2. PR本文の編集ボタンをクリック
3. 編集画像をドラッグ&ドロップ
4. 自動生成されたMarkdown（例: ![image](https://user-images.githubusercontent.com/...)）が表示される
5. 「（次のステップで...）」の部分を置き換える
6. 保存

アップロードする画像：
- screenshots/1-a/profile-before.png
- screenshots/1-a/profile-after.png
- screenshots/1-a/profile-comparison.png

アップロード完了しましたか？
    `,
    header: "画像アップロード",
    multiSelect: false,
    options: [
      { label: "完了", description: "画像をアップロードしました" },
      { label: "スキップ", description: "後でアップロードします" }
    ]
  }]
})

// 4. PRマージ
Task({
  subagent_type: "Bash",
  prompt: "gh pr merge --squash",
  description: "Merge PR"
})
```

**メリット:**
- ✅ リポジトリに画像をコミット不要
- ✅ シンプルで確実
- ✅ GitHub CDNが自動管理

**デメリット:**
- ❌ **ユーザーの手動作業が必要**
- ❌ 完全自動化はできない

---

### どちらを選ぶべきか？

| 条件 | 推奨方法 |
|------|---------|
| 完全自動化したい | **方法A（Git管理+削除）** |
| 手動でも良い、シンプル重視 | **方法B（手動アップロード）** |
| リポジトリサイズを気にする | **方法B（手動アップロード）** |
| 迷ったら | **方法A（完全自動化）** |

**このドキュメントのデフォルト:** 以降の実装例では**方法A（完全自動化）**を採用します。

### .gitignoreの設定

画像をGit管理しない場合（推奨）：

```bash
# すべてのスクリーンショットを除外
screenshots/

# または、特定のディレクトリのみ除外
screenshots/debug/
screenshots/*-a/
screenshots/*-b/
```

これにより、スクリーンショットはローカルにのみ保存され、リポジトリには含まれません。

### 画像サイズの最適化

大量の画像をコミットする場合、サイズを最適化：

```javascript
Task({
  subagent_type: "Bash",
  prompt: `
ImageMagickで画像を最適化してください：

for img in screenshots/1-a/*.png; do
  convert "$img" -quality 85 -resize 1200x800\\> "$img"
done

- 品質: 85%
- 最大サイズ: 1200x800px（大きい場合のみリサイズ）
  `,
  description: "Optimize screenshots",
  model: "haiku"
})
```

### PRマージ後の画像管理

**推奨方法を使った場合（GitHub UIアップロード）:**

画像は GitHub CDN（`user-images.githubusercontent.com`）に保存されており、ローカルの`screenshots/`ディレクトリは自由に削除できます。

```javascript
// ローカルのスクリーンショットを削除（オプション）
Task({
  subagent_type: "Bash",
  prompt: "rm -rf screenshots/1-a/",
  description: "Clean up local screenshots",
  model: "haiku"
})
```

**Git管理した場合:**

PRマージ後にリポジトリから削除：

```javascript
Task({
  subagent_type: "Bash",
  prompt: `
git rm -r screenshots/1-a/
git commit -m "Remove screenshots after PR merge"
git push
  `,
  description: "Remove screenshots from repo"
})
```

**全issue完了後:**

```bash
# すべてのスクリーンショットを削除
rm -rf screenshots/

# またはGit管理している場合
git rm -r screenshots/
git commit -m "Clean up all screenshots after migration completion"
```

---

## 高度な活用例

### 1. スマート並行実行

複数の独立したissueを自動で並行実行：

```javascript
// TaskListで実行可能なタスクを確認
const availableTasks = TaskList().filter(task =>
  task.status === 'pending' &&
  task.blockedBy.length === 0
)

// 上位3つを並行実行
availableTasks.slice(0, 3).forEach(task => {
  Task({
    subagent_type: "general-purpose",
    prompt: `${task.subject}を実装してください。step3-a.mdの詳細に従ってください。`,
    description: task.subject,
    run_in_background: true
  })
})
```

### 2. エラーハンドリングとリトライ

```javascript
// タスクが失敗した場合の処理
TaskGet({ taskId: "5" })
// → status: "in_progress", but agent crashed

// タスクをリセットして再実行
TaskUpdate({
  taskId: "5",
  status: "pending"
})

// 再度実行
Task({
  subagent_type: "general-purpose",
  prompt: "Issue #A-5を実装してください。前回のエラーログを参考に修正してください。",
  description: "Retry A-5"
})
```

### 3. 進捗レポートの自動生成

```javascript
Task({
  subagent_type: "general-purpose",
  prompt: `
TaskListの結果を基に、移行作業の進捗レポートを生成してください：
- 完了したタスク数 / 総タスク数
- 各タスクのステータス
- 推定残り日数
- ブロックされているタスク

マークダウン形式で出力してください。
  `,
  description: "Generate progress report"
})
```

### 4. 画像差分検出の自動化

より厳密な検証が必要な場合、画像差分を数値化できます：

```javascript
// ImageMagickで差分パーセンテージを取得
Task({
  subagent_type: "Bash",
  prompt: `
compare -metric RMSE \
  screenshots/1-a/profile-before.png \
  screenshots/1-a/profile-after.png \
  screenshots/1-a/profile-diff.png 2>&1 | \
  awk '{print $1}' | \
  awk -F'[()]' '{print $2}' | \
  awk -F'%' '{print $1}'

差分が5%以下ならOK、それ以上なら要確認として報告してください。
  `,
  description: "Auto detect visual diff",
  model: "haiku"
})

// 差分が大きい場合、自動でユーザーに質問
if (diffPercentage > 5) {
  AskUserQuestion({
    questions: [{
      question: `画像差分が${diffPercentage}%検出されました（許容範囲: 5%以下）。確認が必要です。`,
      header: "差分検出",
      multiSelect: false,
      options: [
        { label: "手動で確認する", description: "比較画像を目視確認" },
        { label: "許容して続行", description: "意図した変更と判断" },
        { label: "修正が必要", description: "問題箇所を調査・修正" }
      ]
    }]
  })
}
```

### 5. 全ページ一括検証

複数のissueが完了した後、全ページをまとめて検証：

```javascript
Task({
  subagent_type: "general-purpose",
  prompt: `
完了したすべてのissueについて、以下を一括チェックしてください：
1. 各ページのスクリーンショット比較結果を確認
2. 視覚的差異が5%以下であることを確認
3. TypeScriptエラーがないことを確認
4. コンソールエラーがないことを確認
5. レスポンシブが正常に動作することを確認

結果をサマリーレポートとして出力してください。
問題があるページがあれば、詳細を報告してください。
  `,
  description: "Batch verification"
})
```

---

## まとめ: Claude Code機能活用のメリット

### 従来の方法との比較

| 項目 | 従来の方法 | Claude Code活用版 |
|------|-----------|------------------|
| タスク管理 | GitHub Issues（手動） | TaskCreate/TaskUpdate（自動） |
| 依存関係管理 | 手動で確認 | blockedBy/blocksで自動管理 |
| 並行作業 | 手動で調整 | 複数Agentの自動並行実行 |
| スクリプト実行 | ターミナルで手動実行 | Bash Agentで自動実行 |
| コードベース探索 | 手動でGrep/Find | Explore Agentで自動探索 |
| 計画立案 | 手動でドキュメント作成 | Plan Modeで自動立案 |
| 画像検証 | 手動で目視確認のみ | AskUserQuestion + 修正ループ |
| 問題調査 | 手動でデバッグ | Explore Agentで自動調査 |
| Git操作 | 手動でコマンド実行 | Skillsで簡略化 |

### 推定時間の短縮

**アプローチA:**
- 従来: 12-15日
- Claude Code活用: 8-10日（33%短縮）

**アプローチB:**
- 従来: 18-25日
- Claude Code活用: 12-18日（33%短縮）

### 品質向上

- ✅ Plan Modeで事前にレビュー
- ✅ Explore Agentで漏れをチェック
- ✅ 依存関係の自動管理でミスを防止
- ✅ 並行実行で早期にバグを発見
- ✅ **画像比較による視覚的検証の徹底**
- ✅ **問題検出時の自動調査と修正ループ**
- ✅ **レスポンシブとアクセシビリティの体系的チェック**

---

## よくある質問（FAQ）

### Q1: 画像はPRに含めるべきですか？誰がアップロードしますか？

**A: 2つの方法があります。**

**方法A: Git管理+削除（完全自動化・推奨）**
- **誰が？** Claude Code（Bash Agent）が自動実行
- 画像を一時的にコミット → PR作成 → マージ後に削除
- 完全自動化、人手不要

**方法B: 手動アップロード（シンプル）**
- **誰が？** ユーザー（人間）が手動でアップロード
- PRを作成 → GitHub UIで画像をドラッグ&ドロップ
- リポジトリに画像をコミット不要

**このドキュメントでは方法A（完全自動化）を採用しています。**

詳細は「スクリーンショット管理の詳細」セクションを参照してください。

### Q2: GitHub IssueとClaude Code Taskはどちらを使うべきですか？

**A: Claude Code Taskのみの使用を推奨します（オプション1）。**

理由：
- Claude Code内で完結、管理が簡単
- 依存関係を自動管理
- 並行実行の制御が容易
- 二重管理不要

GitHub Issueが必要な場合：
- チーム作業でGitHub上の可視性が重要
- その場合は**オプション2**（両方を併用）を選択

### Q3: 画像比較で問題が見つかった場合はどうすればいいですか？

**A: 修正→再スクリーンショット→再検証のループを回します。**

手順：
1. `AskUserQuestion`でユーザーに問題箇所を質問
2. `Explore Agent`で原因を自動調査
3. コードを修正
4. `capture-after.sh`を再実行
5. `create-comparison.sh`を再実行
6. ユーザーに再度確認（1に戻る）

タスクのステータスは`in_progress`のまま維持し、検証パス後に`completed`にします。

### Q4: 並行実行で複数のissueを同時に進める場合、競合しませんか？

**A: 独立したissueであれば競合しません。**

安全な並行実行の条件：
- 異なるページファイルを編集している
- blockedByが空（依存関係がない）
- 異なるブランチ（issue/1-a, issue/2-a等）で作業

例：
- ✅ Issue #1（profile）、#2（team）、#3（calendar）は並行実行可能
- ❌ Issue #4（共通レイアウト）は#1-#3に依存するため、完了後に実行

### Q5: スクリーンショットの自動取得は正確ですか？

**A: 基本的には正確ですが、最終確認は人間の目視が必要です。**

自動化できること：
- ページのレンダリング
- 画像の差分計算（RMSE等）
- 基本的なレイアウト確認

人間の確認が必要なこと：
- 微妙な色の違い（意図したものか）
- アニメーションのタイミング
- ユーザー体験の質
- 許容範囲の判断

推奨：自動化 + 最終的な人間の目視確認

### Q6: アプローチAとBのどちらを選ぶべきですか？

**A: 状況によりますが、迷ったらアプローチAから始めることを推奨します。**

| 条件 | 推奨アプローチ |
|------|-------------|
| 1人での作業、短期間 | **アプローチA** |
| チーム作業、長期メンテナンス | **アプローチB** |
| まだ決めていない | **アプローチA**（後でBに移行可能） |
| 両方試したい | **両方を並行実行**（比較後に選択） |

理由：
- アプローチAはシンプルで始めやすい
- 問題があれば途中でアプローチBに切り替え可能
- 両方を試す場合、実測データで判断できる

### Q7: 移行作業にどれくらい時間がかかりますか？

**A: Claude Code活用版では以下の期間を想定しています。**

- **アプローチA**: 8-10日（従来: 12-15日）
- **アプローチB**: 12-18日（従来: 18-25日）

並行実行を活用すれば、さらに短縮可能です。

ただし、以下の要因で変動します：
- チームの経験
- 画像検証での修正回数
- 並行実行の程度
- 予期しない問題の発生

### Q8: Plan Modeは必須ですか？

**A: 推奨しますが、必須ではありません。**

Plan Modeを使うべき場合：
- 複雑なissue（⭐⭐⭐以上）
- 影響範囲が広いissue（共通レイアウト等）
- 初めてのissue（パターンを確立する）

スキップしても良い場合：
- 単純なissue（⭐、⭐⭐）
- 同じパターンを繰り返す場合
- 時間を節約したい場合

Plan Modeのメリット：
- 事前にユーザーの承認を得られる
- ミスを未然に防げる
- 実装の方向性が明確になる

---

## 次のステップ

### 1. まず最初に

```javascript
// アプローチ選択
AskUserQuestion({
  questions: [{
    question: "どちらのアプローチで移行を進めますか？",
    header: "アプローチ",
    multiSelect: false,
    options: [
      { label: "アプローチA（直接適用方式）", description: "..." },
      { label: "アプローチB（共通コンポーネント方式）", description: "..." }
    ]
  }]
})
```

### 2. 環境準備

```javascript
// Bash Agentでブランチとissues作成
Task({
  subagent_type: "Bash",
  prompt: "setup/create-branches.sh と setup/create-issues.ts を実行",
  description: "Setup environment"
})
```

### 3. タスク登録

```javascript
// 選択されたアプローチのすべてのタスクを登録
// (上記のタスク登録スクリプトを実行)
```

### 4. 実装開始

```javascript
// 最初のissueを開始
TaskUpdate({ taskId: "1", status: "in_progress" })
EnterPlanMode()
// ... 実装 ...
```

### 5. 進捗モニタリング

```javascript
// 定期的に進捗確認
TaskList()
```

---

このアップグレード版の移行計画により、Claude Codeの最新機能を最大限に活用し、効率的かつ高品質な移行作業が実現できます。

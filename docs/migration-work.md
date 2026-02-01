# 移行作業手順

## スクリーンショット取得

agent-browserを使用してスクリーンショットを取得する。

```bash
agent-browser --cdp 9222 open "http://localhost:3000/<path>"
agent-browser --cdp 9222 screenshot "screenshots/issue-<number>/<name>.png" --full
```

保存先: `screenshots/issue-<number>/`

---

## Phase 1: src/components/ui の作業について

main agentは3つのsub agentを作成する。

1. researcher: 調査agent
1. worker: 作業agent
1. reviewer: 確認agent

### 手順

1. <main>userから指示されたissue-numberを取得
1. <main>作業ブランチ作成(issue-<number>)
1. <main>subagentを作成(このagentをresearcherと呼ぶ)
1. <researcher>対象のコンポーネントの使われ方を調べる
1. <researcher>worker agentの[TODO](https://platform.claude.com/docs/ja/agent-sdk/todo-tracking)を作成する
1. <researcher>reviewer agentの[TODO](https://platform.claude.com/docs/ja/agent-sdk/todo-tracking)を作成する
1. <main>resercherを終了させる
1. <main>worker subagentを作成
1. <worker>workerのtodoを消化
1. <main>workerを終了させる
1. <main>reviewer subagentを作成
1. <reviwer>コードの確認
1. <reviwer>スクリーンショットの確認
1. <reviewer>問題があれば修正
1. <main>reviewerを終了させる
1. <main>push & PRを作成

### TODOファイル

保存先: `.claude/todos/`

命名規則:
- `issue-<number>-researcher.md`
- `issue-<number>-worker.md`
- `issue-<number>-reviewer.md`

### TODOテンプレート

#### researcher TODO

```
1. [pending] issueの対象コンポーネントを確認
2. [pending] Chakra UIの該当コンポーネントのAPI仕様を調査
3. [pending] src/内での使用箇所をgrepで洗い出し
4. [pending] 使用されているpropsを一覧化
5. [pending] worker TODOを作成
6. [pending] reviewer TODOを作成
```

#### worker TODO

```
1. [pending] src/components/ui/<Component>.tsx を作成
2. [pending] src/components/ui/<Component>.module.css を作成
3. [pending] 必要なpropsを実装
4. [pending] src/components/ui/index.ts にexport追加
5. [pending] src/pages/compare/<Component>.tsx を作成（Chakra版と新版を並べて表示）
6. [pending] npm run build でエラーがないことを確認
```

#### reviewer TODO

```
1. [pending] コードレビュー（型定義、props、スタイル）
2. [pending] /compare/<Component> ページで動作確認
3. [pending] スクリーンショット取得・比較
4. [pending] 問題があれば修正
```

---

## Phase 2: src/components/* 置き換え

main agentは2つのsub agentを作成する。

1. worker: 作業agent
1. reviewer: 確認agent

### 手順

1. <main>userから指示されたissue-numberを取得
1. <main>作業ブランチ作成(issue-<number>)
1. <main>worker subagentを作成
1. <worker>対象ディレクトリのファイルを確認
1. <worker>Chakra UIインポートを共通UIコンポーネントに置き換え
1. <main>workerを終了させる
1. <main>reviewer subagentを作成
1. <reviewer>ビルド確認
1. <reviewer>動作確認
1. <reviewer>問題があれば修正
1. <main>reviewerを終了させる
1. <main>push & PRを作成

### TODOテンプレート

#### worker TODO

```
1. [pending] 対象ディレクトリのファイル一覧を確認
2. [pending] 各ファイルのChakra UIインポートを特定
3. [pending] @chakra-ui/react → @/components/ui に置き換え
4. [pending] 型エラーがあれば修正
5. [pending] npm run build でエラーがないことを確認
```

#### reviewer TODO

```
1. [pending] コードレビュー
2. [pending] npm run build 確認
3. [pending] 該当コンポーネントを使用しているページで動作確認
4. [pending] 問題があれば修正
```

---

## Phase 3: src/pages/* 置き換え

main agentは2つのsub agentを作成する。

1. worker: 作業agent
1. reviewer: 確認agent

### 手順

1. <main>userから指示されたissue-numberを取得
1. <main>作業ブランチ作成(issue-<number>)
1. <main>Beforeスクリーンショット取得
1. <main>worker subagentを作成
1. <worker>対象ページのChakra UIインポートを共通UIコンポーネントに置き換え
1. <main>workerを終了させる
1. <main>reviewer subagentを作成
1. <reviewer>ビルド確認
1. <reviewer>Afterスクリーンショット取得
1. <reviewer>Before/After比較
1. <reviewer>問題があれば修正
1. <main>reviewerを終了させる
1. <main>push & PRを作成

### TODOテンプレート

#### worker TODO

```
1. [pending] 対象ページのChakra UIインポートを特定
2. [pending] @chakra-ui/react → @/components/ui に置き換え
3. [pending] 型エラーがあれば修正
4. [pending] npm run build でエラーがないことを確認
```

#### reviewer TODO

```
1. [pending] コードレビュー
2. [pending] npm run build 確認
3. [pending] Afterスクリーンショット取得
4. [pending] Before/After比較
5. [pending] 問題があれば修正
```

---

## Phase 4: Chakra UI削除・最終確認

### 手順

1. <main>作業ブランチ作成(issue-<number>)
1. <main>全ページのBeforeスクリーンショット取得
1. <main>Chakra UI関連パッケージを削除
1. <main>_app.tsxからChakraProvider削除
1. <main>theme/削除
1. <main>npm run build 確認
1. <main>全ページのAfterスクリーンショット取得
1. <main>Before/After比較
1. <main>push & PRを作成

### 削除対象パッケージ

```
@chakra-ui/icons
@chakra-ui/react
@emotion/cache
@emotion/react
@emotion/styled
framer-motion
```

---
name: worktree-setup
description: 並列作業用のgit worktreeを作成します
argument-hint: "[Issue番号] [ポート番号]"
---

# /worktree-setup <Issue番号> <ポート番号>

並列作業用のgit worktreeを作成してください。

## 1. Issue確認

```bash
gh issue view <Issue番号>
```

## 2. worktree作成

```bash
cd /Users/h/h/lab-chakra-to-css-modules
git worktree add ../lab-issue-<Issue番号> -b issue/<Issue番号>-a migration-direct
```

## 3. 依存関係インストール

```bash
cd ../lab-issue-<Issue番号>
npm install
```

## 4. 開発サーバー起動

```bash
PORT=<ポート番号> npm run dev &
```

## 5. 完了報告

ユーザーに以下を報告:

```
worktree作成完了！

ディレクトリ: /Users/h/h/lab-issue-<Issue番号>
ブランチ: issue/<Issue番号>-a
サーバー: http://localhost:<ポート番号>

別ターミナルで以下を実行してください:
  cd /Users/h/h/lab-issue-<Issue番号>
  claude
  /migrate <Issue番号>
```

## ポート番号の目安

| Issue | ポート |
|-------|--------|
| 4 | 3001 |
| 5 | 3002 |
| 6 | 3003 |
| 7 | 3004 |
| 8 | 3005 |
| ... | ... |

## worktree削除（作業完了後）

```bash
cd /Users/h/h/lab-chakra-to-css-modules
git worktree remove ../lab-issue-<Issue番号>
```

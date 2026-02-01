---
name: create-pr
description: PRを作成する
argument-hint: ""
user-invocable: true
---

# PR作成

## 前提条件（必須）

**スクリーンショットの確認**
- PR作成前に必ず比較ページのスクリーンショットを取得すること
- スクリーンショットがない場合はPRを作成しない

```bash
# スクリーンショット取得
agent-browser --cdp 9222 open "http://localhost:3000/compare/<Component>"
agent-browser --cdp 9222 screenshot "/Users/h/lab-chakra-to-css-modules/screenshots/issue-<number>/compare-<component>.png" --full
```

## 手順

1. スクリーンショットが取得済みか確認
2. 現在のブランチ名からissue番号を取得
3. 変更ファイルを確認
4. PRを作成

## コマンド

```bash
git add .
git commit -m "issue-<number>: <タイトル>"
git push -u origin issue-<number>
gh pr create --base migration --title "<タイトル>" --body "Closes #<number>"
```

## ベースブランチ

migration

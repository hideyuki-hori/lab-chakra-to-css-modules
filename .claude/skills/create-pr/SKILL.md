---
name: create-pr
description: PRを作成する
argument-hint: ""
user-invocable: true
---

# PR作成

## 手順

1. 現在のブランチ名からissue番号を取得
2. 変更ファイルを確認
3. PRを作成

## コマンド

```bash
git add .
git commit -m "issue-<number>: <タイトル>"
git push -u origin issue-<number>
gh pr create --base migration --title "<タイトル>" --body "Closes #<number>"
```

## ベースブランチ

migration

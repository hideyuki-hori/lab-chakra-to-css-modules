---
name: create-branch
description: issue用のブランチを作成する
argument-hint: "<issue-number>"
user-invocable: true
---

# ブランチ作成

## コマンド

```bash
git checkout migration
git pull
git checkout -b issue-$ARGUMENTS
```

## ブランチ名

issue-$ARGUMENTS

## 親ブランチ

migration

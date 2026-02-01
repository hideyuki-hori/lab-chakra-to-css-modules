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

---
name: screenshot
description: agent-browserでスクリーンショットを取得する
argument-hint: "<before|after> <path>"
user-invocable: true
---

# スクリーンショット取得

## 引数

- $0: before または after
- $1: ページパス（例: /compare/Button）

## コマンド

```bash
agent-browser --cdp 9222 open "http://localhost:3000/$1"
agent-browser --cdp 9222 screenshot "screenshots/issue-<number>/$1-$0.png" --full
```

## 保存先

screenshots/issue-<number>/

## 注意

- 開発サーバーが起動していること（npm run dev）
- Chromeがデバッグポート9222で起動していること

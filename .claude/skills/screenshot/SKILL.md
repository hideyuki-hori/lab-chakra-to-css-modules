---
name: screenshot
description: agent-browserでスクリーンショットを取得する（CDP Mode使用）
argument-hint: "<before|after> [position]"
user-invocable: true
allowed-tools: Bash, Read
---

# スクリーンショット取得

現在のissueブランチ名からissue番号を取得し、スクリーンショットを保存する。

## 前提条件
- 開発サーバーが起動していること（npm run dev）
- Chromeがデバッグポート9222で起動し、ログイン済みであること

## 引数
- $0: before または after
- $1: position名（省略時は全影響箇所）

## 保存先
screenshots/issue-d-<issue-number>/<position>-$0.png

## 実行コマンド
```bash
# ページを開いてスクリーンショット取得
agent-browser --cdp 9222 open "http://localhost:3000/<path>"
agent-browser --cdp 9222 screenshot "screenshots/issue-d-<issue-number>/<position>-$0.png" --full
```

## Chromeセッションが切れている場合
人間に以下を依頼する：
1. pkill -9 Chrome
2. /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug-profile &
3. Googleログインを完了

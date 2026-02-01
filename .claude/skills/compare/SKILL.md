---
name: compare
description: Before/Afterスクリーンショットを比較する
argument-hint: "[issue-number]"
user-invocable: true
allowed-tools: Read, Bash
---

# Before/After 比較

## 手順

1. screenshots/issue-d-$ARGUMENTS/ 内のファイルを取得
2. 各positionのbefore/afterペアを特定
3. 画像を読み込んで視覚的に比較
4. 差異があれば報告

## 比較基準
- レイアウトの崩れがないか
- 色・フォントが維持されているか
- ホバー・フォーカス状態が正しいか
- レスポンシブが正しく動作するか
- アニメーションが維持されているか

## 出力
比較レポートを生成し、PRの説明に含める内容を提案

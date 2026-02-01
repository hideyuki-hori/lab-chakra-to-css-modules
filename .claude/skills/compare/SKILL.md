---
name: compare
description: Before/Afterスクリーンショットを比較する
argument-hint: "<issue-number>"
user-invocable: true
---

# Before/After 比較

## 手順

1. screenshots/issue-$ARGUMENTS/ 内のファイルを取得
2. 各ファイルのbefore/afterペアを特定
3. 画像を読み込んで視覚的に比較
4. 差異があれば報告

## 比較基準

- レイアウトの崩れがないか
- 色・フォントが維持されているか
- ホバー・フォーカス状態が正しいか

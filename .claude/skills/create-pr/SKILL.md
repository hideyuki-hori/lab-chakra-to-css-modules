---
name: create-pr
description: 移行完了後のPRを作成する
argument-hint: ""
user-invocable: true
allowed-tools: Bash, Read
---

# PR 作成

## 手順

1. 現在のブランチ名からissue番号を取得
2. 変更ファイルを確認
3. Before/After比較結果を取得
4. PRを作成

## PRテンプレート

```
## Summary
- Chakra UI → CSS Modules 移行完了
- 対象: <page-name>

## 変更内容
- xxx.tsx: Chakra UIコンポーネントをCSS Modulesに置換
- styles/pages/xxx.module.css: 新規作成

## スクリーンショット比較
| Before | After |
|--------|-------|
| ![before](screenshots/...) | ![after](screenshots/...) |

## チェックリスト
- [x] ビルド成功
- [x] 視覚的差異なし
- [x] アニメーション維持

Closes #<issue-number>
```

## 注意
画像のアップロードは人間が行う

---
name: create-component
description: 共通UIコンポーネントを作成する
argument-hint: "<ComponentName>"
user-invocable: true
---

# $ARGUMENTS コンポーネントの作成

## 作成ファイル

- src/components/ui/$ARGUMENTS.tsx
- src/components/ui/$ARGUMENTS.module.css

## 手順

1. Chakra UIの$ARGUMENTSコンポーネントのAPI仕様を確認
2. src/components/ui/$ARGUMENTS.tsx を作成
3. src/components/ui/$ARGUMENTS.module.css を作成
4. src/components/ui/index.ts にexport追加
5. npm run build でエラーがないことを確認

## 参照

- docs/migration-work.md
- .claude/rules/ui-components.md

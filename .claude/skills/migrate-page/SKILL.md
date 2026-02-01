---
name: migrate-page
description: 指定したページを共通UIコンポーネントを使って移行する
argument-hint: "<page-path>"
user-invocable: true
---

# $ARGUMENTS ページの移行

## 手順

1. 対象ページのChakra UIインポートを特定
2. @chakra-ui/react → @/components/ui に置き換え
3. 型エラーがあれば修正
4. npm run build でエラーがないことを確認

## 対象ファイル

- src/pages/$ARGUMENTS.tsx

## 参照

- docs/migration-work.md Phase 3
- .claude/rules/chakra-api-mapping.md
- .claude/rules/ui-components.md

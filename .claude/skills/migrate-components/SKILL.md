---
name: migrate-components
description: src/components/*のChakra UIを共通UIコンポーネントに置き換える
argument-hint: "<directory>"
user-invocable: true
---

# src/components/$ARGUMENTS の移行

## 手順

1. 対象ディレクトリのファイル一覧を確認
2. 各ファイルのChakra UIインポートを特定
3. @chakra-ui/react → @/components/ui に置き換え
4. 型エラーがあれば修正
5. npm run build でエラーがないことを確認

## 対象ディレクトリ

- src/components/$ARGUMENTS/

## 参照

- docs/migration-work.md Phase 2
- .claude/rules/chakra-api-mapping.md

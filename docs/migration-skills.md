# 必要なスキル一覧

## Phase 1用

- create-component
  - 共通UIコンポーネントを作成する
  - src/components/ui/<Component>.tsx
  - src/components/ui/<Component>.module.css
  - src/components/ui/index.ts にexport追加

- create-compare-page
  - 比較ページを作成する
  - src/pages/compare/<Component>.tsx
  - Chakra版と新版を並べて表示

## Phase 2用

- migrate-components
  - src/components/*のChakra UIを共通UIコンポーネントに置き換え

## Phase 3用

- migrate-page
  - src/pages/*のChakra UIを共通UIコンポーネントに置き換え

## 共通

- screenshot
  - agent-browserでスクリーンショット取得
  - before/after

- compare
  - Before/After比較

- create-branch
  - issue-<number>ブランチ作成

- create-pr
  - PRを作成

- create-todo
  - .claude/todos/にTODOファイルを作成

# 移行作業ルール

## ブランチ運用

- 親ブランチは `migration` を使用する（mainではない）
- 作業ブランチは `issue-<number>` 形式で作成
- PRは `migration` ブランチに向けて作成

```bash
git checkout migration
git pull
git checkout -b issue-<number>
```

## スクリーンショット取得

agent-browserを使用してスクリーンショットを取得する。

```bash
mkdir -p screenshots/issue-<number>
agent-browser --cdp 9222 open "http://localhost:3000/<path>"
agent-browser --cdp 9222 screenshot "/Users/h/lab-chakra-to-css-modules/screenshots/issue-<number>/<name>.png" --full
```

## Phase 1: コンポーネント作成時

比較ページ（/compare/<Component>）のスクリーンショットを取得して確認する。

### 手順

1. コンポーネント実装
2. 比較ページ作成
3. **スクリーンショット取得（PR作成前に必須）**
4. Chakra UIとCSS Modules版の表示が一致することを確認
5. PR作成

### 保存先

```
screenshots/issue-<number>/
└── compare-<component>.png
```

## Phase 2, 3, 4: Before/After必須

移行作業（Phase 2, 3, 4）では、Before/Afterのスクリーンショット取得を必ず行う。

### 手順

1. 作業開始前にBeforeスクリーンショットを取得
2. 作業完了後にAfterスクリーンショットを取得
3. Before/Afterを比較して差異がないことを確認
4. 差異がある場合は修正

### 保存先

```
screenshots/issue-<number>/
├── <page>-before.png
└── <page>-after.png
```

## 違反した場合

スクリーンショットを取得せずにPRを作成した場合、その作業は無効とする。

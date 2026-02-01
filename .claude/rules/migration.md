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
agent-browser --cdp 9222 open "http://localhost:3000/<path>"
agent-browser --cdp 9222 screenshot "screenshots/issue-<number>/<name>.png" --full
```

## Before/After必須

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

スクリーンショットを取得せずに作業を進めた場合、その作業は無効とする。

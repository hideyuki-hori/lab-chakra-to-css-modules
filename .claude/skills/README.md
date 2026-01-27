# Skills (Approach A: Direct Migration)

CSS Modules直接移行用のスキル

## 利用可能なスキル

| スキル | 説明 |
|--------|------|
| `/migrate <ページ名> <Issue番号>` | ページ移行の全体フロー実行 |
| `/screenshot <before\|after> <Issue番号> <ページ名>` | スクリーンショット撮影 |

## 使用例

### 新しいページの移行

```
/migrate dashboard 4
```

→ Issue #4のダッシュボードページを移行

### スクリーンショットだけ撮影

```
/screenshot before 4 dashboard
```

→ Before撮影のみ

```
/screenshot after 4 dashboard
```

→ After撮影 + 比較画像作成

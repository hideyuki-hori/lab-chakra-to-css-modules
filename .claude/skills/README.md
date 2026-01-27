# Skills (Approach A: Direct Migration)

CSS Modules直接移行用のスキル

## 利用可能なスキル

| スキル | 説明 |
|--------|------|
| `/migrate <Issue番号>` | ページ移行の全体フロー実行 |
| `/screenshot <before\|after> <Issue番号>` | スクリーンショット撮影 |

## 使用例

```
/migrate 4
```
→ Issue #4（チームメンバーページ）を移行

```
/screenshot before 4
```
→ Issue #4のBefore撮影

```
/screenshot after 4
```
→ Issue #4のAfter撮影 + 比較画像作成

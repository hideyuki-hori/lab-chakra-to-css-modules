# /screenshot <before|after> <Issue番号>

指定されたIssueのページのスクリーンショットを撮影してください。

## Issue → ページ対応

まず `gh issue view <Issue番号>` でIssue確認し、ページを特定:

| Issue | ページ名 | パス |
|-------|---------|------|
| 3 | profile | /profile |
| 4 | team | /team |
| 5 | calendar | /calendar |
| 6 | layout | / (レイアウト確認用) |
| 7 | index | / |
| 8 | projects | /projects |
| 9 | projects-detail | /projects/1 |
| 10 | tasks | /tasks |
| 11 | tasks-new | /tasks/new |
| 12 | reports | /reports |
| 13 | settings | /settings |

## before の場合

```bash
mkdir -p screenshots/<Issue番号>
agent-browser open http://localhost:3000/<パス>
sleep 2
agent-browser screenshot screenshots/<Issue番号>/<ページ名>-before.png
```

ユーザーに撮影したスクリーンショットを表示。

## after の場合

```bash
agent-browser reload
sleep 2
agent-browser screenshot screenshots/<Issue番号>/<ページ名>-after.png
magick screenshots/<Issue番号>/<ページ名>-before.png screenshots/<Issue番号>/<ページ名>-after.png +append screenshots/<Issue番号>/<ページ名>-comparison.png
```

比較画像をユーザーに表示し、Before/Afterの差異を確認。

差異がある場合は、どこが違うか報告し、修正が必要か確認。

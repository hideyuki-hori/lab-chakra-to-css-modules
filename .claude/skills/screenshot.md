# /screenshot <before|after> <Issue番号> <ページ名>

スクリーンショットを撮影してください。

## before の場合

```bash
mkdir -p screenshots/<Issue番号>
agent-browser open http://localhost:3000/<ページ名>
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

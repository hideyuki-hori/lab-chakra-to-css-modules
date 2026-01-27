# /screenshot - スクリーンショット撮影

現在のページのスクリーンショットを撮影する。

## 使い方

```
/screenshot <before|after> <Issue番号> <ページ名>
```

例:
- `/screenshot before 3 profile`
- `/screenshot after 3 profile`

## 実行内容

### before の場合
```bash
mkdir -p screenshots/{番号}
agent-browser screenshot screenshots/{番号}/{ページ}-before.png
```

### after の場合
```bash
agent-browser reload
agent-browser screenshot screenshots/{番号}/{ページ}-after.png
magick screenshots/{番号}/{ページ}-before.png screenshots/{番号}/{ページ}-after.png +append screenshots/{番号}/{ページ}-comparison.png
```

## 注意

- 撮影前に `agent-browser open` でページを開いておくこと
- 開発サーバーが起動していること (`npm run dev`)
- スクリーンショットはgitにコミットしない（.gitignoreに追加済み）

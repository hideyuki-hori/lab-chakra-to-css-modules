# /migrate - ページ移行

指定されたページをChakra UIからCSS Modulesに移行する。

## 使い方

```
/migrate <ページ名> <Issue番号>
```

例: `/migrate profile 3`

## 手順

1. **準備**
   - Issue #{番号} の内容を確認
   - `migration-direct` から作業ブランチ `issue/{番号}-a` を作成
   - 開発サーバー起動確認 (`npm run dev`)

2. **Before撮影**
   - `agent-browser open http://localhost:3000/{ページ}`
   - `agent-browser screenshot screenshots/{番号}/{ページ}-before.png`

3. **移行作業**
   - `styles/pages/{ページ}.module.css` を作成
   - `pages/{ページ}.tsx` のChakra UIをHTML + CSS Modulesに置き換え
   - framer-motion, react-hook-form はそのまま維持

4. **After撮影**
   - `agent-browser reload`
   - `agent-browser screenshot screenshots/{番号}/{ページ}-after.png`

5. **比較確認**
   - `magick screenshots/{番号}/{ページ}-before.png screenshots/{番号}/{ページ}-after.png +append screenshots/{番号}/{ページ}-comparison.png`
   - 差異があれば修正

6. **コミット & PR**
   - 変更をコミット
   - PRを作成（ベース: migration-direct）
   - スクリーンショットは手動でPRにアップロード

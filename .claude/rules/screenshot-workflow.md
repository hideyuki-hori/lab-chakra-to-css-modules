# スクリーンショット比較ワークフロー（必須）

ページ移行作業時は以下を必ず実行すること。

## 手順

1. **Before取得**（移行作業前）
   - `screenshots/before/<page-name>.png` に保存
   - chakra-baseline状態でスクリーンショット取得

2. **移行作業実施**

3. **After取得**（移行作業後）
   - `screenshots/after/<page-name>.png` に保存

4. **比較確認**
   - Before/Afterを並べて視覚的に差異がないか確認
   - 差異がある場合は修正

5. **PR作成**
   - PRにBefore/Afterスクリーンショットを添付

## 禁止事項

- スクリーンショット比較なしでページ移行PRを作成してはならない
- Before取得前に移行作業を開始してはならない

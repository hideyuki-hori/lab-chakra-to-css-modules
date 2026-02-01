# Issue #171 Reviewer TODO

対象コンポーネント: Box, Flex, VStack, HStack, Stack, Center, SimpleGrid, Wrap, WrapItem

## レビューチェックリスト

### コードレビュー
1. [pending] Box.tsx - 型定義、props、スタイル実装の確認
2. [pending] Flex.tsx - 型定義、props、スタイル実装の確認
3. [pending] VStack.tsx - 型定義、props、スタイル実装の確認
4. [pending] HStack.tsx - 型定義、props、スタイル実装の確認
5. [pending] Stack.tsx - 型定義、props、スタイル実装の確認
6. [pending] Center.tsx - 型定義、props、スタイル実装の確認
7. [pending] SimpleGrid.tsx - 型定義、props、スタイル実装の確認
8. [pending] Wrap.tsx - 型定義、props、スタイル実装の確認
9. [pending] WrapItem.tsx - 型定義、props、スタイル実装の確認

### 型定義チェック項目
- [ ] 型アサーション（as）を使用していないこと
- [ ] propsの型が適切に定義されていること
- [ ] childrenの型がReactNodeで定義されていること
- [ ] HTML属性の継承が適切に行われていること
- [ ] レスポンシブ対応の型が定義されていること

### スタイルチェック項目
- [ ] CSS Modulesで適切にスタイルが定義されていること
- [ ] Chakra UIと同等のスタイルが適用されること
- [ ] レスポンシブ対応が正しく動作すること
- [ ] _hoverなどの疑似セレクターが正しく動作すること
- [ ] transitionが正しく動作すること

### 動作確認
10. [pending] /compare/Layout ページで動作確認
11. [pending] 各propsが正しく動作することを確認
12. [pending] レスポンシブデザインが正しく動作することを確認

### スクリーンショット取得・比較
13. [pending] Beforeスクリーンショット取得（移行前）
14. [pending] Afterスクリーンショット取得（移行後）
15. [pending] Before/After比較で差異がないことを確認

### 問題対応
16. [pending] 視覚的な差異がある場合は修正
17. [pending] 機能的な問題がある場合は修正

## 主要な確認ページ

以下のページで特に多くのレイアウトコンポーネントが使用されているため、重点的に確認する：

1. `/` (ダッシュボード) - SimpleGrid, VStack, HStack, Box
2. `/projects/[id]` - SimpleGrid, VStack, HStack, Box
3. `/profile` - VStack, HStack, Box, Wrap, WrapItem
4. `/settings` - VStack, HStack, Box, Stack
5. `/login` - Box, VStack, Center
6. `/tasks` - VStack, HStack, Box, Flex
7. `/team` - SimpleGrid, VStack, HStack

## 注意事項

- motion(Box)などframer-motionとの組み合わせが正しく動作するか確認
- レスポンシブオブジェクト（{ base: 1, md: 2, lg: 4 }）が正しく処理されるか確認
- 既存のChakra UIコンポーネントとの互換性を確認

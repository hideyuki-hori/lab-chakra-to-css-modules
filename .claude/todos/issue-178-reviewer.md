# Issue #178 Reviewer TODO

## レビュー観点

### 型定義
- [ ] BadgeProps が HTMLSpanElement を使用しているか
- [ ] variant が "solid" | "subtle" | "outline" をサポートしているか
- [ ] colorScheme が必要なすべての色をサポートしているか
- [ ] LayoutProps（fontSize, padding など）が継承されているか

### スタイル実装
- [ ] 7 つの colorScheme × 3 variant = 21 クラスが実装されているか
- [ ] subtle variant がデフォルトになっているか
- [ ] フォントサイズがデフォルト、xs, sm に対応しているか
- [ ] パディングが LayoutProps で制御されているか

### 機能
- [ ] 子要素（テキスト）が正しく表示されるか
- [ ] className, style の上書きが可能か
- [ ] forwardRef が正しく実装されているか

## タスク

1. [pending] コードレビュー（型定義、variant/colorScheme の実装）
2. [pending] /compare/Badge ページで動作確認
3. [pending] スクリーンショット取得（Chakra 版と新版を比較）
4. [pending] 問題があれば修正

## スクリーンショット取得

```bash
mkdir -p screenshots/issue-178
agent-browser --cdp 9222 open "http://localhost:3000/compare/Badge"
agent-browser --cdp 9222 screenshot "/Users/h/lab-chakra-to-css-modules/screenshots/issue-178/compare-badge.png" --full
```

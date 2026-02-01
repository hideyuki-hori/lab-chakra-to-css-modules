# Issue #178 Worker TODO

## 調査結果サマリー

Badge コンポーネントは、Chakra UI の Data Display コンポーネントで、ステータスやラベル表示に使用される。プロジェクト内では 19 ファイルで使用されており、主に PriorityBadge, StatusBadge, RoleBadge などのラッパーコンポーネントを通じて活用されている。

### 主要な特性
- **3 つの variant:** solid, subtle（デフォルト）, outline
- **複数の colorScheme:** gray, blue, green, orange, red, purple, yellow など
- **Box 継承:** LayoutProps（fontSize, padding, width など）のサポート

## 使用されている Props

| Prop | 値の例 | 使用箇所 |
|------|--------|---------|
| colorScheme | "blue", "green", "gray", "orange", "red", "purple", "yellow" | 全ページで使用 |
| variant | "subtle"（デフォルト） | index.tsx |
| fontSize | "xs", "sm" | calendar.tsx, Header.tsx |
| w | "100%" | calendar.tsx |
| textAlign | "center" | calendar.tsx |
| px | 2 | Header.tsx |

## 推奨 colorScheme リスト

| colorScheme | 使用例 |
|------------|-------|
| gray | 計画中、デフォルト |
| blue | 進行中、標準状態 |
| green | 完了、アクティブ |
| orange | 保留、警告 |
| red | 緊急 |
| purple | オーナー、プレミアム |
| yellow | 離席中 |

## TODO

1. [pending] src/components/ui/Badge.tsx を作成
2. [pending] src/components/ui/Badge.module.css を作成
3. [pending] 7 colorScheme × 3 variant のスタイルクラスを実装
4. [pending] LayoutProps（fontSize, padding, width など）に対応
5. [pending] src/components/ui/index.ts に export 追加
6. [pending] src/pages/compare/Badge.tsx を作成
7. [pending] npm run build でエラーがないことを確認

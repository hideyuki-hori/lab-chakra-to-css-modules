# Issue #177 Reviewer TODO

## 対象コンポーネント
Avatar, AvatarGroup, AvatarBadge

## レビュー観点

### 型定義
- [ ] AvatarProps が適切に定義されているか
- [ ] size が "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" をサポートしているか
- [ ] AvatarGroupProps に max, spacing, size が含まれているか
- [ ] AvatarBadgeProps に boxSize, bg, border 等のスタイルpropsが含まれているか
- [ ] forwardRef が正しく実装されているか（motion対応のため）

### スタイル
- [ ] 各サイズのピクセル値が適切か
- [ ] イニシャル表示時のフォントサイズがサイズに応じて調整されているか
- [ ] AvatarGroup のスタッキング（負のマージン）が正しく動作するか
- [ ] AvatarBadge の配置が正しいか（右下）
- [ ] フォールバック背景色が `name` から一貫して生成されるか

### 機能
- [ ] 画像の読み込み失敗時にイニシャルまたはデフォルトアイコンが表示されるか
- [ ] AvatarGroup の max prop が正しく動作するか（+X表示）
- [ ] AvatarBadge が Avatar 内で正しく配置されるか

### アクセシビリティ
- [ ] 画像に適切な alt 属性が設定されているか（name を使用）
- [ ] role="img" が設定されているか

## タスク
1. [pending] コードレビュー（型定義、props、スタイル）
2. [pending] /compare/Avatar ページで動作確認
3. [pending] スクリーンショット取得
4. [pending] 問題があれば修正

## 確認ページ
- `/compare/Avatar` - Chakra版と新版の比較

## 確認すべき使用箇所
- `/profile` - size="2xl"、motion対応
- `/projects` - AvatarGroup with max
- `/team` - size="xl"
- `/` (ダッシュボード) - size="xs"

## スクリーンショット
```bash
agent-browser --cdp 9222 open "http://localhost:3000/compare/Avatar"
agent-browser --cdp 9222 screenshot "screenshots/issue-177/compare-avatar.png" --full
```

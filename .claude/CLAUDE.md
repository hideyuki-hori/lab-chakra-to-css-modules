# TaskFlow - Chakra UI → CSS Modules 移行プロジェクト

## アプローチ
**共有コンポーネント活用方式**

1. 共有コンポーネント（UI, Common, Form, Data, Modal）を先にCSS Modulesに移行
2. ページ移行時は必ず共有コンポーネントを使用する
3. ページでベタにスタイルを書かない

## 重要：ページ移行時のルール
- **必ず既存の共有コンポーネントを使用すること**
- Chakra UIのコンポーネントは以下に置き換える：
  - `Button` → `src/components/ui/Button`
  - `Card` → `src/components/ui/Card`
  - `Modal` → `src/components/ui/Modal`
  - `StatusBadge`, `PriorityBadge`, `RoleBadge` → `src/components/ui`
  - `FormInput`, `FormSelect`, `FormTextarea` → `src/components/form`
  - `TaskCard`, `ProjectCard`, `MemberCard`, `StatCard` → `src/components/data`
  - `Alert`, `PageHeader`, `Tooltip`, `UserAvatar` → `src/components/common`
  - `ConfirmModal`, `FormModal` → `src/components/modal`
- ページ固有のレイアウトのみCSS Modulesで記述

## 必須ルール
@.claude/rules/screenshot-workflow.md

## ブランチ戦略
- `main` = `chakra-baseline`（触らない）
- `migration-direct` = 作業ブランチ
- 完了後に`migration-direct` → `main`へマージ

## 技術スタック
- Next.js 16.1.3 (Page Router)
- React 19.2.3
- TypeScript 5.9.3
- CSS Modules
- framer-motion（アニメーション維持）
- react-hot-toast（useToast代替）

## よく使うコマンド
- ビルド: `npm run build`
- 開発: `npm run dev`
- リント: `npm run lint`

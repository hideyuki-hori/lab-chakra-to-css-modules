# TaskFlow - Chakra UI → CSS Modules 移行プロジェクト

## アプローチ
**直接CSS Modules適用方式（アプローチA）**

各ページで直接CSS Modulesを使用する。共通UIコンポーネントは最小限。

## 技術スタック
- Next.js 16.1.3 (Page Router)
- React 19.2.3
- TypeScript 5.9.3
- CSS Modules
- framer-motion（アニメーション維持）
- react-hot-toast（useToast代替）

## 重要なルール
@.claude/rules/css-modules.md
@.claude/rules/migration-workflow.md
@.claude/rules/chakra-replacement.md

## よく使うコマンド
- ビルド: `npm run build`
- 開発: `npm run dev`
- リント: `npm run lint`

## 移行作業の手順
1. `/migrate <page-name>` で移行開始
2. `/screenshot before` でBefore取得
3. 作業実施
4. `/screenshot after` でAfter取得
5. `/compare` で比較
6. `/create-pr` でPR作成

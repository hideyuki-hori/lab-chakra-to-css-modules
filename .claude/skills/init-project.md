---
description: Next.js + Chakra UI プロジェクトを初期化する
args: なし
---

# init-project

Next.js + Chakra UI プロジェクトをセットアップします。

## 実行内容

1. Next.jsプロジェクトの初期化
2. 必要なパッケージのインストール
3. 基本的なディレクトリ構造の作成
4. Chakra UI Providerのセットアップ
5. 型定義ファイルの作成
6. 基本的なモックデータの作成

## 使用方法

```
/init-project
```

## このスキルが実行すること

### 1. Next.jsプロジェクトの初期化

```bash
npx create-next-app@16.1.3 . --typescript --app --no-src --import-alias "@/*"
```

### 2. 依存関係のインストール

```bash
npm install @chakra-ui/react@^2.8.2 @chakra-ui/icons@^2.2.4 @emotion/react@^11.14.0 @emotion/styled@^11.14.1 @emotion/cache@^11.13.1 framer-motion@^12.27.1 react-hook-form@^7.71.1 react-icons@^5.5.0
```

### 3. ディレクトリ構造の作成

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   └── common/
├── lib/
│   ├── types.ts
│   └── mockData.ts
└── theme/
    └── index.ts
```

### 4. 必要なファイルの生成

- `src/app/layout.tsx`: Chakra UI Providerのセットアップ
- `src/theme/index.ts`: Chakra UIテーマのカスタマイズ
- `src/lib/types.ts`: 型定義
- `src/lib/mockData.ts`: モックデータ

### 5. 動作確認

```bash
npm run dev
```

## 注意事項

- プロジェクトルートで実行すること
- 既存のNext.jsプロジェクトがある場合は実行しない
- package.jsonのバージョンを確認すること

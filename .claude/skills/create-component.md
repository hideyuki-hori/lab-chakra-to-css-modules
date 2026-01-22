---
description: 新しいコンポーネントを作成する
args: コンポーネントカテゴリ/名前（例: layout/Sidebar, common/Card）
---

# create-component

新しいコンポーネントファイルを作成します。

## 使用方法

```
/create-component layout/Sidebar
/create-component common/Card
/create-component projects/ProjectCard
```

## 実行内容

### 1. コンポーネントファイルの作成

指定されたパスにコンポーネントファイルを作成します。

例: `/create-component layout/Sidebar`の場合
```
src/components/layout/Sidebar.tsx
```

### 2. コンポーネントテンプレートの生成

Chakra UIとTypeScriptを使用した基本テンプレートを生成します。

```typescript
import { Box } from '@chakra-ui/react';

interface SidebarProps {
  // Props定義
}

export const Sidebar = ({}: SidebarProps) => {
  return (
    <Box>
      {/* コンポーネント実装 */}
    </Box>
  );
};
```

### 3. インデックスファイルの更新（オプション）

必要に応じて`index.ts`ファイルを作成し、エクスポートを追加します。

```typescript
export { Sidebar } from './Sidebar';
```

## コンポーネント作成のガイドライン

### 必須事項
- Chakra UIコンポーネントのみを使用
- TypeScriptで型定義を行う
- Propsインターフェースを定義
- 名前付きエクスポートを使用

### 推奨事項
- framer-motionを使う場合は適切に統合
- レスポンシブデザインに対応
- アクセシビリティを考慮
- 再利用可能な設計にする

## 注意事項

- 独自のCSSファイルは作成しない
- Chakra UIのスタイリング機能（sx、style propsなど）を使用する
- コンポーネント名はPascalCaseにする

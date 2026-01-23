---
description: 新しいページを作成する
args: ページ名（例: projects, tasks, team）
---

# create-page

新しいページファイルを作成します。

## 使用方法

```
/create-page projects
/create-page tasks/new
/create-page projects/[id]
```

## 実行内容

### 1. ページディレクトリとファイルの作成

指定されたパスに基づいて`page.tsx`を作成します。

例: `/create-page projects`の場合
```
src/app/projects/page.tsx
```

例: `/create-page projects/[id]`の場合
```
src/app/projects/[id]/page.tsx
```

### 2. ページテンプレートの生成

基本的なChakra UIコンポーネントを使用したテンプレートを生成します。

```typescript
import { Box, Heading, Text } from '@chakra-ui/react';

export default function ProjectsPage() {
  return (
    <Box p={8}>
      <Heading mb={6}>Projects</Heading>
      <Text>プロジェクト一覧ページ</Text>
    </Box>
  );
}
```

### 3. ページコンポーネントディレクトリの作成

対応するコンポーネントディレクトリも作成します。

```
src/components/projects/
```

## 注意事項

- step1.mdの仕様に従ってページを作成する
- Chakra UIコンポーネントのみを使用する
- 'use client'ディレクティブが必要な場合（framer-motion使用時など）は追加する
- 動的ルート（[id]など）に対応する

---
name: create-compare-page
description: Chakra版と新版を並べて表示する比較ページを作成する
argument-hint: "<ComponentName>"
user-invocable: true
---

# $ARGUMENTS 比較ページの作成

## 作成ファイル

- src/pages/compare/$ARGUMENTS.tsx

## 内容

Chakra UIの$ARGUMENTSコンポーネントと、新しく作成した共通UIコンポーネントを並べて表示するページを作成する。

## テンプレート

```tsx
import { Box, Text } from '@chakra-ui/react';
import { $ARGUMENTS as New$ARGUMENTS } from '@/components/ui';

export default function Compare$ARGUMENTS() {
  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
      <div style={{ flex: 1 }}>
        <h2>Chakra UI</h2>
        {/* Chakra UIコンポーネントの例 */}
      </div>
      <div style={{ flex: 1 }}>
        <h2>New</h2>
        {/* 新コンポーネントの例 */}
      </div>
    </div>
  );
}
```

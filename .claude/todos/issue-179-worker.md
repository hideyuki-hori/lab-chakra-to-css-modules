# issue-179 Worker TODO

対象コンポーネント: Card, CardHeader, CardBody

## 使用されているprops

### Card
| prop | 使用箇所 | 値 |
|------|---------|-----|
| (デフォルト) | src/pages/index.tsx, src/pages/projects/[id].tsx, src/pages/tasks/new.tsx, src/pages/tasks/[id]/edit.tsx, src/components/data/StatCard.tsx | - |
| bg | src/pages/tasks/[id]/edit.tsx | "gray.50" |
| style | src/pages/index.tsx | { background: 'linear-gradient(...)' } |

### CardHeader
| prop | 使用箇所 | 値 |
|------|---------|-----|
| (デフォルト) | src/pages/index.tsx, src/pages/projects/[id].tsx | - |

### CardBody
| prop | 使用箇所 | 値 |
|------|---------|-----|
| (デフォルト) | src/pages/index.tsx, src/pages/projects/[id].tsx, src/pages/tasks/new.tsx, src/pages/tasks/[id]/edit.tsx, src/components/data/StatCard.tsx | - |
| p | src/pages/projects/[id].tsx | 0 |

## 注意事項

- 既存の `src/components/ui/Card.tsx` は独自実装（BoxベースでisHoverable propを持つ）
- Chakra UIのCard, CardHeader, CardBodyは別途 `@chakra-ui/react` からimportされている
- 新しいCard.tsxは、Chakra UIのCard, CardHeader, CardBodyを置き換える必要がある
- 既存のCard.tsxの機能（isHoverable）も統合するか検討が必要

## Chakra UI Cardのデフォルトスタイル（theme/index.ts）

```typescript
Card: {
  baseStyle: {
    container: {
      bg: 'white',
      borderRadius: 'lg',
      boxShadow: 'sm',
      _hover: {
        boxShadow: 'md',
      },
      transition: 'box-shadow 0.2s',
    },
  },
},
```

## TODO

1. [pending] src/components/ui/Card.tsx を書き換え（Card, CardHeader, CardBody を実装）
2. [pending] src/components/ui/Card.module.css を作成
3. [pending] 必要なpropsを実装
   - Card: bg, style, children
   - CardHeader: children
   - CardBody: p, children
4. [pending] src/components/ui/index.ts にexport追加（CardHeader, CardBody）
5. [pending] src/pages/compare/Card.tsx を作成（Chakra版と新版を並べて表示）
6. [pending] npm run build でエラーがないことを確認
